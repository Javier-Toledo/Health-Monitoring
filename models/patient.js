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
      
      models.Patient.belongsToMany(models.User, { through: 'UserPatients' });
    }
  };
  Patient.init({
    firtsName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bloodPressure: DataTypes.STRING,
    oxygenSaturation: DataTypes.STRING,
    respiration: DataTypes.STRING,
    heartRate: DataTypes.STRING,
    glucose: DataTypes.STRING,
    centralVenousPressure: DataTypes.STRING,
    basalWater: DataTypes.STRING,
    insensibleLosses: DataTypes.STRING,
    volumeLiquids: DataTypes.STRING,
    area: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};