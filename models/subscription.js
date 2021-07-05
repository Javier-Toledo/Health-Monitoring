'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Subscription.belongsTo(models.User, {as:'user', foreignKey:'UserId'});
    }
  };
  Subscription.init({
    UserId: { type: DataTypes.INTEGER, allowNull: true },
    endpoint: { type: DataTypes.STRING, allowNull: false },
    p256dh: { type: DataTypes.STRING, allowNull: false },
    auth: { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};