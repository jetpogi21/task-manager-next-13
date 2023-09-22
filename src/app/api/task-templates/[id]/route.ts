//Generated by Generate_getModelAPIRouteNext13 - getModel API Route Next 13
import { TaskTemplate } from "@/models/TaskTemplateModel";
import { FindOptions, Sequelize } from "sequelize";
import { cloneDeep } from "lodash";
import { genericDelete, genericGetOne } from "@/utils/generic";
import { TaskTemplateFormUpdatePayload } from "@/interfaces/TaskTemplateInterfaces";
import { TaskTemplateSchema } from "@/schema/TaskTemplateSchema";
import sequelize from "@/config/db";
import handleSequelizeError from "@/utils/errorHandling";
import { returnJSONResponse, validateRequiredFields } from "@/utils/utils";
import { Op } from "sequelize";
import { updateTaskTemplate } from "@/utils/api/TaskTemplateLibs";
import { NextResponse } from "next/server";
import { PRIMARY_KEY } from "@/utils/constants/TaskTemplateConstants";
//Generated by GetAllAPIRelatedLeftModelImportBySeqModel
//Generated by GetAPIRelatedLeftModelImport - GetAPIRelatedLeftModelImport
import { SubTaskTemplate } from "@/models/SubTaskTemplateModel";
import { SubTaskTemplateModel } from "@/interfaces/SubTaskTemplateInterfaces";
import { SubTaskTemplateSchema } from "@/schema/SubTaskTemplateSchema";
import { PRIMARY_KEY as SUBTASKTEMPLATE_PRIMARY_KEY } from "@/utils/constants/SubTaskTemplateConstants";
import {
  createSubTaskTemplate,
  deleteSubTaskTemplates,
  updateSubTaskTemplate,
} from "@/utils/api/SubTaskTemplateLibs";
//Generated by GetAllAPIRelatedRightModelImportBySeqModel
//Generated by GetAPIRelatedRightModelImport - GetAPIRelatedRightModelImport
import { TaskCategory } from "@/models/TaskCategoryModel";
//Generated by GetAPIRelatedRightModelImport - GetAPIRelatedRightModelImport
import { TaskInterval } from "@/models/TaskIntervalModel";

const ModelObject = TaskTemplate;

//Generated by GeneratefindOptions
const findOptions: FindOptions<typeof TaskTemplate> = {
  //Generated by GenerateIncludeOption

  include: [
    {
      model: SubTaskTemplate,
      //Generated by GenerateAttributesOption

      attributes: ["id", "description", "priority", "taskTemplateID"],
    },
    {
      model: TaskCategory,
      //Generated by GenerateAttributesOption

      attributes: ["id", "name"],
    },
    {
      model: TaskInterval,
      //Generated by GenerateAttributesOption

      attributes: ["id", "name"],
    },
  ],
  //Generated by GenerateAttributesOption

  attributes: [
    "id",
    "description",
    "isSuspended",
    "taskCategoryID",
    "taskIntervalID",
  ],
};

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  //Generated by Generate_findOptionsCopy
  const findOptionsCopy: FindOptions<typeof TaskTemplate> =
    cloneDeep(findOptions);

  const id = params.id;
  return genericGetOne(ModelObject, findOptionsCopy, id);
};

//Generated by GetUpdateFunctionWithRelationshipNext13 - Update With Relationship Next 13
export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const res = (await req.json()) as TaskTemplateFormUpdatePayload;
  const id = params.id;

  try {
    await TaskTemplateSchema.validate(res);
  } catch (error: any) {
    return returnJSONResponse({
      status: "error",
      errorCode: 401,
      error: error.message,
    });
  }

  //Generated by GetAllRelatedPluralizedModelName
  const { SubTaskTemplates } = res;

  const t = await sequelize.transaction();

  try {
    await updateTaskTemplate(res, PRIMARY_KEY, t, id);

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

    t.commit();
    return NextResponse.json({
      status: "success",
      //Generated by GetAllRelatedModelKeyValue
      SubTaskTemplates: createdSubTaskTemplates, //Generated by GetRelatedModelKeyValue - GetRelatedModelKeyValue
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
  return genericDelete(ModelObject, id);
};
