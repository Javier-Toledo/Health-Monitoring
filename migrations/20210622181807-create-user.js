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
        allowNull: false
      },
      lastNames: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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