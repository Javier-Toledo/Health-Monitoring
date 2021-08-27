const { Op } = require("sequelize");
const {User_Patients, User, Patient} = require('../models');

// agregar paciente
exports.add = async (req, res, next) => {
    try {
        if(!req.body.UserId){
            res.status(400).json({ error: true, message: 'The UserId are required.' });
        }else {
            // crear un asignación de perosnal a paciente con los datos recibidos
            await User_Patients.create(req.body);
            res.json({ message: 'The patient was added.' });
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
        res.json({ error: true, message: 'Failed to add patient.', errores, });
        next();
    }
};

// actualizar pacientes
exports.updateUserSchedule = async (req, res, next) => {
    try {
        // obtener el registro de los pacientes desde la bd
        const userSchedule = await User.findByPk(req.params.id, { });
          
        if (!userSchedule) {
            res.status(404).json({ error: true, message: 'The relationship was not found.'});
        } else {
            let newuserSchedule = req.body;
            // actualizar en la bd
            // procesar las propiedades que viene en body
            Object.keys(newuserSchedule).forEach((propiedad) => {
                userSchedule[propiedad] = newuserSchedule[propiedad];
            });
            // guaradar cambios
            await userSchedule.save();
            
            return res.json({ message: 'The user schedule was updated.' });
        }
    } catch (error) {
        console.log(error);
        res.status(503).json({ message: 'Failed to update user schedule.' });
    }
};

exports.listUserSchedule = async (req, res, next) => {
    try {
        const userSchedule = await User_Patients.findAll({
            include: [{
                model: User,
                as: 'users',
                attributes: ["id","firtsName","lastNames","workstation","CheckTimes","closingHour"],
                required: true
              }],
          });
        if(!userSchedule) {
            res.status(404).json({error:true, message: 'No se encontró la relación'})
        } else {
        res.json(userSchedule);
        }
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error reading user schedule' });
        next();
    }
};
