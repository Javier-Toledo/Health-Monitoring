const {Subscription} = require('../models');

exports.subscribe = async (req,res,next) => {
  try {
    // recibir la suscripción
    console.log(req.body);
    // guardar la suscripción
    const subscription = { ...req.body,
      endpoint:req.body.endpoint,
      p256dh:req.body.keys.p256dh,
      auth:req.body.keys.auth };
    
    // guardar en la bd los datos del objeto subscription
    const subscriptionb = await Subscription.findOne({
      where: {endpoint: req.body.endpoint}
    });
    if(!subscriptionb.endpoint) {
      await Subscription.create({
        subscription,
        endpoint:req.body.endpoint,
        p256dh:req.body.keys.p256dh,
        auth:req.body.keys.auth,
      });
      next();
    } else{

    };

  } catch (error) {
    console.error(error);
    let errores=[];
    if(error.errors){
        errores = error.errors.map((item) => ({
            campo: item.path,
            error: item.message,
        }))
    }
    res.json({
        error: true,
        mensaje: 'error al registrar suscripción',
        errores,
    });
    next();
  }
};