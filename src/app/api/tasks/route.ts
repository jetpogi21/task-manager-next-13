//Generated by WriteToModelsRouteApi - models route next 13 with SQL
import TaskModel, { Task } from "@/models/TaskModel";
import { FindOptions, QueryTypes, Transaction } from "sequelize";
import {
  checkDuplicateCombinations,
  getSort,
  parseParams,
  reduceResult,
  removeDuplicates,
  returnJSONResponse,
} from "@/utils/utils";
import sequelize from "@/config/db";
import handleSequelizeError from "@/utils/errorHandling";
import { Op } from "sequelize";
import {
  TaskDeletePayload,
  TaskFormUpdatePayload,
  TaskFormikShape,
  TaskSearchParams,
  TaskUpdatePayload,
} from "@/interfaces/TaskInterfaces";
import { NextResponse } from "next/server";
import { DEFAULT_LIMIT } from "@/utils/constants";
import {
  COLUMNS,
  DEFAULT_SORT_BY,
  PRIMARY_KEY,
  TABLE_NAME,
  UNIQUE_FIELDS,
} from "@/utils/constants/TaskConstants";
import { TaskSchema } from "@/schema/TaskSchema";
import {
  addCursorFilterToQuery,
  appendFieldsToSQL,
  getColumnKeyByDbName,
  getCursorString,
  getDatabaseFieldName,
  getMappedKeys,
  getSortedValue,
  processFields,
  resetSQL,
} from "@/utils/api/utils";
import clsJoin from "@/utils/clsJoin";
import clsSQL from "@/utils/clsSQL";
//Generated by GetAllCreateSimpleModelFromRoute
//Generated by GetCreateSimpleModelFromRoute - GetCreateSimpleModelFromRoute
import { createTaskTag } from "@/app/api/task-tags/route";
//Generated by GetAllRelatedLeftModelImportRoute
//Generated by GetRelatedLeftModelImportRoute - GetRelatedLeftModelImportRoute
import { createSubTask, updateSubTask } from "@/utils/api/SubTaskLibs";
import { SubTaskSchema } from "@/schema/SubTaskSchema";
import { PRIMARY_KEY as SUBTASK_PRIMARY_KEY } from "@/utils/constants/SubTaskConstants";
//Generated by GetRelatedLeftModelImportRoute - GetRelatedLeftModelImportRoute
import { createTaskNote, updateTaskNote } from "@/utils/api/TaskNoteLibs";
import { TaskNoteSchema } from "@/schema/TaskNoteSchema";
import { PRIMARY_KEY as TASKNOTE_PRIMARY_KEY } from "@/utils/constants/TaskNoteConstants";
import { createTask, deleteTasks, updateTask } from "@/utils/api/TaskLibs";

const ModelObject = Task;

//Generated by GeneratefindOptions
const findOptions: FindOptions<typeof Task> = {
  //Generated by GenerateIncludeOption
  include: [],
  //Generated by GenerateAttributesOption
  attributes: [
    //Generated by GetAllModelAttributesBySeqModel
    "taskCategoryID",
    "taskIntervalID",
    "id",
    "description",
    "taskTemplateID",
    "date",
    "targetDate",
    "finishDateTime",
    "isFinished",
  ],
};

