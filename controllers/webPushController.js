const {Subscription} = require('../models');

exports.subscribe = async (req,res,next) => {
  try {
    if(!req.body.endpoint){
      res.status(404).json({ error: true, message: 'error al registrar suscripción'});
    }
    else{
      // recibir la suscripción
      // guardar la suscripción
      const subscription = { ...req.body,
        endpoint:req.body.endpoint,
        p256dh:req.body.keys.p256dh,
        auth:req.body.keys.auth };
      // guardar en la bd los datos del objeto subscription
      const subscriptionb = await Subscription.findOne({
        where: {endpoint: req.body.endpoint}
      });
      if(!subscriptionb) {
        await Subscription.create({
          subscription,
          endpoint:req.body.endpoint,
          p256dh:req.body.keys.p256dh,
          auth:req.body.keys.auth,
        });
        next();
      } else { res.status(400).json({ error: true, message: 'error al registrar suscripción'}) };
    }

  } catch (error) {
    console.error(error);
    let errores=[];
    if(error.errors){
        errores = error.errors.map((item) => ({
            campo: item.path,
            error: item.message,
        }))
    }
    res.status(503).json({ message: 'error al registrar suscripción', errores, });
    next();
  }
};