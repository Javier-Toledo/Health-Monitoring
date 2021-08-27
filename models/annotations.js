'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Annotations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Annotations.belongsTo(models.User);
      models.Annotations.belongsTo(models.Patient);
    }
  };
  Annotations.init({
    title: { type: DataTypes.STRING, allowNull: false,
      validate:{ notEmpty: { args: true, msg: 'The title cannot be left empty.' } },
    },
    annotation: { type: DataTypes.TEXT, allowNull: false,
      validate:{ notEmpty: { args: true, msg: 'The text of the description cannot be left empty.' } },
    },
    date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Annotations',
  });
  return Annotations;
};