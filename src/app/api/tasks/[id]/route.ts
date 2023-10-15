import { QueryTypes } from "sequelize";
import sequelize from "@/config/db";
import handleSequelizeError from "@/utils/errorHandling";
import { reduceResult, returnJSONResponse } from "@/utils/utils";
import { NextResponse } from "next/server";
import {
  createNewRecordsForModelAndSimpleRelationships,
  getLeftConfigNamesFromRightModelId,
  getMainModelSQL,
  removeDuplicatesFromRightModelRelationships,
  updateOrCreateRelatedRecords,
} from "@/utils/api/utils";
import { TaskConfig } from "@/utils/config/TaskConfig";
import { ModelSchema } from "@/schema/ModelSchema";
import { updateModel, deleteModels } from "@/utils/api/ModelLibs";

const modelConfig = TaskConfig;

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  let { sqlString, replacements } = getMainModelSQL({}, true, modelConfig, {
    primaryKeyValue: id,
  });

  let data = await sequelize.query(sqlString, {
    replacements,
    type: QueryTypes.SELECT,
    nest: true,
  });

  data = reduceResult(
    //@ts-ignore
    data,
    getLeftConfigNamesFromRightModelId(modelConfig)
  );

  //@ts-ignore
  removeDuplicatesFromRightModelRelationships(data, modelConfig);

  return NextResponse.json(data[0]);
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const res = await req.json();
  const id = params.id;

  try {
    await ModelSchema(modelConfig).validate(res);
  } catch (error: any) {
    return returnJSONResponse({
      status: "error",
      errorCode: 401,
      error: error.message,
    });
  }

  const t = await sequelize.transaction();

  try {
    await updateModel(modelConfig, res, id, t);

    const newRecords: Record<string, unknown> = {};

    updateOrCreateRelatedRecords(modelConfig, res, id, t, newRecords);

    createNewRecordsForModelAndSimpleRelationships(
      modelConfig,
      id,
      res,
      t,
      newRecords
    );

    t.commit();
    return NextResponse.json({
      status: "success",
      ...newRecords,
    });
  } catch (err) {
    t.rollback();
    return handleSequelizeError(err);
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  const t = await sequelize.transaction();
  try {
    deleteModels(modelConfig, [id], t);
    t.commit();

    return NextResponse.json({ status: "success" });
  } catch (err) {
    t.rollback();
    return handleSequelizeError(err);
  }
};
