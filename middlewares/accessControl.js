const { roles } = require('../config/roles');

//funcion para validar el permiso del usuario actual sobre el recurso indicado

exports.acessControl = (accion, recurso) => 
    async (request, response, next) => {
        try {
            //permiso
            const permiso = roles().can(request.user.role)[accion](recurso);
            if(!permiso.granted) {
                return response.status(403).json({
                    message: 'Not authorized to perform this action.',
                });
            }
            return next(); //continue con el proceso del request

        } catch (error) {
            return next(error);
        }
}; 