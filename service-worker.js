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
            return cache.addAll(assets).catch((err) => {
                console.error("Error al agregar archivos a la caché:", err);
            });
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
                        return caches.delete(cache);  // Eliminar cachés antiguos
                    }
                })
            );
        })
    );
});

// Interceptar solicitudes y devolver desde caché
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);  // Si no está en caché, hacer una solicitud de red
        })
    );
});
