const express = require('express');
const { acessControl } = require('../middlewares/accessControl');

const router = express.Router();

// importar archivos de rutas
const patientRoutes = require('./patientRoutes');

module.exports = () => {

  // vincular router de cada archivo de rutas
  patientRoutes(router, acessControl);
  
  return router;
}
