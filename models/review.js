'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Review.belongsTo(models.User);
      models.Review.belongsTo(models.Patient);
    }
  };
  Review.init({
    status: DataTypes.BOOLEAN,
    indications: { type: DataTypes.TEXT, allowNull: false,
      validate:{ notEmpty: { args: true, msg: 'The indications cannot be left empty.' } },
    },
    dateHourPerfom: DataTypes.DATE,
    annotations: { type: DataTypes.TEXT, allowNull: false,
      validate:{ notEmpty: { args: true, msg: 'The anotations cannot be left empty.' } },
    },
    dateHourCompletion: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};