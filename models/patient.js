'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Patient.belongsToMany(models.User, {as:'nurse&doctor', through: 'user_patients' });
      models.Patient.hasMany(models.Annotations, {as:'annotations'});
    }
  };
  Patient.init({
    firtsName: { type: DataTypes.STRING, allowNull: false,
      validate:{ notEmpty: { args: true, msg: 'The name cannot be left empty.' } },
    },
    lastName: { type: DataTypes.STRING, allowNull: false,
      validate:{ notEmpty: { args: true, msg: 'The lastName cannot be left empty.' } },
    },
    bloodPressure: DataTypes.STRING,
    oxygenSaturation: DataTypes.STRING,
    respiration: DataTypes.STRING,
    heartRate: DataTypes.STRING,
    glucose: DataTypes.STRING,
    centralVenousPressure: DataTypes.STRING,
    basalWater: DataTypes.STRING,
    insensibleLosses: DataTypes.STRING,
    volumeLiquids: DataTypes.STRING,
    area: { type: DataTypes.STRING, allowNull: false,
      validate:{ notEmpty: { args: true, msg: 'The area cannot be left empty.' } },
    },
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};