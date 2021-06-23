const { Op } = require("sequelize");

const {Patient} = require('../models');

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

