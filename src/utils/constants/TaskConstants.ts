//Generated by WriteToModelconstants_ts - ModelConstants.ts
import { TaskFormikFilter } from "@/interfaces/TaskInterfaces";
import { convertDateToYYYYMMDD } from "@/utils/utilities";

export const MODEL_NAME = "Task";
export const TABLE_NAME = "taskmanager_task";
export const PLURALIZED_MODEL_NAME = "Tasks";
export const VERBOSE_MODEL_NAME = "Task";
export const PLURALIZED_VERBOSE_MODEL_NAME = "Tasks";
export const DEFAULT_SORT_BY = "-id";
export const VARIABLE_PLURAL_NAME = "tasks";
export const MODEL_PATH = "tasks";
export const DEFAULT_FILTERS: Partial<TaskFormikFilter> = {
  //Generated by GetAllModelFilterDefaultBySeqModel
  q: "",
  taskCategory: "", //Generated by GetModelFilterDefault
  taskInterval: "", //Generated by GetModelFilterDefault
  hasFile: false, //Generated by GetModelFilterDefault
  status: "", //Generated by GetModelFilterDefault
  dateFrom: "",
  dateTo: "", //Generated by GetModelFilterDefault - GetModelFilterDateBetweenDefault
};
export const FIRST_FIELD_IN_FORM = "description"; //Generated by GetFirstFieldInForm
export const LAST_FIELD_IN_FORM = "isFinished"; //Generated by GetLastFieldInForm
export const DEFAULT_FORM_VALUE = {
  //Generated by GetAllFormDefaultValueBySeqModel
  taskCategoryID: "", //Generated by GetFormDefaultValue
  taskIntervalID: "", //Generated by GetFormDefaultValue
  id: "", //Generated by GetFormDefaultValue
  description: "", //Generated by GetFormDefaultValue
  taskTemplateID: null, //Generated by GetFormDefaultValue
  date: convertDateToYYYYMMDD(new Date()), //Generated by GetFormDefaultValue
  targetDate: convertDateToYYYYMMDD(new Date()), //Generated by GetFormDefaultValue
  finishDateTime: null, //Generated by GetFormDefaultValue
  isFinished: false, //Generated by GetFormDefaultValue
  subTaskImported: false, //Generated by GetFormDefaultValue,
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
  date: "Date", //Generated by GetRequiredField - Get Required Field
  targetDate: "Target Date", //Generated by GetRequiredField - Get Required Field
};

//Generated by GetControlOptionsBySeqModel
export const CONTROL_OPTIONS = {
  //Generated by GetAllFilterManualOption - GetFilterWithManualOption
  status: [
    //Generated by GetAllFilterManualOption
    { id: "finished", name: "Finished" }, //Generated by GetFilterManualOption - GetFilterManualOption
    { id: "unfinished", name: "Unfinished" }, //Generated by GetFilterManualOption - GetFilterManualOption
  ],
};

//Generated by GetCOLUMNSObject
export const COLUMNS = {
  taskCategoryID: { type: "number", db_name: "task_category_id" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  taskIntervalID: { type: "number", db_name: "task_interval_id" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  id: { type: "number", db_name: "id" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  description: { type: "string", db_name: "description" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  taskTemplateID: { type: "number", db_name: "task_template_id" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  date: { type: "string", db_name: "date" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  targetDate: { type: "string", db_name: "target_date" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  finishDateTime: { type: "string", db_name: "finish_date_time" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  isFinished: { type: "boolean", db_name: "is_finished" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
  subTaskImported: { type: "boolean", db_name: "sub_task_imported" }, //Generated by GetConstantFieldDictionary - Constant Field Dictionary
};
