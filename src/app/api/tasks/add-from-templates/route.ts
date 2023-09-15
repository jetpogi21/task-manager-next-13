import sequelize from "@/config/db";
import { TaskInterval } from "@/models/TaskIntervalModel";
import { convertDateToYYYYMMDD } from "@/utils/utilities";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

function getSemimonthOfYear(date: Date) {
  if (!(date instanceof Date)) {
    throw new Error("Invalid input. Expected a Date object.");
  }

  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  let semimonthOfYear = month * 2;

  if (dayOfMonth < 15) {
    semimonthOfYear--;
  }

  return semimonthOfYear;
}

function getStartAndEndOfWeek(week: number, year: number) {
  // Calculate the start date of the week
  const startDate = new Date(year, 0, 1 + (week - 1) * 7);

  // Calculate the end date of the week
  const endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);

  // Return an object containing the start and end dates
  return { startDate, endDate };
}

function getStartAndEndOfMonth(month: number, year: number) {
  // Calculate the start date of the month
  const startDate = new Date(year, month, 1);

  // Calculate the end date of the month
  const endDate = new Date(year, month + 1, 0);

  // Return an object containing the start and end dates
  return { startDate, endDate };
}

function getStartAndEndOfSemimonth(semimonthOfYear: number, year: number) {
  const month = Math.ceil(semimonthOfYear / 2) - 1;
  const isFirstHalf = semimonthOfYear % 2 === 0;

  const startDate = new Date(year, month, isFirstHalf ? 1 : 15);
  const endDate = new Date(year, month + 1, isFirstHalf ? 14 : 0);

  return { startDate, endDate };
}

export const POST = async (req: Request) => {
  //Get the date today
  const date = new Date();
  const weekday = date.getDay();

  const t = await sequelize.transaction();

  const taskIntervals = await TaskInterval.findAll({
    where: {
      name: {
        [Op.in]: ["Daily", "Working Day", "Weekly", "Monthly", "Semi-monthly"],
      },
    },
  });

  try {
    for (const taskInterval of taskIntervals) {
      const { id: taskIntervalID, name: taskIntervalName } = taskInterval;
      //0 is sunday, 6 is saturday (skip)
      if (taskIntervalName === "Working Day" && [0, 6].includes(weekday)) {
        continue;
      }

      let taskSQL = "";
      let taskTemplateSQL = "";
      let insertSQL = "";
      const replacements: Record<string, unknown> = {};
      let dateFilter = "";
      if (["Working Day", "Daily"].includes(taskIntervalName)) {
        dateFilter = "`date` = :date";
      } else {
        const currentYear = date.getFullYear();
        let dates: { startDate: Date; endDate: Date };
        switch (taskIntervalName) {
          case "Weekly":
            const currentYearStartDate = new Date(currentYear, 0, 1);
            const days = Math.floor(
              (date.getTime() - currentYearStartDate.getTime()) /
                (24 * 60 * 60 * 1000)
            );
            const currentWeek = Math.ceil(days / 7);
            dates = getStartAndEndOfWeek(currentWeek, currentYear);
            break;
          case "Monthly":
            const currentMonth = date.getMonth();
            dates = getStartAndEndOfMonth(currentMonth, currentYear);
            break;
          case "Semi-monthly":
            const currentSemiMonth = getSemimonthOfYear(date);
            dates = getStartAndEndOfSemimonth(currentSemiMonth, currentYear);
            break;
        }
        const { startDate, endDate } = dates!;
        dateFilter = "`date` >= :startDate AND `date` <= :endDate";
        replacements["startDate"] = convertDateToYYYYMMDD(startDate);
        replacements["endDate"] = convertDateToYYYYMMDD(endDate);
      }

      taskSQL = `SELECT task_template_id FROM taskmanager_task WHERE ${dateFilter} AND 
          task_interval_id = :task_interval_id AND NOT task_template_id IS NULL`;
      taskTemplateSQL = `SELECT \`description\`, :date AS task_date,:date AS target_date, task_category_id,task_interval_id, id 
        FROM taskmanager_tasktemplate LEFT JOIN
        (${taskSQL}) tempTask ON taskmanager_tasktemplate.id = tempTask.task_template_id
        WHERE taskmanager_tasktemplate.task_interval_id = :task_interval_id AND NOT is_suspended AND 
        tempTask.task_template_id IS NULL
        `;

      insertSQL = `INSERT INTO taskmanager_task (\`description\`,\`date\`,target_date,task_category_id,task_interval_id,task_template_id) ${taskTemplateSQL}`;

      //Get only where taskTemplateID IS NULL connection
      replacements["date"] = convertDateToYYYYMMDD(date);
      replacements["task_interval_id"] = taskIntervalID;

      await sequelize.query(insertSQL, {
        replacements,
        transaction: t,
      });
    }

    //Import the subtasks templates
    const taskSQL = `SELECT id as task_id,task_template_id FROM taskmanager_task WHERE NOT sub_task_imported AND NOT task_template_id IS NULL`;
    const subTaskTemplateSQL = `SELECT \`description\`,priority,task_id FROM
     taskmanager_subtasktemplate INNER JOIN (${taskSQL}) tempTasks ON taskmanager_subtasktemplate.task_template_id = tempTasks.task_template_id`;
    const insertSQL = `INSERT INTO taskmanager_subtask (\`description\`,priority,task_id) ${subTaskTemplateSQL}`;

    await sequelize.query(insertSQL, {
      transaction: t,
    });

    //UPDATE THE TASKS
    const updateSQL = `UPDATE taskmanager_task SET sub_task_imported = 1 WHERE NOT sub_task_imported AND NOT task_template_id IS NULL`;

    await sequelize.query(updateSQL, {
      transaction: t,
    });

    await t.commit();
    return NextResponse.json({ data: "success" });
  } catch (e) {
    console.log(e);
    await t.rollback();
    return NextResponse.json({ data: "error" });
  }
};
