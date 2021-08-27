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
    .readOwn(['profile','review'])
    .readAny(['user','patient','annotation','messages'])
    .createOwn('annotation')
    .updateAny(['patient','review'])
    .updateOwn(['profile','review'])
    .deleteOwn('messages');

    ac.grant('manager')
    .extend('user')
    .createAny(['patient','review','user-patient'])
    .readAny(['review','user-patient'])
    .updateAny(['user','patient-m','review','user-patient'])
    .deleteAny(['user','patient-m','review']);

    ac.grant('admin')
    .extend('manager')
    .createAny(['user','annotation'])
    .updateAny('annotation')
    .deleteAny(['patient','annotation']);

    return ac;
};

