const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

const publicVapidKey =
  'BJscaENW23aZcMi2BIF_gpjj8Zz_73TLEm5QGzJrzw4xo0ACGL0hEWo0ajjbAPeUjZ4EFTAIYzGzDpyRdSucE20';
const privateVapidKey = 'XcV7TFDW8sf82jEBxnq89OVgKn8KNI7Gps0JRbH1JbY';

webpush.setVapidDetails(
  'mailto:amcenp@gmail.com',
  publicVapidKey,
  privateVapidKey
);

// Creating subscribe route
app.post('/subscribe', (req, res, next) => {
  // Get push subscription object
  const subscription = req.body;

  //Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({
    title: 'Push test test test'
  });

  // Pass object int oSendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

app.listen(4000, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('RUnning');
  }
});
