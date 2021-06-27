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
    .readAny(['user','patient','annotation'])
    .createOwn('annotation')
    .updateOwn('profile');

    ac.grant('manager')
    .extend('user')
    .createAny('patient')
    .updateAny(['user','patient'])
    .deleteAny('user');

    ac.grant('admin')
    .extend('manager')
    .createAny(['user','annotation'])
    .updateAny('annotation')
    .deleteAny(['patient','annotation']);

    return ac;
};

