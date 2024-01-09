if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/serviceWorker.js').then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// function updateOnlineStatus() {
//     var offlineIndicator = document.getElementById('offlineIndicator');
//     if (!navigator.onLine) {
//         offlineIndicator.style.display = 'block';
//     } else {
//         offlineIndicator.style.display = 'none';
//     }
// }

// window.addEventListener('load', function() {
//     // Check the online status when the app is loaded
//     updateOnlineStatus();
// });

// window.addEventListener('online',  updateOnlineStatus);
// window.addEventListener('offline', updateOnlineStatus);

