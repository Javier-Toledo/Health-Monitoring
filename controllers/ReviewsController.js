const {Patient, User, Review} = require('../models');

// agregar paciente
exports.add = async (req, res, next) => {
    try {
      data = req.body;
      data.dateHourPerfom = new Date();
        // crear una revisión con los datos recibidos
        await Review.create(data);
        res.json({ mensaje: 'The review for patient was added.' });
    } catch (error) {
        console.error(error);
        let errores=[];
        if(error.errors){
            errores = error.errors.map((item) => ({
                campo: item.path,
                error: item.message,
            }))
        }
        res.json({
            error: true,
            mensaje: 'Failed to add review for patient.',
            errores,
        });
        next();
    }
};

exports.listReviewPatient = async (req, res, next) => {
    try {
        const review = await Review.findAll({
          where: {
            UserId: req.user.id, status: true,
          },
            include: [{
              model: Patient,
              required: true,
            }],
          });
        if(!review) {
            res.tatus(404).json({mensaje: 'Patient review not found.'})
        } else {
        res.json(review);
        }
    } catch (error) {
        console.error(error);
        res.json({ mensaje: 'Error reading review for patient' });
        next();
    }
};

exports.listReviewPatientManager = async (req, res, next) => {
  try {
      const review = await Review.findAll({
        include: [ { model: User, required: true, }, { model: Patient, required: true } ],
      });
      if(!review) {
          res.tatus(404).json({mensaje: 'Patient review not found.'})
      } else {
      res.json(review);
      }
  } catch (error) {
      console.error(error);
      res.json({ mensaje: 'Error reading review for patient' });
      next();
  }
};

// actualizar pacientes
exports.updateOwnReviewPatient = async (req, res, next) => {
  try {
      // obtener el registro de los pacientes desde la bd
      const review = await Review.findByPk(req.params.id, {
         where: { UserId: req.user.id, } 
        });
      if (!review) {
          res.status(404).json({ mensaje: 'The review for patient was not found.'});
      } else {
          let newReview = req.body;
          // actualizar en la bd
          // procesar las propiedades que viene en body
          Object.keys(newReview).forEach((propiedad) => {
              review[propiedad] = newReview[propiedad];
          });
          review.status = false;
          review.dateHourCompletion = new Date();
          // guaradar cambios
          await review.save();

          return res.json({ mensaje: 'The review for patient was updated.' });
      }
  } catch (error) {
      console.log(error);
      res.status(503).json({ mensaje: 'Failed to update review for patient.' });
  }
};

// actualizar pacientes
exports.updateAllManagerReviewPatient = async (req, res, next) => {
  try {
      // obtener el registro de los pacientes desde la bd
      const review = await Review.findByPk(req.params.id, { 
        });
      if (!review) {
          res.status(404).json({ mensaje: 'The review for patient was not found.'});
      } else {
          let newReview = req.body;
          // actualizar en la bd
          // procesar las propiedades que viene en body
          Object.keys(newReview).forEach((propiedad) => {
              review[propiedad] = newReview[propiedad];
          });
          // guaradar cambios
          await review.save();

          return res.json({ mensaje: 'The review for patient was updated.' });
      }
  } catch (error) {
      console.log(error);
      res.status(503).json({ mensaje: 'Failed to update review for patient.' });
  }
};

// delete patient
exports.delete = async (req, res, next) => {
  try {
      const review = await Review.findByPk(req.params.id);
      if (!review) {
          res.status(404).json({ mensaje: 'The review for patient was not found.'});
      } else {
          await review.destroy(); // review.destroy({ where: {id: req.params.id }});
          res.json({ mensaje: 'review for patient was deleted ' });
      }
  } catch (error) {
      res.status(503).json({ mensaje: 'Failed to delete review for patient. ' });
  }
};
