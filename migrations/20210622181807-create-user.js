'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      avatar: {
        type: Sequelize.STRING,
      },
      firtsName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: {
                args: true,
                msg: 'The name cannot be left empty',
            },
        },
      },
      lastNames: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: {
                args: true,
                msg: 'The lastNames cannot be left empty',
            },
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        allowNull: false,
        unique: true,
        validate:{
            notNull: {
                args: true,
                msg: 'The email cannot be empty',
            },
            notEmpty: {
                args: true,
                msg: 'The email cannot be empty',
            },
            isEmail: {
                args: true,
                msg: 'This is not a valid email',
            },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'user',
      },
      workstation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      occupation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      area: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      passwordResetToken: {
        type: Sequelize.STRING,
      },
      passwordResetExpire: {
          type: Sequelize.DATE,
      },
      accountAuthToken: {
        type: Sequelize.STRING,
      },
      accountAuthExpire: {
          type: Sequelize.DATE,
      },
      authentication: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};