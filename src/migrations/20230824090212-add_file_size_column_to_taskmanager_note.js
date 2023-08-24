//Generated by GenerateSequelizeMigrateAddColumn - Sequelize Migrate Add Column
"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("taskmanager_note", "file_size", {
      type: Sequelize.BIGINT,
      allowNull: true,
      field: "file_size",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("taskmanager_note", "file_size");
  },
};