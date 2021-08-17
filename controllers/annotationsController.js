const { Op } = require("sequelize");

const {Annotations} = require('../models');

// agregar paciente
exports.add = async (req, res, next) => {
    try {
        // crear un paciente con los datos recibidos
        if(!req.body.patientId){
            res.status(404).json({ error: true, message: 'Information is missing.'});
        }else{
            const annotation = await Annotations.create({
                ...req.body,
                UserId:req.user.id,
                PatientId:req.body.patientId,
                date:Date.now() });
            res.json({ message: 'The annotation was saved.', annotation });
        }
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
            message: 'Failed to save annotation.',
            errores,
        });
        next();
    }
};