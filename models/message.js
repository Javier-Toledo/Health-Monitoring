'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //models.Message.belongsToMany(models.User, {as:'users', foreignKey:'UserId'  });
    }
  };
  Message.init({
    idMessages: DataTypes.STRING,
    user: DataTypes.STRING,
    message: DataTypes.TEXT,
    date: DataTypes.DATE,
    UserIdEnvio: DataTypes.INTEGER,
    UserIdRecibido: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};