const MessagesController = require('../controllers/MessagesController');

module.exports = (router, acessControl) => {
  // rutas del recurso patients

  router.get('/messages-user',acessControl('readAny', 'messages'), MessagesController.listMessages);
  router.delete('/messages/:id', acessControl('deleteOwn', 'messages'), MessagesController.delete);
  return router;
};