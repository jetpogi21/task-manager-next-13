//Generated by WriteToModellibs_ts - ModelLibs.ts
import { TaskTemplateFormikShape } from "@/interfaces/TaskTemplateInterfaces";
import { TaskTemplate } from "@/models/TaskTemplateModel";
import { PRIMARY_KEY } from "@/utils/constants/TaskIntervalConstants";
import { Op } from "sequelize";
import { Transaction } from "sequelize";

interface ITaskTemplate
  extends Omit<
    TaskTemplateFormikShape,
    | "touched"
    | "index"
    //Generated by GetAllOptionalFields
    //Generated by GetOptionalField - GetOptionalField
    | "isSuspended"
  > {
  //Generated by GetAllOptionFieldTypes
  isSuspended?: boolean; //Generated by GetModelFieldType
}

//Reusable functions
export const createTaskTemplate = async (
  taskTemplate: Omit<ITaskTemplate, typeof PRIMARY_KEY>,
  t: Transaction
) => {
  return await TaskTemplate.create(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
      description: taskTemplate.description!,
      isSuspended: taskTemplate.isSuspended!,
      taskCategoryID: parseInt(taskTemplate.taskCategoryID as string),
      taskIntervalID: parseInt(taskTemplate.taskIntervalID as string),
    },
    { transaction: t }
  );
};

export const updateTaskTemplate = async (
  taskTemplate: ITaskTemplate,
  primaryKey: keyof ITaskTemplate,
  t: Transaction,
  primaryKeyValue?: string | number
) => {
  await TaskTemplate.update(
    {
      //Generated by GetAllFieldsToUpdateBySeqModel
      description: taskTemplate.description!,
      isSuspended: taskTemplate.isSuspended!,
      taskCategoryID: parseInt(taskTemplate.taskCategoryID as string),
      taskIntervalID: parseInt(taskTemplate.taskIntervalID as string),
    },
    {
      where: { [primaryKey]: primaryKeyValue || taskTemplate[primaryKey] },
      transaction: t,
      individualHooks: true,
    }
  );
};

export const deleteTaskTemplates = async (
  primaryKey: keyof Omit<TaskTemplateFormikShape, "touched">,
  deletedIds: string[] | number[],
  t: Transaction
) => {
  await TaskTemplate.destroy({
    where: { [primaryKey]: { [Op.in]: deletedIds } },
    transaction: t,
  });
};
