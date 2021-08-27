const patientsController = require('../controllers/patientsController');

module.exports = (router, acessControl) => {
  // rutas del recurso patients

  router.post('/patients', acessControl('createAny', 'patient'), patientsController.add);
  router.put('/patients/:id', acessControl('updateAny', 'patient'), patientsController.updateOwn);
  router.get('/patient-user', acessControl('readAny', 'patient'), patientsController.listPatientUser);
  router.put('/patients-manager/:id', acessControl('updateAny', 'patient-m'), patientsController.updateManager);
  router.put('/patients-update-area/:id', acessControl('updateAny', 'patient-m'),patientsController.updatePatientArea);
  router.delete('/patients/:id', acessControl('deleteAny', 'patient-m'),patientsController.delete);
  return router;
};