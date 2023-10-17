import sequelize from "../config/db";

async function fixDatabaseRecords() {
  await sequelize.query(`
      UPDATE taskmanager_task
        SET finish_date_time = NOW()
      WHERE is_finished = TRUE AND finish_date_time IS NULL
    `);

  const records = await sequelize.query(`
        SELECT * FROM TaskNote
        WHERE file IS NOT NULL AND file != ''
    `);

  for (const record of records) {
  }
}

fixDatabaseRecords();
