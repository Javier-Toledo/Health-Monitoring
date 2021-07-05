const { Op } = require("sequelize");
const {User} = require('../models');

exports.validateToken = async (request, response, next) => {
    try {
        //volver a validar el token
        const user = await User.findOne({
            where: {
                accountAuthToken: request.body.token,
                accountAuthExpire: {[Op.gt]: new Date()}, //el token sea vigente
            }
        });
        if(!user) {
            response.status(400).json({
                message: 'The account authentication link is invalid or has expired.'
            });
        }
        user.authentication = true ;
        //quitar el token de recuperación
        user.accountAuthToken = null;
        user.accountAuthExpire = null;
        //guardar cambios
        await user.save();
        response.json({ message: 'Authentication was successful. You can now log in.'});
    } catch (error) {
        console.log(error);
        response.status(503).json({ message: 'Failed to authentication.'});
    }
};