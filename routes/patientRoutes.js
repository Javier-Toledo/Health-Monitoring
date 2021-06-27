const patientsController = require('../controllers/patientsController');

module.exports = (router, acessControl) => {
  // rutas del recurso patients

  router.post('/patients', acessControl('createAny', 'patient'), patientsController.add);

  return router;
};