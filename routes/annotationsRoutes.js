const annotationsController = require('../controllers/annotationsController');

module.exports = (router, acessControl) => {
  // rutas del recurso annotations

  router.post('/annotations', acessControl('createOwn', 'annotation'), annotationsController.add);

  return router;
};