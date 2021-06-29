const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const User = require('../models');

const { passwordEmail } = require('../utils/passwordEmail');

exports.resetPassword = async (request, response, next) => {
    try {
        //comprobar qe se reciba el email
        if(!request.body.email) {
            response.status(400).json({
                error: true,
                message: 'You must provide the email.'
            });
        }
        //buscar el usuario con ese email
        const user = await User.findOne({
            where: {email: request.body.email}
        });
        if(!user) {
            response.status(404).json({message: 'User does not exist.'});
        }
        //generar el token de recuperación de contraseña
        let token = await bcrypt.hash(user.email + Date.now().toString(), 10);
        token = token.replace(/\//g, "l");
        //guardar el token
        user.passwordResetToken = token;
        user.passwordResetExpire = Date.now() + 3600000; //expira en una hora
        // guardar usuario
        await user.save();
        //enviar el email
        const resultadoEmail = await passwordEmail(
            `${usuario.firtsName} ${usuario.lastNames}`,
            usuario.email,
            token
        );
        if (resultadoEmail) {
            response.json({ message: 'A message has been sent to the email provided.'});
        }else {
            response.status(503).json({ error: true, message: 'An error occurred while sending the recovery email.',})
        }
    } catch (error) {
        console.log(error);
        response.status(503).json({ error: true, message: 'An error occurred while sending the recovery email.',})
        next();
    }
};

exports.validateToken = async (request, response, next) => {
    try {
        //buscar el usuario con el token y vigencia
        const user = await User.findOne({
            where: {
                passwordResetToken: request.body.token,
                passwordResetExpire: {[Op.gt]: new Date()}, //el token sea vigente
            }
        });
        if(!user) {
            response.status(400).json({
                message: 'The reset password link is invalid or expired.'
            });
        }
        // en caso de que si lo encuentre retornar un status de que si es válido
        response.json({
            isValid: true,
            message: 'Enter a new password.',
        });
    } catch (error) {
        console.log(error);
        response.status(503).json({ message: 'Token validation failed.'});
        next();
    }
};

exports.saveNewPassword = async (request, response, next ) => {
    try {
        //volver a validar el token
        const user = await User.findOne({
            where: {
                passwordResetToken: request.body.token,
                passwordResetExpire: {[Op.gt]: new Date()}, //el token sea vigente
            }
        });
        if(!user) {
            response.status(400).json({
                message: 'The reset password link is invalid or has expired.'
            });
        }
        //validar que se reciba la contraseña
        if (!request.body.password){
            response.status(400).json({message: 'The password is mandatory.'});
        }
        //cifrar la contraseña
        const salt = await bcrypt.genSalt(10);
        //cifrar la contraseña
        user.password = await bcrypt.hash(request.body.password, salt);
        //quitar el token de recuperación
        user.passwordResetToken = '';
        user.passwordResetExpire = null;
        //guardar cambios
        await user.save();
        response.json({ message: 'The new password has been saved. Please log in.'});
    } catch (error) {
        console.log(error);
        response.status(503).json({ message: 'Failed to save password.'});
    }
};