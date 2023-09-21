//Generated by WriteToModelsRouteApi - models route next 13 with SQL
import TaskTemplateModel, { TaskTemplate } from "@/models/TaskTemplateModel";
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
  TaskTemplateDeletePayload,
  TaskTemplateFormUpdatePayload,
  TaskTemplateFormikShape,
  TaskTemplateSearchParams,
  TaskTemplateUpdatePayload,
} from "@/interfaces/TaskTemplateInterfaces";
import { NextResponse } from "next/server";
import { DEFAULT_LIMIT } from "@/utils/constants";
import {
  COLUMNS,
  DEFAULT_SORT_BY,
  PRIMARY_KEY,
  TABLE_NAME,
  UNIQUE_FIELDS,
} from "@/utils/constants/TaskTemplateConstants";
import { TaskTemplateSchema } from "@/schema/TaskTemplateSchema";
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

//Generated by GetAllRelatedLeftModelImportRoute
//Generated by GetRelatedLeftModelImportRoute - GetRelatedLeftModelImportRoute
import {
  createSubTaskTemplate,
  updateSubTaskTemplate,
} from "@/utils/api/SubTaskTemplateLibs";
import { SubTaskTemplateSchema } from "@/schema/SubTaskTemplateSchema";
import { PRIMARY_KEY as SUBTASKTEMPLATE_PRIMARY_KEY } from "@/utils/constants/SubTaskTemplateConstants";
//Generated by GetRelatedLeftModelImportRoute - GetRelatedLeftModelImportRoute
import { createTask, updateTask } from "@/utils/api/TaskLibs";
import { TaskSchema } from "@/schema/TaskSchema";
import { PRIMARY_KEY as TASK_PRIMARY_KEY } from "@/utils/constants/TaskConstants";
import {
  createTaskTemplate,
  deleteTaskTemplates,
  updateTaskTemplate,
} from "@/utils/api/TaskTemplateLibs";

const ModelObject = TaskTemplate;

//Generated by GeneratefindOptions
const findOptions: FindOptions<typeof TaskTemplate> = {
  //Generated by GenerateIncludeOption
  include: [],
  //Generated by GenerateAttributesOption
  attributes: [
    //Generated by GetAllModelAttributesBySeqModel
    "id",
    "description",
    "isSuspended",
    "taskCategoryID",
    "taskIntervalID",
  ],
};

