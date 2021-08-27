'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Users', 'closingHour', {
          type: Sequelize.DataTypes.INTEGER,
          validate:{ max: 24, min: 1 },
          after: "status",
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'CheckTimes', {
          type: Sequelize.DataTypes.INTEGER,
          validate:{ max: 24, min: 1 },
          after: "status",
        }, { transaction: t }),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'closingHour', { transaction: t }),
        queryInterface.removeColumn('Users', 'CheckTimes', { transaction: t }),
      ]);
    });
  }
};