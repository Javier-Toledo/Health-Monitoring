const { Op } = require("sequelize");

const {Patient, User} = require('../models');

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