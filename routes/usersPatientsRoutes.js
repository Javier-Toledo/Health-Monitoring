const Users_PatientsController = require('../controllers/Users_PatientsController');

module.exports = (router, acessControl) => {
  // rutas del recurso patients

  router.post('/user-patients', acessControl('createAny', 'user-patient'), Users_PatientsController.add);
  router.get('/user-patient', acessControl('readAny', 'user-patient'), Users_PatientsController.listUserSchedule);
  router.put('/user-patient/:id', acessControl('updateAny', 'user-patient'), Users_PatientsController.updateUserSchedule);

  return router;
};