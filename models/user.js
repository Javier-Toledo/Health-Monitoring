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
      models.User.belongsToMany(models.Patient, {as:'patients' , through: 'user_patients' });
      models.User.hasMany(models.Annotations, {as:'annotations'});
    }
  };
  User.init({
    avatar: DataTypes.STRING,
    firtsName:{ type: DataTypes.STRING, allowNull: false,
      validate:{ notEmpty: { args: true, msg: 'The name cannot be left empty.' } },
    },
    lastName: { type: DataTypes.STRING, allowNull: false,
      validate:{ notEmpty: { args: true, msg: 'The lastNames cannot be left empty.' } },
    },
    email: { type: DataTypes.STRING, unique: true, allowNull: false,
        validate:{
          notNull: { args: true, msg: 'The email cannot be empty.' },
          notEmpty: { args: true, msg: 'The email cannot be empty.' },
          isEmail: { args: true, msg: 'This is not a valid email.' },
        },
    },
    password: { type: DataTypes.STRING, allowNull: false,
      validate:{ notEmpty: { args: true, msg: 'The password cannot be left empty.' } },
    },
    role: DataTypes.STRING,
    workstation: { type: DataTypes.STRING, allowNull: false,
      validate:{ notEmpty: { args: true, msg: 'The work station cannot be left empty.' } },
    },
    occupation: { type: DataTypes.STRING, allowNull: false,
      validate:{ notEmpty: { args: true, msg: 'The occupation cannot be left empty.' } },
    },
    area: { type: DataTypes.STRING, allowNull: false,
      validate:{ notEmpty: { args: true, msg: 'The area cannot be left empty.' } },
    },
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