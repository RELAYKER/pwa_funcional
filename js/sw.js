const CACHE_NAME = "pwa-crud-cache-v1";
const URLS_TO_CACHE = ["/", "/index.html", "/css/styles.css", "/js/db.js", "/js/app.js", "/offline.html"];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch(() => caches.match("/offline.html"));
        })
    );
});