//Generated by GetGetmodelsqlNext13 - getModelSQL Next 13
function getTaskSQL(
  query: Partial<TaskSearchParams>,
  dontFilter: boolean = false
) {
  const taskAttributes = getMappedKeys(COLUMNS);

  const simpleOnly = query["simpleOnly"];
  const cursor = query["cursor"];
  const limit = query["limit"] || DEFAULT_LIMIT;

  const sort = getSortedValue(
    query["sort"]
      ? `${query["sort"].includes("-") ? "-" : ""}${getDatabaseFieldName(
          query["sort"],
          COLUMNS
        )}`
      : undefined,
    taskAttributes,
    DEFAULT_SORT_BY
  );

  //Remove the - from the sort parameter
  const sortField = sort.includes("-") ? sort.substring(1) : sort;

  //Declare the variables
  const table = TABLE_NAME;
  const fields: ([string, string] | string)[] =
    //Generated by GenerateSQLFieldList
    [
      ["task_category_id", "taskCategoryID"],
      ["task_interval_id", "taskIntervalID"],
      "id",
      "description",
      ["task_template_id", "taskTemplateID"],
      "date",
      ["target_date", "targetDate"],
      ["finish_date_time", "finishDateTime"],
      ["is_finished", "isFinished"],
    ];

  //This will be used to store the fields to be used from the joins
  const joinFields: string[] = [];

  //This will be used to store the replacements needed
  let replacements: Record<string, string> = {};

  const sql = new clsSQL();
  sql.source = table;

  const filters: string[] = [];

  if (!simpleOnly || simpleOnly !== "true") {
    //Generated by GenerateSeqModelFilters
    //Generated by GetLikeFilters - LIKE Template
    const q = query.q as string;

    if (q && !dontFilter) {
      const fields: string[] = ["description"];
      replacements["q"] = `*${q}*`;
      filters.push(
        `MATCH (${fields
          .map((field) => `${TABLE_NAME}.${field}`)
          .join(",")}) AGAINST (:q IN boolean mode)`
      );
    }

    //Generated by GenerateModelFilterSnippet
    //Generated by GetSingleFilter - Single Filter
    const taskCategory = query.taskCategory as string;

    if (taskCategory && !dontFilter) {
      filters.push(`${table}.task_category_id = :taskCategory`);
      replacements["taskCategory"] = taskCategory;
    }

    //Generated by GenerateModelFilterSnippet
    //Generated by GetSingleFilter - Single Filter
    const taskInterval = query.taskInterval as string;

    if (taskInterval && !dontFilter) {
      filters.push(`${table}.task_interval_id = :taskInterval`);
      replacements["taskInterval"] = taskInterval;
    }
  }

  /* INSERT JOINS HERE */
  //Generated by GetAllSQLRightJoinSnippets
  //Generated by GetSQLRightJoinSnippetFromRelationship - GetSQLRightJoinSnippetFromRelationship
  let {
    sql: taskTemplate_SQL,
    fieldAliases: taskTemplate_fieldAliases,
    replacements: taskTemplate_replacements,
    subqueryAlias: taskTemplate_subqueryAlias,
    modelName: taskTemplate_modelName,
    filtered: taskTemplate_filtered,
  } = getTaskTemplateSQL(query, dontFilter);

  replacements = { ...replacements, ...taskTemplate_replacements };

  taskTemplate_fieldAliases.forEach((field) => {
    joinFields.push(`${taskTemplate_subqueryAlias}.${field}`);
  });

  const taskTemplateJoin = new clsJoin(
    taskTemplate_SQL.sql(),
    "task_template_id",
    `\`${taskTemplate_modelName}.id\``, //`taskTemplate.id`
    taskTemplate_subqueryAlias, //tempTaskTemplates
    "INNER"
  );

  if (taskTemplate_filtered) {
    sql.joins.push(taskTemplateJoin);
  }
  //Generated by GetSQLRightJoinSnippetFromRelationship - GetSQLRightJoinSnippetFromRelationship
  let {
    sql: taskCategory_SQL,
    fieldAliases: taskCategory_fieldAliases,
    replacements: taskCategory_replacements,
    subqueryAlias: taskCategory_subqueryAlias,
    modelName: taskCategory_modelName,
    filtered: taskCategory_filtered,
  } = getTaskCategorySQL(query, dontFilter);

  replacements = { ...replacements, ...taskCategory_replacements };

  taskCategory_fieldAliases.forEach((field) => {
    joinFields.push(`${taskCategory_subqueryAlias}.${field}`);
  });

  const taskCategoryJoin = new clsJoin(
    taskCategory_SQL.sql(),
    "task_category_id",
    `\`${taskCategory_modelName}.id\``, //`taskCategory.id`
    taskCategory_subqueryAlias, //tempTaskCategorys
    "INNER"
  );

  if (taskCategory_filtered) {
    sql.joins.push(taskCategoryJoin);
  }
  //Generated by GetSQLRightJoinSnippetFromRelationship - GetSQLRightJoinSnippetFromRelationship
  let {
    sql: taskInterval_SQL,
    fieldAliases: taskInterval_fieldAliases,
    replacements: taskInterval_replacements,
    subqueryAlias: taskInterval_subqueryAlias,
    modelName: taskInterval_modelName,
    filtered: taskInterval_filtered,
  } = getTaskIntervalSQL(query, dontFilter);

  replacements = { ...replacements, ...taskInterval_replacements };

  taskInterval_fieldAliases.forEach((field) => {
    joinFields.push(`${taskInterval_subqueryAlias}.${field}`);
  });

  const taskIntervalJoin = new clsJoin(
    taskInterval_SQL.sql(),
    "task_interval_id",
    `\`${taskInterval_modelName}.id\``, //`taskInterval.id`
    taskInterval_subqueryAlias, //tempTaskIntervals
    "INNER"
  );

  if (taskInterval_filtered) {
    sql.joins.push(taskIntervalJoin);
  }
  //Generated by GetAllSQLLeftJoinSnippets
  //Generated by GetSQLLeftJoinSnippetFromRelationship - GetSQLLeftJoinSnippetFromRelationship
  let {
    sql: subTask_SQL,
    fieldAliases: subTask_fieldAliases,
    replacements: subTask_replacements,
    subqueryAlias: subTask_subqueryAlias,
    modelName: subTask_modelName,
    filtered: subTask_filtered,
  } = getSubTaskSQL(query, dontFilter);

  replacements = { ...replacements, ...subTask_replacements };

  subTask_fieldAliases.forEach((field) => {
    joinFields.push(`${subTask_subqueryAlias}.${field}`);
  });

  const subTaskJoin = new clsJoin(
    subTask_SQL.sql(),
    "id",
    `\`${subTask_modelName}.taskID\``, //`subTask.id`
    subTask_subqueryAlias, //tempSubTasks
    "INNER"
  );

  if (subTask_filtered) {
    sql.joins.push(subTaskJoin);
  }
  //Generated by GetSQLLeftJoinSnippetFromRelationship - GetSQLLeftJoinSnippetFromRelationship
  let {
    sql: taskTag_SQL,
    fieldAliases: taskTag_fieldAliases,
    replacements: taskTag_replacements,
    subqueryAlias: taskTag_subqueryAlias,
    modelName: taskTag_modelName,
    filtered: taskTag_filtered,
  } = getTaskTagSQL(query, dontFilter);

  replacements = { ...replacements, ...taskTag_replacements };

  taskTag_fieldAliases.forEach((field) => {
    joinFields.push(`${taskTag_subqueryAlias}.${field}`);
  });

  const taskTagJoin = new clsJoin(
    taskTag_SQL.sql(),
    "id",
    `\`${taskTag_modelName}.taskID\``, //`taskTag.id`
    taskTag_subqueryAlias, //tempTaskTags
    "INNER"
  );

  if (taskTag_filtered) {
    sql.joins.push(taskTagJoin);
  }
  //Generated by GetSQLLeftJoinSnippetFromRelationship - GetSQLLeftJoinSnippetFromRelationship
  let {
    sql: taskNote_SQL,
    fieldAliases: taskNote_fieldAliases,
    replacements: taskNote_replacements,
    subqueryAlias: taskNote_subqueryAlias,
    modelName: taskNote_modelName,
    filtered: taskNote_filtered,
  } = getTaskNoteSQL(query, dontFilter);

  replacements = { ...replacements, ...taskNote_replacements };

  taskNote_fieldAliases.forEach((field) => {
    joinFields.push(`${taskNote_subqueryAlias}.${field}`);
  });

  const taskNoteJoin = new clsJoin(
    taskNote_SQL.sql(),
    "id",
    `\`${taskNote_modelName}.taskID\``, //`taskNote.id`
    taskNote_subqueryAlias, //tempTaskNotes
    "INNER"
  );

  if (taskNote_filtered) {
    sql.joins.push(taskNoteJoin);
  }

  //Count should be pre-cursor
  //This part would return the count SQL
  sql.fields = [`COUNT(DISTINCT ${TABLE_NAME}.${PRIMARY_KEY}) AS count`];
  if (filters.length > 0) {
    sql.filter = filters.join(" AND ");
  }
  const countSQL = sql.sql();
  sql.filter = "";

  sql.orderBy = getSort(sort, DEFAULT_SORT_BY, PRIMARY_KEY);
  if (cursor) {
    addCursorFilterToQuery(
      cursor,
      sort,
      sortField,
      PRIMARY_KEY,
      replacements,
      filters,
      TABLE_NAME
    );
  }

  if (filters.length > 0) {
    sql.filter = filters.join(" AND ");
  }

  sql.limit = simpleOnly === "true" ? 0 : parseInt(limit);

  //This part will produce the distinct SQL
  sql.fields = [`${TABLE_NAME}.${PRIMARY_KEY}`];
  sql.groupBy = [PRIMARY_KEY];

  const distinctSQL = sql.sql();

  const distinctJoin = new clsJoin(
    distinctSQL,
    PRIMARY_KEY,
    PRIMARY_KEY,
    "tempDistinct",
    "INNER"
  );

  sql.fields = [];

  //build the sql field name and aliases (aliases are used to destructure the object)
  appendFieldsToSQL(fields, sql, table);

  sql.fields = sql.fields.concat(joinFields);

  /* Insert Join Cancellations here..*/
  //Generated by GetAllRightModelJoinCancellationSnippet
  //Generated by GetRightModelJoinCancellationSnippet - GetRightModelJoinCancellationSnippet
  taskTemplate_SQL = getTaskTemplateSQL(query, true).sql;
  taskTemplateJoin.source = taskTemplate_SQL.sql();
  taskTemplateJoin.joinType = "LEFT";
  //Generated by GetRightModelJoinCancellationSnippet - GetRightModelJoinCancellationSnippet
  taskCategory_SQL = getTaskCategorySQL(query, true).sql;
  taskCategoryJoin.source = taskCategory_SQL.sql();
  taskCategoryJoin.joinType = "LEFT";
  //Generated by GetRightModelJoinCancellationSnippet - GetRightModelJoinCancellationSnippet
  taskInterval_SQL = getTaskIntervalSQL(query, true).sql;
  taskIntervalJoin.source = taskInterval_SQL.sql();
  taskIntervalJoin.joinType = "LEFT";
  //Generated by GetAllLeftModelJoinCancellationSnippet
  //Generated by GetLeftModelJoinCancellationSnippet - GetLeftModelJoinCancellationSnippet
  subTask_SQL = getSubTaskSQL(query, true).sql;
  subTaskJoin.source = subTask_SQL.sql();
  subTaskJoin.joinType = "LEFT";
  //Generated by GetLeftModelJoinCancellationSnippet - GetLeftModelJoinCancellationSnippet
  taskTag_SQL = getTaskTagSQL(query, true).sql;
  taskTagJoin.source = taskTag_SQL.sql();
  taskTagJoin.joinType = "LEFT";
  //Generated by GetLeftModelJoinCancellationSnippet - GetLeftModelJoinCancellationSnippet
  taskNote_SQL = getTaskNoteSQL(query, true).sql;
  taskNoteJoin.source = taskNote_SQL.sql();
  taskNoteJoin.joinType = "LEFT";

  //Insert joins here LEFT joins e.g. cardCardKeywordJoin, distincJoin or
  //new clsJoin("marvelduel_belongsto", "deck_id", "id", null)
  sql.joins = [
    distinctJoin,
    //Generated by GetAllRightJoinName
    taskTemplateJoin, //Generated by GetRightJoinName - GetRightJoinName
    taskCategoryJoin, //Generated by GetRightJoinName - GetRightJoinName
    taskIntervalJoin, //Generated by GetRightJoinName - GetRightJoinName
    //Generated by GetAllLeftJoinName
    subTaskJoin, //Generated by GetLeftJoinName - GetLeftJoinName
    taskTagJoin, //Generated by GetLeftJoinName - GetLeftJoinName
    taskNoteJoin, //Generated by GetLeftJoinName - GetLeftJoinName
  ];
  resetSQL(sql);

  const sqlString: string = sql.sql();

  return {
    sqlString,
    countSQL,
    replacements,
  };
}

