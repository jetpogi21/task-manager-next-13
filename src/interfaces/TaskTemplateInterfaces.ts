//Generated by WriteToModelinterface_ts - ModelInterface.ts Next 13
//Generated by GetAllRelatedInterfaceImportBySeqModel
//Generated by GetRelatedInterfaceImport - RelatedInterfaceImport
import { SubTaskTemplateFormikInitialValues, SubTaskTemplateFormikShape,SubTaskTemplateModel,SubTaskTemplateUpdatePayload } from "@/interfaces/SubTaskTemplateInterfaces";
//Generated by GetRelatedInterfaceImport - RelatedInterfaceImport
import { TaskFormikInitialValues, TaskFormikShape,TaskModel,TaskUpdatePayload } from "@/interfaces/TaskInterfaces";
//Generated by GetAllRelatedRightModelImport
import { TaskCategoryModel } from "@/interfaces/TaskCategoryInterfaces";//Generated by GetRelatedRightModelImport - GetRelatedRightModelImport
import { TaskIntervalModel } from "@/interfaces/TaskIntervalInterfaces";//Generated by GetRelatedRightModelImport - GetRelatedRightModelImport
import { ListQuery } from "./interface";

export interface TaskTemplateModel {
  //Generated by GetAllModelFieldTypeBySeqModel
id: number | string;//Generated by GetModelFieldType
description: string;//Generated by GetModelFieldType
isSuspended: boolean;//Generated by GetModelFieldType
taskCategoryID: number | string;//Generated by GetModelFieldType
taskIntervalID: number | string;//Generated by GetModelFieldType
  //Generated by GetAllChildModelInterfaceBySeqModel
SubTaskTemplates: SubTaskTemplateModel[];//Generated by GetChildModelInterface - ChildModelInterface
Tasks: TaskModel[];//Generated by GetChildModelInterface - ChildModelInterface
  
  //Generated by GetAllRelatedRightModelInterface
TaskCategory: TaskCategoryModel;//Generated by GetRelatedRightModelInterface - GetRelatedRightModelInterface
TaskInterval: TaskIntervalModel;//Generated by GetRelatedRightModelInterface - GetRelatedRightModelInterface
}

//The keys after the updatedAt is generated by GetAllRelatedModelNameBySeqModel - RelatedModelName
export interface TaskTemplateFormikShape extends Omit<TaskTemplateModel, "slug" | "createdAt" | "updatedAt" 
| "SubTaskTemplates"//Generated by GetRelatedPluralizedModelName - RelatedPluralizedModelName
| "Tasks"//Generated by GetRelatedPluralizedModelName - RelatedPluralizedModelName
| "TaskCategory"//Generated by GetRelatedRightModelName - GetRelatedRightModelName
| "TaskInterval"//Generated by GetRelatedRightModelName - GetRelatedRightModelName 
> {
  touched: boolean;
  index: number;
}

//Use for continuos list form
export interface TaskTemplateFormikInitialValues {
  TaskTemplates: TaskTemplateFormikShape[];
  
}

//The FormikInitialValues is generated by GetAllRelatedFormikInitialValues - ModelFormikInitialValue
export interface TaskTemplateFormFormikInitialValues
  extends Omit<TaskTemplateFormikShape, "touched" | "index"> ,SubTaskTemplateFormikInitialValues{
  
}

//The extends portion is generated by GetModelUpdatePayloadExtension - GetRelatedPartialPayload
export interface TaskTemplateUpdatePayload extends Partial<SubTaskTemplateUpdatePayload> {
  TaskTemplates: Omit<TaskTemplateFormikShape, "touched">[];
  
}

export interface TaskTemplateDeletePayload {
  deletedTaskTemplates: string[] | number[];
}

export interface TaskTemplateSelectedPayload {
  selectedTaskTemplates: string[] | number[];
}

//Use for single form (with children)
//The Related Models will be replaced by the Payload version
export interface TaskTemplateFormUpdatePayload
  extends Omit<TaskTemplateFormikShape, "touched" | "index" 
> 
//Generated by GetAllRelatedModelUpdatePayload
,//Generated by GetModelUpdatePayload - ModelUpdatePayload
SubTaskTemplateUpdatePayload 
{
  
}

export interface TaskTemplateFormikFilter {
  //Generated by GetAllFilterInterfaceBySeqmodel
q: string
taskCategory: string;//Generated by GetThisFilterInterface
taskInterval: string;//Generated by GetThisFilterInterface
}

export interface TaskTemplateSearchParams
  extends ListQuery,
    Omit<TaskTemplateFormikFilter, ""> {
  //Generated by GetAllNonStringFilterTypes

}

export interface GetTaskTemplatesResponse {
  count: number;
  rows: TaskTemplateModel[];
  cursor: string;
}
