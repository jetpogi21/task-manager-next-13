//Generated by WriteToModelinterface_ts - ModelInterface.ts Next 13
//Generated by GetAllRelatedInterfaceImportBySeqModel
//Generated by GetRelatedInterfaceImport - RelatedInterfaceImport
import {
  SubTaskFormikInitialValues,
  SubTaskFormikShape,
  SubTaskModel,
  SubTaskUpdatePayload,
} from "@/interfaces/SubTaskInterfaces";
//Generated by GetRelatedInterfaceImport - RelatedInterfaceImport
import {
  TaskTagFormikInitialValues,
  TaskTagFormikShape,
  TaskTagModel,
  TaskTagUpdatePayload,
} from "@/interfaces/TaskTagInterfaces";
//Generated by GetRelatedInterfaceImport - RelatedInterfaceImport
import {
  TaskNoteFormikInitialValues,
  TaskNoteFormikShape,
  TaskNoteModel,
  TaskNoteUpdatePayload,
} from "@/interfaces/TaskNoteInterfaces";
//Generated by GetAllRelatedRightModelImport
import { TaskCategoryModel } from "@/interfaces/TaskCategoryInterfaces"; //Generated by GetRelatedRightModelImport - GetRelatedRightModelImport
import { TaskIntervalModel } from "@/interfaces/TaskIntervalInterfaces"; //Generated by GetRelatedRightModelImport - GetRelatedRightModelImport
import { TaskTemplateModel } from "@/interfaces/TaskTemplateInterfaces"; //Generated by GetRelatedRightModelImport - GetRelatedRightModelImport
import { ListQuery } from "./interface";

export interface TaskModel {
  //Generated by GetAllModelFieldTypeBySeqModel
  taskCategoryID: number | string; //Generated by GetModelFieldType
  taskIntervalID: number | string; //Generated by GetModelFieldType
  id: number | string; //Generated by GetModelFieldType
  description: string; //Generated by GetModelFieldType
  taskTemplateID: number | string | null; //Generated by GetModelFieldType
  date: string; //Generated by GetModelFieldType
  targetDate: string; //Generated by GetModelFieldType
  finishDateTime: string | null; //Generated by GetModelFieldType
  isFinished: boolean; //Generated by GetModelFieldType
  subTaskImported: boolean; //Generated by GetModelFieldType
  //Generated by GetAllChildModelInterfaceBySeqModel
  SubTasks: SubTaskModel[]; //Generated by GetChildModelInterface - ChildModelInterface
  TaskTags: TaskTagModel[]; //Generated by GetChildModelInterface - ChildModelInterface
  TaskNotes: TaskNoteModel[]; //Generated by GetChildModelInterface - ChildModelInterface

  //Generated by GetAllRelatedRightModelInterface
  TaskCategory: TaskCategoryModel; //Generated by GetRelatedRightModelInterface - GetRelatedRightModelInterface
  TaskInterval: TaskIntervalModel; //Generated by GetRelatedRightModelInterface - GetRelatedRightModelInterface
  TaskTemplate: TaskTemplateModel; //Generated by GetRelatedRightModelInterface - GetRelatedRightModelInterface
}

//The keys after the updatedAt is generated by GetAllRelatedModelNameBySeqModel - RelatedModelName
export interface TaskFormikShape
  extends Omit<
    TaskModel,
    | "slug"
    | "createdAt"
    | "updatedAt"
    | "SubTasks" //Generated by GetRelatedPluralizedModelName - RelatedPluralizedModelName
    | "TaskTags" //Generated by GetRelatedPluralizedModelName - RelatedPluralizedModelName
    | "TaskNotes" //Generated by GetRelatedPluralizedModelName - RelatedPluralizedModelName
    | "TaskCategory" //Generated by GetRelatedRightModelName - GetRelatedRightModelName
    | "TaskInterval" //Generated by GetRelatedRightModelName - GetRelatedRightModelName
    | "TaskTemplate" //Generated by GetRelatedRightModelName - GetRelatedRightModelName
  > {
  touched: boolean;
  index: number;
}

//Use for continuos list form
export interface TaskFormikInitialValues {
  Tasks: TaskFormikShape[];
}

//The FormikInitialValues is generated by GetAllRelatedFormikInitialValues - ModelFormikInitialValue
export interface TaskFormFormikInitialValues
  extends Omit<TaskFormikShape, "touched" | "index">,
    SubTaskFormikInitialValues,
    TaskNoteFormikInitialValues {
  //Generated by GetAllSimpleRelatedKey
  //Generated by GetSimpleRelatedKey - GetSimpleRelatedKey
  TaskTags: string[] | number[];
}

//The extends portion is generated by GetModelUpdatePayloadExtension - GetRelatedPartialPayload
export interface TaskUpdatePayload
  extends Partial<SubTaskUpdatePayload>,
    Partial<TaskNoteUpdatePayload> {
  Tasks: Omit<TaskFormikShape, "touched">[];
}

export interface TaskDeletePayload {
  deletedTasks: string[] | number[];
}

export interface TaskSelectedPayload {
  selectedTasks: string[] | number[];
}

export interface FinishTasksPayload extends TaskSelectedPayload {
  finishDateTime: string;
}

//Use for single form (with children)
//The Related Models will be replaced by the Payload version
export interface TaskFormUpdatePayload
  extends Omit<
      TaskFormikShape,
      | "touched"
      | "index" //Generated by GetAllSimplePluralizedFieldName
      | "TaskTags" //Generated by GetSimplePluralizedFieldName - GetSimplePluralizedFieldName
    >, //Generated by GetModelUpdatePayload - ModelUpdatePayload
    //Generated by GetAllRelatedModelUpdatePayload
    SubTaskUpdatePayload,
    //Generated by GetModelUpdatePayload - ModelUpdatePayload
    TaskNoteUpdatePayload {
  //Generated by GetAllSimpleRelatedKeyPayload
  //Generated by GetSimpleRelatedKeyPayload - GetSimpleRelatedKeyPayload
  deletedTaskTags: string[];
  newTags: string[];
}

export interface TaskFormikFilter {
  //Generated by GetAllFilterInterfaceBySeqmodel
  q: string;
  status: "finished" | "unfinished" | ""; //Generated by GetThisFilterInterface
  taskCategory: string; //Generated by GetThisFilterInterface
  taskInterval: string; //Generated by GetThisFilterInterface
  hasFile: boolean; //Generated by GetThisFilterInterface
}

export interface TaskSearchParams
  extends ListQuery,
    Omit<
      TaskFormikFilter, //Generated by GetAllNonStringFilterNames
      "hasFile"
    > {
  //Generated by GetAllNonStringFilterTypes
  hasFile: string; //Generated by GetThisFilterInterface
}

export interface GetTasksResponse {
  count: number;
  rows: TaskModel[];
  cursor: string;
}
