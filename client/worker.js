console.log('Service worker Loaded');

self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('Push Received');
  self.registration.showNotification(data.title, {
    body: 'You have one more dollar',
    icon: 'http://image.ibb.co/frYOFd/tmlogo.png'
  });
});
