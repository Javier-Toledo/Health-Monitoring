const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');
const sesionController = require('../controllers/sesionController');
const accountController = require('../controllers/AccountController');
const passwordController = require('../controllers/passwordController');
const webPushController = require('../controllers/webPushController');

module.exports = function () {
    // rutas que no requiren autenticación
    router.post('/users', usersController.fileUpload, usersController.add);
    
    router.post('/login', sesionController.login);

    router.post('/validate-token-account', accountController.validateToken);

    router.post('/recover-password', passwordController.resetPassword);
    router.post('/validate-token-password', passwordController.validateToken);
    router.post('/update-password', passwordController.saveNewPassword);

    router.post('/push-subscription', webPushController.subscribe);
    return router;
};