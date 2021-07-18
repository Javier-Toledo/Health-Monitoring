'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      indications: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      dateHourPerfom: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      annotations: {
        type: Sequelize.TEXT
      },
      dateHourCompletion: {
        type: Sequelize.DATE
      },
      UserId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id'
        },
        allowNull: false
      },
      PatientId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'patients',
          },
          key: 'id'
        },
        allowNull: false
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
    await queryInterface.dropTable('Reviews');
  }
};