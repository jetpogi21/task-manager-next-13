//Generated by WriteToModelconfig_ts - ModelConfig.ts
import { ModelConfig } from "@/interfaces/ModelConfig";
import { CheckSquare } from "lucide-react"

export const TaskConfig: ModelConfig = {
    //Generated by GetSeqmodelkeys
seqModelID: 53,
modelName: "Task",
tableName: "taskmanager_task",
timestamps: false,
pluralizedModelName: "Tasks",
modelPath: "tasks",
variableName: "task",
isMainQuery: true,
sortString: "-id",
slugField: null,
variablePluralName: "tasks",
verboseModelName: "Task",
pluralizedVerboseModelName: "Tasks",
navItemOrder: 5,
capitalizedName: "TASK",
isRowAction: true,
isTable: true,
navItemIcon: CheckSquare,
containerWidth: null,
limit: null,
    fields: [//Generated by GetAllSeqModelFieldKeys
{
seqModelFieldID: 203,
unique: false,
fieldName: "taskCategoryID",
autoincrement: false,
primaryKey: false,
allowNull: false,
databaseFieldName: "task_category_id",
pluralizedFieldName: null,
allowedOptions: null,
fieldOrder: 4,
verboseFieldName: "Task Category",
fieldWidth: null,
relatedModelID: 46,
hideInTable: false,
orderField: false,
dataType: "BIGINT",
dataTypeInterface: "number",
controlType: "Select",
},
{
seqModelFieldID: 204,
unique: false,
fieldName: "taskIntervalID",
autoincrement: false,
primaryKey: false,
allowNull: false,
databaseFieldName: "task_interval_id",
pluralizedFieldName: null,
allowedOptions: null,
fieldOrder: 5,
verboseFieldName: "Task Interval",
fieldWidth: null,
relatedModelID: 47,
hideInTable: false,
orderField: false,
dataType: "BIGINT",
dataTypeInterface: "number",
controlType: "Select",
},
{
seqModelFieldID: 205,
unique: false,
fieldName: "id",
autoincrement: true,
primaryKey: true,
allowNull: false,
databaseFieldName: "id",
pluralizedFieldName: null,
allowedOptions: null,
fieldOrder: 1,
verboseFieldName: "ID",
fieldWidth: null,
relatedModelID: null,
hideInTable: true,
orderField: false,
dataType: "BIGINT",
dataTypeInterface: "number",
controlType: "Hidden",
},
{
seqModelFieldID: 206,
unique: false,
fieldName: "description",
autoincrement: false,
primaryKey: false,
allowNull: false,
databaseFieldName: "description",
pluralizedFieldName: null,
allowedOptions: null,
fieldOrder: 2,
verboseFieldName: "Description",
fieldWidth: null,
relatedModelID: null,
hideInTable: false,
orderField: false,
dataType: "STRING",
dataTypeInterface: "string",
controlType: "Textarea",
},
{
seqModelFieldID: 207,
unique: false,
fieldName: "taskTemplateID",
autoincrement: false,
primaryKey: false,
allowNull: true,
databaseFieldName: "task_template_id",
pluralizedFieldName: null,
allowedOptions: null,
fieldOrder: 6,
verboseFieldName: "Task Template ID",
fieldWidth: null,
relatedModelID: null,
hideInTable: true,
orderField: false,
dataType: "BIGINT",
dataTypeInterface: "number",
controlType: "Hidden",
},
{
seqModelFieldID: 208,
unique: false,
fieldName: "date",
autoincrement: false,
primaryKey: false,
allowNull: false,
databaseFieldName: "date",
pluralizedFieldName: null,
allowedOptions: null,
fieldOrder: 7,
verboseFieldName: "Date",
fieldWidth: null,
relatedModelID: null,
hideInTable: false,
orderField: false,
dataType: "DATEONLY",
dataTypeInterface: "string",
controlType: "Date",
},
{
seqModelFieldID: 209,
unique: false,
fieldName: "targetDate",
autoincrement: false,
primaryKey: false,
allowNull: false,
databaseFieldName: "target_date",
pluralizedFieldName: null,
allowedOptions: null,
fieldOrder: 8,
verboseFieldName: "Target Date",
fieldWidth: null,
relatedModelID: null,
hideInTable: true,
orderField: false,
dataType: "DATEONLY",
dataTypeInterface: "string",
controlType: "Date",
},
{
seqModelFieldID: 210,
unique: false,
fieldName: "finishDateTime",
autoincrement: false,
primaryKey: false,
allowNull: true,
databaseFieldName: "finish_date_time",
pluralizedFieldName: null,
allowedOptions: null,
fieldOrder: 9,
verboseFieldName: "Finish Date Time",
fieldWidth: null,
relatedModelID: null,
hideInTable: true,
orderField: false,
dataType: "DATE",
dataTypeInterface: "string",
controlType: "DateAndTime",
},
{
seqModelFieldID: 211,
unique: false,
fieldName: "isFinished",
autoincrement: false,
primaryKey: false,
allowNull: false,
databaseFieldName: "is_finished",
pluralizedFieldName: null,
allowedOptions: null,
fieldOrder: 10,
verboseFieldName: "Is Finished",
fieldWidth: null,
relatedModelID: null,
hideInTable: true,
orderField: false,
dataType: "BOOLEAN",
dataTypeInterface: "boolean",
controlType: "Checkbox",
},
{
seqModelFieldID: 309,
unique: false,
fieldName: "subTaskImported",
autoincrement: false,
primaryKey: false,
allowNull: false,
databaseFieldName: "sub_task_imported",
pluralizedFieldName: null,
allowedOptions: null,
fieldOrder: 11,
verboseFieldName: "Sub Task Imported",
fieldWidth: null,
relatedModelID: null,
hideInTable: true,
orderField: false,
dataType: "BOOLEAN",
dataTypeInterface: "boolean",
controlType: "Hidden",
},],
    filters: [//Generated by GetAllSeqModelFilterKeys
{
seqModelFilterID: 203,
seqModelID: 53,
seqModelFieldID: 206,
filterQueryName: "q",
listVariableName: null,
filterOrder: 1,
filterCaption: null,
seqModelRelationshipID: null,
modelListID: null,
modelPath: null,
controlType: "Text",
variableName: null,
"options": [],
},
{
seqModelFilterID: 205,
seqModelID: 53,
seqModelFieldID: 204,
filterQueryName: "taskInterval",
listVariableName: null,
filterOrder: 3,
filterCaption: "Task Interval",
seqModelRelationshipID: null,
modelListID: 47,
modelPath: "task-intervals",
controlType: "Select",
variableName: "taskInterval",
"options": [],
},
{
seqModelFilterID: 287,
seqModelID: 53,
seqModelFieldID: null,
filterQueryName: "hasFile",
listVariableName: null,
filterOrder: 8,
filterCaption: "Has File",
seqModelRelationshipID: 50,
modelListID: null,
modelPath: null,
controlType: "Switch",
variableName: null,
"options": [],
},
{
seqModelFilterID: 288,
seqModelID: 53,
seqModelFieldID: 211,
filterQueryName: "status",
listVariableName: null,
filterOrder: 6,
filterCaption: "Status",
seqModelRelationshipID: null,
modelListID: null,
modelPath: null,
controlType: "Select",
variableName: null,
"options": [//Generated by GetAllSeqModelFilterOptionKeys
{
seqModelFilterOptionID: 1,
fieldValue: "finished",
fieldCaption: "Finished",
},
{
seqModelFilterOptionID: 2,
fieldValue: "unfinished",
fieldCaption: "Unfinished",
},],
},
{
seqModelFilterID: 290,
seqModelID: 53,
seqModelFieldID: 208,
filterQueryName: "date",
listVariableName: null,
filterOrder: 7,
filterCaption: "Date",
seqModelRelationshipID: null,
modelListID: null,
modelPath: null,
controlType: "DateRangePicker",
variableName: null,
"options": [],
},
{
seqModelFilterID: 291,
seqModelID: 53,
seqModelFieldID: 203,
filterQueryName: "taskCategory",
listVariableName: null,
filterOrder: 2,
filterCaption: "Task Category",
seqModelRelationshipID: null,
modelListID: 46,
modelPath: "task-categories",
controlType: "Select",
variableName: "taskCategory",
"options": [],
},],
    sorts: [//Generated by GetAllSeqModelSortKeys
{
seqModelSortID: 29,
seqModelFieldID: 205,
modelFieldCaption: "Date",
modelSortOrder: 1,
sortKey: null,
},
{
seqModelSortID: 30,
seqModelFieldID: 206,
modelFieldCaption: "Description",
modelSortOrder: 2,
sortKey: null,
},
{
seqModelSortID: 31,
seqModelFieldID: 203,
modelFieldCaption: "Task Category",
modelSortOrder: 3,
sortKey: null,
},
{
seqModelSortID: 32,
seqModelFieldID: 204,
modelFieldCaption: "Task Interval",
modelSortOrder: 4,
sortKey: null,
},]
}
