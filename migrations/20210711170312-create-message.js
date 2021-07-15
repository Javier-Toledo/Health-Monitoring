'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idMessages: {
        type: Sequelize.STRING
      },
      user: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.DATE
      },
      UserIdEnvio: {
        type: Sequelize.INTEGER
      },
      UserIdRecibido: {
        type: Sequelize.INTEGER
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Messages');
  }
};