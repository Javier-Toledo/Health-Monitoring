const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');
const accountController = require('../controllers/AccountController');



module.exports = function () {
    // rutas que no requiren autenticación
    router.post('/users', usersController.fileUpload, usersController.add);

    router.post('/validate-token-account', accountController.validateToken);
    return router;
};