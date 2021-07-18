const ReviewsController = require('../controllers/ReviewsController');

module.exports = (router, acessControl) => {
  // rutas del recurso patients

  router.post('/reviews', acessControl('createAny', 'review'), ReviewsController.add);
  router.get('/review-patients', acessControl('readOwn', 'review'), ReviewsController.listReviewPatient);
  router.get('/review-patients-manager', acessControl('readAny', 'review'), ReviewsController.listReviewPatientManager);
  router.put('/reviews/:id', acessControl('updateOwn', 'review'), ReviewsController.updateOwnReviewPatient);
  router.put('/reviews-manager/:id', acessControl('updateAny', 'review'), ReviewsController.updateAllManagerReviewPatient);

  return router;
};