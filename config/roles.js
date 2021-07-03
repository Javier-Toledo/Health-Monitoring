const AccessControl = require('accesscontrol');

const ac = new AccessControl();
/**
 * definir roles del mas inferior al superior
 * perfil
 *   user
 *     admin
 */

exports.roles = () => {
    ac.grant('ninguno');
    //aqui los permisos de rol: ninguno

    ac.grant('user')
    .readOwn('profile')
    .readAny(['user','patient'])
    .updateOwn(['profile'])
    .deleteOwn(['profile']);

    ac.grant('areaManager')
    .extend('user')
    .createAny(['patient'])
    .updateAny(['user','patient','profile'])
    .deleteAny(['user','patient','profile']);

    ac.grant('admin')
    .extend('areaManager');

    return ac;
};

