const usersController = require('../controllers/usersController');

module.exports = (router, acessControl) => {
  // rutas del recurso patients

  router.get('/users-area', acessControl('readAny', 'user'), usersController.listArea);
  router.get('/admin-area', acessControl('readAny', 'user'), usersController.listadmin);
  router.put('/users/:id', acessControl('updateAny', 'user'),usersController.fileUpload, usersController.update);
  return router;
};