//Generated by GetAllGetmodelsqlChildNext13
//Generated by GetRightModelgetModelSQLSnippet - GetRightModelgetModelSQLSnippet
function getTaskTemplateSQL(
  query: Partial<TaskSearchParams>,
  dontFilter: boolean = false
) {
  const table = "taskmanager_tasktemplate";
  const fields: (string | [string, string])[] =
    //Generated by GenerateSQLFieldList
    [
      "id",
      "description",
      ["is_suspended", "isSuspended"],
      ["task_category_id", "taskCategoryID"],
      ["task_interval_id", "taskIntervalID"],
    ];
  const fieldAliases: string[] = [];
  const modelName = "TaskTemplate";
  let filtered = false;
  let replacements: Record<string, string> = {};

  let sql = new clsSQL();
  sql.source = table;

  //build the sql field name and aliases (aliases are used to destructure the object)
  processFields(fields, modelName, table, fieldAliases, sql);

  const filters: string[] = [];
  //Generated by GenerateSeqModelFilters

  /*INSERT JOINS HERE*/

  if (filters.length > 0) {
    filtered = true;
    sql.filter = filters.join(" AND ");
  }

  return {
    sql,
    fieldAliases,
    replacements,
    subqueryAlias: "tempTaskTemplate",
    modelName,
    filtered,
  };
}
//Generated by GetRightModelgetModelSQLSnippet - GetRightModelgetModelSQLSnippet
function getTaskCategorySQL(
  query: Partial<TaskSearchParams>,
  dontFilter: boolean = false
) {
  const table = "taskmanager_taskcategory";
  const fields: (string | [string, string])[] =
    //Generated by GenerateSQLFieldList
    ["id", "name"];
  const fieldAliases: string[] = [];
  const modelName = "TaskCategory";
  let filtered = false;
  let replacements: Record<string, string> = {};

  let sql = new clsSQL();
  sql.source = table;

  //build the sql field name and aliases (aliases are used to destructure the object)
  processFields(fields, modelName, table, fieldAliases, sql);

  const filters: string[] = [];
  //Generated by GenerateSeqModelFilters

  /*INSERT JOINS HERE*/

  if (filters.length > 0) {
    filtered = true;
    sql.filter = filters.join(" AND ");
  }

  return {
    sql,
    fieldAliases,
    replacements,
    subqueryAlias: "tempTaskCategory",
    modelName,
    filtered,
  };
}
//Generated by GetRightModelgetModelSQLSnippet - GetRightModelgetModelSQLSnippet
function getTaskIntervalSQL(
  query: Partial<TaskSearchParams>,
  dontFilter: boolean = false
) {
  const table = "taskmanager_taskinterval";
  const fields: (string | [string, string])[] =
    //Generated by GenerateSQLFieldList
    ["id", "name"];
  const fieldAliases: string[] = [];
  const modelName = "TaskInterval";
  let filtered = false;
  let replacements: Record<string, string> = {};

  let sql = new clsSQL();
  sql.source = table;

  //build the sql field name and aliases (aliases are used to destructure the object)
  processFields(fields, modelName, table, fieldAliases, sql);

  const filters: string[] = [];
  //Generated by GenerateSeqModelFilters

  /*INSERT JOINS HERE*/

  if (filters.length > 0) {
    filtered = true;
    sql.filter = filters.join(" AND ");
  }

  return {
    sql,
    fieldAliases,
    replacements,
    subqueryAlias: "tempTaskInterval",
    modelName,
    filtered,
  };
}

