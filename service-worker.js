const cacheName = "pwa-timer-cache-v1";
const assets = [
    "/",
    "/index.html",
    "/style.css",
    "/app.js",
];

// Instalar Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(assets);
        })
    );
});

// Activar Service Worker
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Interceptar solicitudes
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
self.addEventListener("fetch", (event) => {
    // Ignorar solicitudes que no sean de tu dominio
    if (event.request.url.startsWith('chrome-extension://')) {
        return;
    }

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

