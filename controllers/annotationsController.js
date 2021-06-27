const { Op } = require("sequelize");

const {Annotations} = require('../models');

// agregar paciente
exports.add = async (req, res, next) => {
    try {
        // crear un paciente con los datos recibidos
        const annotation = await Annotations.create({ ...req.body, UserId:req.user.id, PatientId:req.body.patientId });
        res.json({ mensaje: 'The annotation was saved.', annotation });
    } catch (error) {
        console.error(error);
        let errores=[];
        if(error.errors){
            errores = error.errors.map((item) => ({
                campo: item.path,
                error: item.message,
            }));
        }
        res.status(503).json({
            error: true,
            mensaje: 'Failed to save annotation.',
            errores,
        });
        next();
    }
};