'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Patient, { through: 'UserPatients' });
    }
  };
  User.init({
    avatar: DataTypes.STRING,
    firtsName: DataTypes.STRING,
    lastNames: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    workstation: DataTypes.STRING,
    occupation: DataTypes.STRING,
    area: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpire: DataTypes.DATE,
    accountAuthToken: DataTypes.STRING,
    accountAuthExpire:DataTypes.DATE,
    authentication: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  
  User.prototype.isValidPassword = function(password) {
    return  bcrypt.compareSync(password, this.password);
  };
  return User;
};