//Generated by GetAllGetmodelsqlLeftModelChildNext13
//Generated by GetGetmodelsqlLeftModelChildNext13 - GetGetmodelsqlLeftModelChildNext13
function getSubTaskSQL(
  query: Partial<TaskSearchParams>,
  dontFilter: boolean = false
) {
  const table = "taskmanager_subtask";
  const fields: (string | [string, string])[] =
    //Generated by GenerateSQLFieldList
    [
      "id",
      "description",
      "priority",
      ["finish_date_time", "finishDateTime"],
      ["task_id", "taskID"],
    ];
  const fieldAliases: string[] = [];
  const modelName = "SubTask";
  let filtered = false;
  let replacements: Record<string, string> = {};

  let sql = new clsSQL();
  sql.source = table;

  //build the sql field name and aliases (aliases are used to destructure the object)
  processFields(fields, modelName, table, fieldAliases, sql);

  const filters: string[] = [];

  //Generated by GenerateSeqModelFilters

  /*INSERT JOINS HERE*/

  if (filters.length > 0) {
    filtered = true;
    sql.filter = filters.join(" AND ");
  }

  return {
    sql,
    fieldAliases,
    replacements,
    subqueryAlias: "tempSubTask",
    modelName,
    filtered,
  };
}
//Generated by GetGetmodelsqlLeftModelChildNext13 - GetGetmodelsqlLeftModelChildNext13
function getTaskTagSQL(
  query: Partial<TaskSearchParams>,
  dontFilter: boolean = false
) {
  const table = "taskmanager_task_tags";
  const fields: (string | [string, string])[] =
    //Generated by GenerateSQLFieldList
    ["id", ["task_id", "taskID"], ["tag_id", "tagID"]];
  const fieldAliases: string[] = [];
  const modelName = "TaskTag";
  let filtered = false;
  let replacements: Record<string, string> = {};

  let sql = new clsSQL();
  sql.source = table;

  //build the sql field name and aliases (aliases are used to destructure the object)
  processFields(fields, modelName, table, fieldAliases, sql);

  const filters: string[] = [];

  //Generated by GenerateSeqModelFilters

  /*INSERT JOINS HERE*/

  if (filters.length > 0) {
    filtered = true;
    sql.filter = filters.join(" AND ");
  }

  return {
    sql,
    fieldAliases,
    replacements,
    subqueryAlias: "tempTaskTag",
    modelName,
    filtered,
  };
}
//Generated by GetGetmodelsqlLeftModelChildNext13 - GetGetmodelsqlLeftModelChildNext13
function getTaskNoteSQL(
  query: Partial<TaskSearchParams>,
  dontFilter: boolean = false
) {
  const table = "taskmanager_note";
  const fields: (string | [string, string])[] =
    //Generated by GenerateSQLFieldList
    ["id", "note", ["task_id", "taskID"], "file"];
  const fieldAliases: string[] = [];
  const modelName = "TaskNote";
  let filtered = false;
  let replacements: Record<string, string> = {};

  let sql = new clsSQL();
  sql.source = table;

  //build the sql field name and aliases (aliases are used to destructure the object)
  processFields(fields, modelName, table, fieldAliases, sql);

  const filters: string[] = [];

  //Generated by GenerateSeqModelFilters

  /*INSERT JOINS HERE*/

  if (filters.length > 0) {
    filtered = true;
    sql.filter = filters.join(" AND ");
  }

  return {
    sql,
    fieldAliases,
    replacements,
    subqueryAlias: "tempTaskNote",
    modelName,
    filtered,
  };
}

