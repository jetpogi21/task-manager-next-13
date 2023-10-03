"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `UPDATE taskmanager_task
       SET finish_date_time = NOW()
       WHERE is_finished = TRUE AND finish_date_time IS NULL`
    );
  },

  down: async (queryInterface, Sequelize) => {
    // There is no way to undo this migration as it would require knowing the previous state of the finish_date_time field
  },
};
