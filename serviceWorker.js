const CACHE_NAME = 'v1.12';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/about.html',
    '/styles.css',
    '/script.js',
    '/manifest.json'
  ];

// Install a service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

// Cache and return requests
self.addEventListener('fetch', event => {
    // Skip non-HTTP(S) requests, such as chrome-extension://
    if (!event.request.url.startsWith('http')) {
      console.log(`Skipping non-HTTP(S) request: ${event.request.url}`);
      return;
    }
  
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request).then(networkResponse => {
            // Check if we received a valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
  
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      }).catch(error => {
        console.log('Fetch failed; returning offline page instead.', error);
        return caches.match('/offline.html');
      })
    );
  });
  

// Update a service worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME]; // Update this to use the new cache name
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName); // Delete old caches not in the whitelist
                    }
                })
            );
        }).then(() => self.clients.claim()) // This line helps the service worker take control immediately
    );
});
