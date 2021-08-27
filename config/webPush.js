const webpush = require('web-push');

// configurar web push
webpush.setVapidDetails(
  `mailto:${process.env.PUSH_EMAIL}`,
  process.env.PUSH_PUBLIC_KEY,
  process.env.PUSH_PRIVATE_KEY
);

module.exports = webpush;