'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firtsName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bloodPressure: {
        type: Sequelize.STRING
      },
      oxygenSaturation: {
        type: Sequelize.STRING
      },
      respiration: {
        type: Sequelize.STRING
      },
      heartRate: {
        type: Sequelize.STRING
      },
      glucose: {
        type: Sequelize.STRING
      },
      centralVenousPressure: {
        type: Sequelize.STRING
      },
      basalWater: {
        type: Sequelize.STRING
      },
      insensibleLosses: {
        type: Sequelize.STRING
      },
      volumeLiquids: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('Patients');
  }
};