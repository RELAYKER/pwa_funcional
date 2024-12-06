const cacheName = "pwa-timer-cache-v1";  // Versión de la caché
const assets = [
    "/",                    // El archivo principal (index)
    "/index.html",           // HTML principal
    "/style.css",            // CSS
    "/app.js",               // JavaScript
    "/icon-192.png",         // Icono de tamaño 192x192
    "/icon-512.png",         // Icono de tamaño 512x512
];

// Instalación del Service Worker
self.addEventListener("install", (event) => {
    console.log("Service Worker: Instalando...");
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log("Service Worker: Caché abierta y archivos agregados.");
            return cache.addAll(assets).catch((err) => {
                console.error("Error al agregar archivos a la caché:", err);
            });
        })
    );
});

// Activación del Service Worker
self.addEventListener("activate", (event) => {
    console.log("Service Worker: Activando...");
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        console.log(`Service Worker: Eliminando caché antigua ${cache}`);
                        return caches.delete(cache);  // Eliminar cachés antiguas
                    }
                })
            );
        })
    );
});

// Manejo de las solicitudes con la caché
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                console.log(`Service Worker: Sirviendo desde la caché: ${event.request.url}`);
                return response;  // Devolver archivo desde la caché
            }

            console.log(`Service Worker: No encontrado en caché, solicitando desde la red: ${event.request.url}`);
            return fetch(event.request).catch((err) => {
                console.error("Error al hacer la solicitud de red:", err);
            });  // Si no está en caché, hacer la solicitud de red
        })
    );
});
