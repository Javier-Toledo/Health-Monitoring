const express = require('express');
const { acessControl } = require('../middlewares/accessControl');

const router = express.Router();

// importar archivos de rutas
const patientRoutes = require('./patientRoutes');
const annotationsRoutes = require('./annotationsRoutes')

module.exports = () => {

  // vincular router de cada archivo de rutas
  patientRoutes(router, acessControl);
  annotationsRoutes(router, acessControl);
  
  return router;
}
