//Generated by WriteToModelsRoutes_tsUsingModelconfig - models routes.ts using modelConfig
import { QueryTypes } from "sequelize";
import { parseParams, reduceResult } from "@/utils/utils";
import sequelize from "@/config/db";
import handleSequelizeError from "@/utils/errorHandling";
import {
  TaskTemplateDeletePayload,
  TaskTemplateSearchParams,
} from "@/interfaces/TaskTemplateInterfaces";
import { NextResponse } from "next/server";
import {
  createNewRecordsForModelAndSimpleRelationships,
  getCursorString,
  getLeftConfigNamesFromRightModelId,
  getMainModelSQL,
  getSortedValueSimplified,
  removeDuplicatesFromRightModelRelationships,
  updateOrCreateRelatedRecords,
} from "@/utils/api/utils";
import { TaskTemplateConfig } from "@/utils/config/TaskTemplateConfig";
import { findConfigItem, findModelPrimaryKeyField } from "@/utils/utilities";
import { createModel, deleteModels } from "@/utils/api/ModelLibs";
import { ModelSchema } from "@/schema/ModelSchema";

const modelConfig = TaskTemplateConfig;
const primaryKey = findModelPrimaryKeyField(modelConfig).databaseFieldName;

export const GET = async (req: Request) => {
  const searchParams = new URL(req.url).searchParams;
  const query = parseParams(searchParams) as Partial<TaskTemplateSearchParams>;

  const fetchCount = query["fetchCount"] === "true";
  const sort = getSortedValueSimplified(query["sort"], modelConfig);
  const sortField = sort.includes("-") ? sort.substring(1) : sort;

  const cursorField = findConfigItem(
    modelConfig.fields,
    "databaseFieldName",
    sortField,
    "fieldName"
  );

  let { sqlString, countSQL, replacements } = getMainModelSQL(
    query,
    false,
    modelConfig
  );

  let recordCount;
  if (fetchCount) {
    const countResult: any = await sequelize.query(countSQL, {
      replacements,
      type: QueryTypes.SELECT,
    });

    recordCount = countResult[0].count;
  }

  let data = await sequelize.query(sqlString, {
    replacements,
    type: QueryTypes.SELECT,
    nest: true,
  });

  let cursor = "";

  if (data && data.length > 0) {
    cursor = getCursorString(cursorField, primaryKey, data);
  }

  data = reduceResult(
    //@ts-ignore
    data,
    getLeftConfigNamesFromRightModelId(modelConfig)
  );

  //@ts-ignore
  removeDuplicatesFromRightModelRelationships(data, modelConfig);

  return NextResponse.json({
    rows: data,
    cursor,
    ...(fetchCount && { count: recordCount }),
  });
};

export const POST = async (req: Request) => {
  const res = await req.json();

  try {
    await ModelSchema(modelConfig).validate(res);
  } catch (error) {
    return handleSequelizeError(error);
  }

  const t = await sequelize.transaction();

  try {
    const newParentRecord = await createModel(modelConfig, res, t);
    const parentPrimaryKeyField = findModelPrimaryKeyField(modelConfig);
    const newParentID: number | string =
      //@ts-ignore
      newParentRecord[parentPrimaryKeyField.fieldName];

    const newRecords: Record<string, unknown> = {};

    await createNewRecordsForModelAndSimpleRelationships(
      modelConfig,
      newParentID,
      res,
      t,
      newRecords
    );

    await updateOrCreateRelatedRecords(
      modelConfig,
      res,
      newParentID,
      t,
      newRecords
    );

    await t.commit();

    return NextResponse.json({
      status: "success",
      [parentPrimaryKeyField.fieldName]: newParentID,
      ...newRecords,
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
      await deleteModels(modelConfig, deletedTaskTemplates, t);
      t.commit();
      return NextResponse.json("success");
    } catch (error) {
      t.rollback();
      return handleSequelizeError(error);
    }
  }
};