//Generated by GetSqlModelsGetRoute - GET Models route
export const GET = async (req: Request) => {
  const searchParams = new URL(req.url).searchParams;
  const query = parseParams(searchParams) as Partial<TaskSearchParams>;

  const taskAttributes = getMappedKeys(COLUMNS);

  const fetchCount = query["fetchCount"] === "true";
  const sort = getSortedValue(
    query["sort"]
      ? `${query["sort"].includes("-") ? "-" : ""}${getDatabaseFieldName(
          query["sort"],
          COLUMNS
        )}`
      : undefined,
    taskAttributes,
    DEFAULT_SORT_BY
  );

  //Remove the - from the sort parameter
  const sortField = sort.includes("-") ? sort.substring(1) : sort;
  const cursorField = getColumnKeyByDbName(sortField, COLUMNS);

  let { sqlString, countSQL, replacements } = getTaskSQL(query);

  let recordCount;
  if (fetchCount) {
    const countResult: any = await sequelize.query(countSQL, {
      replacements,
      type: QueryTypes.SELECT,
    });

    recordCount = countResult[0].count;
  }

  let data: TaskModel[] = await sequelize.query(sqlString, {
    replacements,
    type: QueryTypes.SELECT,
    nest: true,
  });

  let cursor = "";

  if (data && data.length > 0) {
    cursor = getCursorString(cursorField, PRIMARY_KEY, data);
  }

  //Add any object that will be turned into an array
  //e.g. const result = reduceResult(result as any, [["CardCardKeyword", "CardCardKeywords"],]);

  //Remove duplicating CardUnityCards
  //removeDuplicates(result as any, "CardUnityCards", "id");

  //Generated by GetAllLeftModelReduceResultAndRemoveDuplicates
  //Generated by GetLeftModelReduceResultAndRemoveDuplicates - GetLeftModelReduceResultAndRemoveDuplicates
  data = reduceResult(data as any, [
    ["SubTask", "SubTasks"],
  ]) as unknown as TaskModel[];

  removeDuplicates(data as any, "SubTasks", "id");
  //Generated by GetLeftModelReduceResultAndRemoveDuplicates - GetLeftModelReduceResultAndRemoveDuplicates
  data = reduceResult(data as any, [
    ["TaskTag", "TaskTags"],
  ]) as unknown as TaskModel[];

  removeDuplicates(data as any, "TaskTags", "id");
  //Generated by GetLeftModelReduceResultAndRemoveDuplicates - GetLeftModelReduceResultAndRemoveDuplicates
  data = reduceResult(data as any, [
    ["TaskNote", "TaskNotes"],
  ]) as unknown as TaskModel[];

  removeDuplicates(data as any, "TaskNotes", "id");

  return NextResponse.json({
    rows: data,
    cursor,
    ...(fetchCount && { count: recordCount }),
  });
};

