const webPush = require('../config/webPush');
exports.sendPushNotification = async (subscription, title, message) => {
  const payload = JSON.stringify({
    title,
    message,
  });

  try {
    await webPush.sendNotification(
      subscription,
      payload,
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}