//Generated by CreateSequelizeModelCreateMigration
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "sessions",
      //Generated by GenerateFieldsForModelMigration
      //Generated by GetModelFieldsDictionary
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          field: "id",
        },
        expires: {
          type: Sequelize.DATE,
          field: "expires",
        },
        sessionToken: {
          type: Sequelize.STRING(255),
          field: "sessionToken",
        },
        userId: {
          type: Sequelize.UUID,
          field: "userId",
          //Generated by GetReferencesKeyForModelCreationMigration
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          field: "createdAt",
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          field: "updatedAt",
        },
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("sessions");
  },
};