//Generated by GetSingleCreateModelPOSTRoute - GetSingleCreateModelPOSTRoute
export const POST = async (req: Request) => {
  const res = (await req.json()) as TaskFormUpdatePayload;

  try {
    await TaskSchema.validate(res);
  } catch (error) {
    return handleSequelizeError(error);
  }

  //Generated by GetAllRelatedPluralizedModelName
  const { SubTasks, TaskNotes } = res;
  const t = await sequelize.transaction();

  try {
    const newTask = await createTask(res, t);
    const id = newTask[PRIMARY_KEY];

    //Generated by GetAllSimpleModelInserts
    //Generated by GetSimpleModelInserts - GetSimpleModelInserts
    const { newTags } = res;
    const TaskTags = [];

    for (const item of newTags) {
      const newTaskTag = await createTaskTag(
        {
          taskID: newTask.id,
          tagID: item,
        },
        t
      );

      TaskTags.push({
        tagID: item,
        id: newTaskTag.id,
      });
    }
    //Generated by GetAllRelatedModelUpdateOrInsert
    //Generated by GetRelatedModelUpdateOrInsert - GetRelatedModelUpdateOrInsert
    const createdSubTasks: { index: number; id: number }[] = [];
    if (SubTasks) {
      for (const item of SubTasks) {
        item.taskID = id;
        await SubTaskSchema.validate(item);

        if (item.id === "") {
          const subTask = await createSubTask(item, t);

          createdSubTasks.push({
            index: item.index,
            id: subTask[SUBTASK_PRIMARY_KEY],
          });
        } else {
          await updateSubTask(item, SUBTASK_PRIMARY_KEY, t);
        }
      }
    }
    //Generated by GetRelatedModelUpdateOrInsert - GetRelatedModelUpdateOrInsert
    const createdTaskNotes: { index: number; id: number }[] = [];
    if (TaskNotes) {
      for (const item of TaskNotes) {
        item.taskID = id;
        await TaskNoteSchema.validate(item);

        if (item.id === "") {
          const taskNote = await createTaskNote(item, t);

          createdTaskNotes.push({
            index: item.index,
            id: taskNote[TASKNOTE_PRIMARY_KEY],
          });
        } else {
          await updateTaskNote(item, TASKNOTE_PRIMARY_KEY, t);
        }
      }
    }

    await t.commit();

    return NextResponse.json({
      status: "success",
      id,

      //Generated by GetAllSimplePluralizedModelName
      TaskTags, //Generated by GetSimplePluralizedModelName - GetSimplePluralizedModelName
      //Generated by GetAllRelatedModelKeyValue
      SubTasks: createdSubTasks, //Generated by GetRelatedModelKeyValue - GetRelatedModelKeyValue
      TaskTags: createdTaskTags, //Generated by GetRelatedModelKeyValue - GetRelatedModelKeyValue
      TaskNotes: createdTaskNotes, //Generated by GetRelatedModelKeyValue - GetRelatedModelKeyValue
    });
  } catch (err) {
    await t.rollback();
    return handleSequelizeError(err);
  }
};

export const DELETE = async (req: Request) => {
  const body = (await req.json()) as TaskDeletePayload;
  const { deletedTasks } = body;

  if (deletedTasks.length > 0) {
    const t = await sequelize.transaction();
    try {
      await deleteTasks(PRIMARY_KEY, deletedTasks, t);
      t.commit();
      return NextResponse.json("success");
    } catch (error) {
      t.rollback();
      return handleSequelizeError(error);
    }
  }
};
