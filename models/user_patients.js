'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Patients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User_Patients.init({
    UserId: { type: DataTypes.INTEGER, allowNull: true },
    PatientId: { type: DataTypes.INTEGER, allowNull: true },
  }, {
    sequelize,
    modelName: 'User_Patients',
  });
  return User_Patients;
};