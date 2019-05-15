const publicVapidKey =
  'BJscaENW23aZcMi2BIF_gpjj8Zz_73TLEm5QGzJrzw4xo0ACGL0hEWo0ajjbAPeUjZ4EFTAIYzGzDpyRdSucE20';

// Check for Service worker
if ('serviceWorker' in navigator) {
  send().catch(err => console.log(err));
}

// Register service worker, register push, send push
async function send() {
  console.log('Registering the Service worker');
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  });
  console.log('Service Worker Registered...');

  console.log('Registering push...');

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log('Push Registered');

  //Send push notification
  console.log('Sending push...');
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('Push sent...');
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
