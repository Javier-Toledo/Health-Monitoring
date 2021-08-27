const express = require('express');
const { acessControl } = require('../middlewares/accessControl');

const router = express.Router();

// importar archivos de rutas
const patientRoutes = require('./patientRoutes');
const annotationsRoutes = require('./annotationsRoutes');
const userRoutes = require('./userRoutes');
const messagesRoutes = require('./messagesRoutes');
const reviewsRoutes = require('./reviewsRoutes');
const usersPatientsRoutes = require('./usersPatientsRoutes');

module.exports = () => {

  // vincular router de cada archivo de rutas
  patientRoutes(router, acessControl);
  annotationsRoutes(router, acessControl);
  userRoutes(router, acessControl);
  messagesRoutes(router, acessControl);
  reviewsRoutes(router, acessControl);
  usersPatientsRoutes(router, acessControl);
  
  return router;
}
