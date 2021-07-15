const {User,Message} = require('../models');
const { sendPushNotification } = require('../utils/pushNotifications');
exports.userConnected = async( id ) => {
    const user = await User.findById(id);
    user.online = true;
    await user.save();
    return usuario;
},

exports.userDisconnected = async( id ) => {
    const user = await User.findById(id);
    user.online = false;
    await user.save();
    return user;
},


exports.getUsers = async() => {
    const users = await User
        .find()
        .sort(-online)
    return users;
},

exports.recordMessage = async( msg ) => {
    try {
      const mensaje = await Message.create(msg);
      // recuperar la suscripción
        const subscription = await Subscription.findOne({where: UserId = msg.UserIdRecibido});
        let endpoint = subscription.endpoint;
        let p256dh = subscription.p256dh;
        let auth = subscription.auth;
        //console.log(subscription);
        // formato a los datos de la suscripción
        const subscriptionb = { endpoint, expirationTime: null, keys: { p256dh, auth } };

        // enviar notificación
        sendPushNotification(
            subscriptionb,
            `Has recibido un mensaje de ${msg.dataValues.firtsName}`,
            `${msg.message} .`,
        );

        return mensaje;

    } catch (error) {
        console.log(error);
        return false;
    }
}