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
    .readAny(['user','patient','annotation','messages'])
    .createOwn('annotation')
    .updateAny('patient')
    .updateOwn('profile')
    .deleteOwn('messages');

    ac.grant('manager')
    .extend('user')
    .createAny('patient')
    .updateAny(['user','patient-m'])
    .deleteAny(['user','patient-m']);

    ac.grant('admin')
    .extend('manager')
    .createAny(['user','annotation'])
    .updateAny('annotation')
    .deleteAny(['patient','annotation']);

    return ac;
};

