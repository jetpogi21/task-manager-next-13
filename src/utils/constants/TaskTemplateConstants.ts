//Generated by WriteToModelconstants_ts - ModelConstants.ts
import { TaskTemplateFormikFilter } from "@/interfaces/TaskTemplateInterfaces";

export const MODEL_NAME = "TaskTemplate";
export const TABLE_NAME = "task_templates";
export const PLURALIZED_MODEL_NAME = "TaskTemplates";
export const VERBOSE_MODEL_NAME = "Task Template";
export const PLURALIZED_VERBOSE_MODEL_NAME = "Task Templates";
export const DEFAULT_SORT_BY = "id";
export const DEFAULT_FILTERS: Partial<TaskTemplateFormikFilter> = {
  //Generated by GetAllModelFilterDefaultBySeqModel
  q: "",
  taskCategory: "", //Generated by GetModelFilterDefault
  taskInterval: "", //Generated by GetModelFilterDefault
};
export const FIRST_FIELD_IN_FORM = "description"; //Generated by GetFirstFieldInForm
export const LAST_FIELD_IN_FORM = "taskIntervalID"; //Generated by GetLastFieldInForm
export const DEFAULT_FORM_VALUE = {
  //Generated by GetAllFormDefaultValueBySeqModel
  taskCategoryID: "", //Generated by GetFormDefaultValue
  taskIntervalID: "", //Generated by GetFormDefaultValue
  id: "", //Generated by GetFormDefaultValue
  description: "", //Generated by GetFormDefaultValue
  isSuspended: false, //Generated by GetFormDefaultValue,
  touched: false,
};
export const PRIMARY_KEY = "id";
export const UNIQUE_FIELDS = [
  //Generated by GetAllUniqueFieldsBySeqModel
];
export const REQUIRED_FIELDS = {
  //Generated by GetAllRequiredFieldsBySeqModel
  taskCategoryID: "Task Category", //Generated by GetRequiredField - Get Required Field
  taskIntervalID: "Task Interval", //Generated by GetRequiredField - Get Required Field
  description: "Description", //Generated by GetRequiredField - Get Required Field
};

//Generated by GetControlOptionsBySeqModel
export const CONTROL_OPTIONS = {};

//Generated by GetCOLUMNSObject
export const COLUMNS = {
  taskCategoryID: { type: "number", db_name: "task_category_id" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  taskIntervalID: { type: "number", db_name: "task_interval_id" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  id: { type: "number", db_name: "id" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  description: { type: "string", db_name: "description" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  isSuspended: { type: "boolean", db_name: "is_suspended" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
};
