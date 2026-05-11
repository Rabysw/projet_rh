const CACHE_NAME = 'ices-rh-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'ICES RH', body: 'Nouvelle notification' };
  const options = {
    body: data.body,
    icon: '/favicon.ico',
    badge: '/favicon.ico'
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});