//Generated by GetGetmodelsqlNext13 - getModelSQL Next 13
function getTaskTemplateSQL(
  query: Partial<TaskTemplateSearchParams>,
  dontFilter: boolean = false
) {
  const taskTemplateAttributes = getMappedKeys(COLUMNS);

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
    taskTemplateAttributes,
    DEFAULT_SORT_BY
  );

  //Remove the - from the sort parameter
  const sortField = sort.includes("-") ? sort.substring(1) : sort;

  //Declare the variables
  const table = TABLE_NAME;
  const fields: ([string, string] | string)[] =
    //Generated by GenerateSQLFieldList
    [
      "id",
      "description",
      ["is_suspended", "isSuspended"],
      ["task_category_id", "taskCategoryID"],
      ["task_interval_id", "taskIntervalID"],
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
      replacements["q"] = `%${q}%`;
      filters.push(
        `(${fields.map((field) => `(${table}.${field} LIKE :q)`).join(" OR ")})`
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
    sql: subTaskTemplate_SQL,
    fieldAliases: subTaskTemplate_fieldAliases,
    replacements: subTaskTemplate_replacements,
    subqueryAlias: subTaskTemplate_subqueryAlias,
    modelName: subTaskTemplate_modelName,
    filtered: subTaskTemplate_filtered,
  } = getSubTaskTemplateSQL(query, dontFilter);

  replacements = { ...replacements, ...subTaskTemplate_replacements };

  subTaskTemplate_fieldAliases.forEach((field) => {
    joinFields.push(`${subTaskTemplate_subqueryAlias}.${field}`);
  });

  const subTaskTemplateJoin = new clsJoin(
    subTaskTemplate_SQL.sql(),
    "id",
    `\`${subTaskTemplate_modelName}.taskTemplateID\``, //`subTaskTemplate.id`
    subTaskTemplate_subqueryAlias, //tempSubTaskTemplates
    "INNER"
  );

  if (subTaskTemplate_filtered) {
    sql.joins.push(subTaskTemplateJoin);
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
  taskCategory_SQL = getTaskCategorySQL(query, true).sql;
  taskCategoryJoin.source = taskCategory_SQL.sql();
  taskCategoryJoin.joinType = "LEFT";
  //Generated by GetRightModelJoinCancellationSnippet - GetRightModelJoinCancellationSnippet
  taskInterval_SQL = getTaskIntervalSQL(query, true).sql;
  taskIntervalJoin.source = taskInterval_SQL.sql();
  taskIntervalJoin.joinType = "LEFT";
  //Generated by GetAllLeftModelJoinCancellationSnippet
  //Generated by GetLeftModelJoinCancellationSnippet - GetLeftModelJoinCancellationSnippet
  subTaskTemplate_SQL = getSubTaskTemplateSQL(query, true).sql;
  subTaskTemplateJoin.source = subTaskTemplate_SQL.sql();
  subTaskTemplateJoin.joinType = "LEFT";

  //Insert joins here LEFT joins e.g. cardCardKeywordJoin, distincJoin or
  //new clsJoin("marvelduel_belongsto", "deck_id", "id", null)
  sql.joins = [
    distinctJoin,
    //Generated by GetAllRightJoinName
    taskCategoryJoin, //Generated by GetRightJoinName - GetRightJoinName
    taskIntervalJoin, //Generated by GetRightJoinName - GetRightJoinName
    //Generated by GetAllLeftJoinName
    subTaskTemplateJoin, //Generated by GetLeftJoinName - GetLeftJoinName
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
function getTaskCategorySQL(
  query: Partial<TaskTemplateSearchParams>,
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
  query: Partial<TaskTemplateSearchParams>,
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
function getSubTaskTemplateSQL(
  query: Partial<TaskTemplateSearchParams>,
  dontFilter: boolean = false
) {
  const table = "taskmanager_subtasktemplate";
  const fields: (string | [string, string])[] =
    //Generated by GenerateSQLFieldList
    ["id", "description", "priority", ["task_template_id", "taskTemplateID"]];
  const fieldAliases: string[] = [];
  const modelName = "SubTaskTemplate";
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
    subqueryAlias: "tempSubTaskTemplate",
    modelName,
    filtered,
  };
}
//Generated by GetGetmodelsqlLeftModelChildNext13 - GetGetmodelsqlLeftModelChildNext13
function getTaskSQL(
  query: Partial<TaskTemplateSearchParams>,
  dontFilter: boolean = false
) {
  const table = "taskmanager_task";
  const fields: (string | [string, string])[] =
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
      ["sub_task_imported", "subTaskImported"],
    ];
  const fieldAliases: string[] = [];
  const modelName = "Task";
  let filtered = false;
  let replacements: Record<string, string> = {};

  let sql = new clsSQL();
  sql.source = table;

  //build the sql field name and aliases (aliases are used to destructure the object)
  processFields(fields, modelName, table, fieldAliases, sql);

  const filters: string[] = [];

  //Generated by GenerateSeqModelFilters
  //Generated by GetLikeFilters - LIKE Template
  const q = query.q as string;

  if (q && !dontFilter) {
    const fields: string[] = ["description"];
    replacements["q"] = `%${q}%`;
    filters.push(
      `(${fields.map((field) => `(${table}.${field} LIKE :q)`).join(" OR ")})`
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

  /*INSERT JOINS HERE*/

  if (filters.length > 0) {
    filtered = true;
    sql.filter = filters.join(" AND ");
  }

  return {
    sql,
    fieldAliases,
    replacements,
    subqueryAlias: "tempTask",
    modelName,
    filtered,
  };
}

//Generated by GetSqlModelsGetRoute - GET Models route
export const GET = async (req: Request) => {
  const searchParams = new URL(req.url).searchParams;
  const query = parseParams(searchParams) as Partial<TaskTemplateSearchParams>;

  const taskTemplateAttributes = getMappedKeys(COLUMNS);

  const fetchCount = query["fetchCount"] === "true";
  const sort = getSortedValue(
    query["sort"]
      ? `${query["sort"].includes("-") ? "-" : ""}${getDatabaseFieldName(
          query["sort"],
          COLUMNS
        )}`
      : undefined,
    taskTemplateAttributes,
    DEFAULT_SORT_BY
  );

  //Remove the - from the sort parameter
  const sortField = sort.includes("-") ? sort.substring(1) : sort;
  const cursorField = getColumnKeyByDbName(sortField, COLUMNS);

  let { sqlString, countSQL, replacements } = getTaskTemplateSQL(query);

  let recordCount;
  if (fetchCount) {
    const countResult: any = await sequelize.query(countSQL, {
      replacements,
      type: QueryTypes.SELECT,
    });

    recordCount = countResult[0].count;
  }

  let data: TaskTemplateModel[] = await sequelize.query(sqlString, {
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
  data = reduceResult(data as any, [
    //Generated by GetAllLeftModelsToReduce
    ["SubTaskTemplate", "SubTaskTemplates"], //Generated by GetLeftModelToReduce - GetLeftModelToReduce
  ]) as unknown as TaskTemplateModel[];

  //Generated by GetAllLeftModelReduceResultAndRemoveDuplicates
  //Generated by GetLeftModelReduceResultAndRemoveDuplicates - GetLeftModelReduceResultAndRemoveDuplicates
  removeDuplicates(data as any, "SubTaskTemplates", "id");

  return NextResponse.json({
    rows: data,
    cursor,
    ...(fetchCount && { count: recordCount }),
  });
};

//Generated by GetSingleCreateModelPOSTRoute - GetSingleCreateModelPOSTRoute
export const POST = async (req: Request) => {
  const res = (await req.json()) as TaskTemplateFormUpdatePayload;

  try {
    await TaskTemplateSchema.validate(res);
  } catch (error) {
    return handleSequelizeError(error);
  }

  //Generated by GetAllRelatedPluralizedModelName
  const { SubTaskTemplates } = res;
  const t = await sequelize.transaction();

  try {
    const newTaskTemplate = await createTaskTemplate(res, t);
    const id = newTaskTemplate[PRIMARY_KEY];

    //Generated by GetAllRelatedModelUpdateOrInsert
    //Generated by GetRelatedModelUpdateOrInsert - GetRelatedModelUpdateOrInsert
    const createdSubTaskTemplates: { index: number; id: number }[] = [];
    if (SubTaskTemplates) {
      for (const item of SubTaskTemplates) {
        item.taskTemplateID = id;
        await SubTaskTemplateSchema.validate(item);

        if (item[SUBTASKTEMPLATE_PRIMARY_KEY] === "") {
          const subTaskTemplate = await createSubTaskTemplate(item, t);

          createdSubTaskTemplates.push({
            index: item.index,
            id: subTaskTemplate[SUBTASKTEMPLATE_PRIMARY_KEY],
          });
        } else {
          await updateSubTaskTemplate(item, SUBTASKTEMPLATE_PRIMARY_KEY, t);
        }
      }
    }

    await t.commit();

    return NextResponse.json({
      status: "success",
      id,

      //Generated by GetAllRelatedModelKeyValue
      SubTaskTemplates: createdSubTaskTemplates, //Generated by GetRelatedModelKeyValue - GetRelatedModelKeyValue
    });
  } catch (err) {
    await t.rollback();
    return handleSequelizeError(err);
  }
};

export const DELETE = async (req: Request) => {
  const body = (await req.json()) as TaskTemplateDeletePayload;
  const { deletedTaskTemplates } = body;

  if (deletedTaskTemplates.length > 0) {
    const t = await sequelize.transaction();
    try {
      await deleteTaskTemplates(PRIMARY_KEY, deletedTaskTemplates, t);
      t.commit();
      return NextResponse.json("success");
    } catch (error) {
      t.rollback();
      return handleSequelizeError(error);
    }
  }
};
