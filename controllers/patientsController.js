const { Op } = require("sequelize");
const { sendPushNotification } = require('../utils/pushNotifications');
const {Patient, User, Subscription,DataValuePatient} = require('../models');

// agregar paciente
exports.add = async (req, res, next) => {
    try {
        // crear un paciente con los datos recibidos
        await Patient.create(req.body);
        res.json({ mensaje: 'The patient was added.' });
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
            mensaje: 'Failed to add patient.',
            errores,
        });
        next();
    }
};

// actualizar pacientes
exports.updateOwn = async (req, res, next) => {
    try {
        // obtener el registro de los pacientes desde la bd
        const patient = await Patient.findByPk(req.params.id, {
            include: [{
              model: User,
              as: 'users',
              through: {
                where: {}
              },
              required: true
            }],
          });
          //console.log(patient);
          //console.log(patient.users);
        if (!patient) {
            res.status(404).json({ mensaje: 'The patient was not found.'});
        } else {
            let newPatient = req.body;
            // actualizar en la bd
            // procesar las propiedades que viene en body
            Object.keys(newPatient).forEach((propiedad) => {
                patient[propiedad] = newPatient[propiedad];
            });
            // guaradar cambios
            await patient.save();

            // recuperar la suscripción
            const subscription = await Subscription.findOne({where: UserId = patient.users.id});
            let endpoint = subscription.endpoint;
            let p256dh = subscription.p256dh;
            let auth = subscription.auth;
            //console.log(subscription);
            // formato a los datos de la suscripción
            const subscriptionb = { endpoint, expirationTime: null, keys: { p256dh, auth } };
            //console.log(subscriptionb);
            // Comprobar valores
            let datos = {
                bloodPressure: "140/90",
                oxygenSaturation: "98",
                respiration: "10",
                heartRate: "80",
                glucose: "140/199",
                centralVenousPressure: "10",
                basalWater: "2000",
                insensibleLosses: "200",
                volumeLiquids: "80"
            };

            let mal =0;
            let bien= 0;
            Object.keys(datos).forEach((propiedad) => {
                
                if(patient[propiedad] <= datos[propiedad]){
                    bien += 1 ;
                }else{
                    mal += 1;
                }

            });
            //console.log(mal);
            //console.log(bien);

            if(mal===0){
                // enviar notificación
                sendPushNotification(
                    subscriptionb,
                    `El paciente ${patient.dataValues.firtsName} ${patient.dataValues.lastName}, ha sido actualizado`,
                    `La información del paciente ${patient.firtsName} ${patient.lastName}, ha sido actualizada.`,
                );
            }else{
                // enviar notificación de valores critico
                sendPushNotification(
                    subscriptionb,
                    `El paciente ${patient.dataValues.firtsName} ${patient.dataValues.lastName}, ha sido actualizado y tiene datos con valor critico.`,
                    `Las mediciones del paciente ${patient.firtsName} ${patient.lastName}, se encuentran fuera del margen del valor permitido.`,
                );
            }
            
            return res.json({ mensaje: 'The patient was updated.' });
        }
    } catch (error) {
        console.log(error);
        res.status(503).json({ mensaje: 'Failed to update patient.' });
    }
};

exports.listPatientUser = async (req, res, next) => {
    try {
        const patient = await Patient.findAll({
            include: [{
              model: User,
              as: 'users',
              through: {
                where: {
                    UserId: req.user.id,
                }
              },
              required: true
            }]
            
          });
        if(!patient) {
            res.tatus(404).json({mensaje: 'No se encontró el paciente'})
        } else {
        res.json(patient);
        }
    } catch (error) {
        console.error(error);
        res.json({ mensaje: 'Error reading users' });
        next();
    }
};

exports.updateManager = async (req, res, next) => {
    try {
        // obtener el registro de los pacientes desde la bd
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) {
            res.status(404).json({ mensaje: 'The patient was not found.'});
        } else {
            // actualizar en la bd
            // procesar las propiedades que viene en body
            Object.keys(req.body).forEach((propiedad) => {
                patient[propiedad] = req.body[propiedad];
            });
            // guaradar cambios
            await patient.save();
            res.json({ mensaje: 'The patient was updated.' });
        }
    } catch (error) {
        res.status(503).json({ mensaje: 'Failed to update patient.' });
    }
};

exports.updatePatientArea = async (req, res, next) => {
    try {
        // obtener el registro del videojuego desde la bd
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) {
            res.status(404).json({ mensaje: 'The patient was not found.'});
        } else {
                // actualizar en la bd
                // generate new patient
                let newPatient = req.body;
                patient.area = newPatient.area;
            // guaradar cambios
            await patient.save();
            res.json({ mensaje: 'The patient was updated from area.' });
        }
    } catch (error) {
        res.status(503).json({ mensaje: 'Failed to update patient from area.' });
        next();
        }
};

// delete patient
exports.delete = async (req, res, next) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) {
            res.status(404).json({ mensaje: 'The patient was not found.'});
        } else {
            await patient.destroy(); // patient.destroy({ where: {id: req.params.id }});
            res.json({ mensaje: 'Patient was deleted ' });
        }
    } catch (error) {
        res.status(503).json({ mensaje: 'Failed to delete patient. ' });
    }
};