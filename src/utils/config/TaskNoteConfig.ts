//Generated by WriteToModelconfig_ts - ModelConfig.ts
import { ModelConfig } from "@/interfaces/ModelConfig";


export const TaskNoteConfig: ModelConfig = {
    //Generated by GetSeqmodelkeys
seqModelID: 51,
modelName: "TaskNote",
tableName: "taskmanager_note",
timestamps: false,
pluralizedModelName: "TaskNotes",
modelPath: "task-notes",
variableName: "taskNote",
isMainQuery: false,
sortString: "id",
slugField: null,
variablePluralName: "taskNotes",
verboseModelName: "Task Note",
pluralizedVerboseModelName: "Task Notes",
navItemOrder: null,
capitalizedName: "TASKNOTE",
isRowAction: false,
isTable: false,
navItemIcon: null,
containerWidth: null,
limit: null,
    fields: [//Generated by GetAllSeqModelFieldKeys
{
seqModelFieldID: 189,
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
seqModelFieldID: 190,
unique: false,
fieldName: "note",
autoincrement: false,
primaryKey: false,
allowNull: true,
databaseFieldName: "note",
pluralizedFieldName: null,
allowedOptions: null,
fieldOrder: 2,
verboseFieldName: "Note",
fieldWidth: null,
relatedModelID: null,
hideInTable: false,
orderField: false,
dataType: "TEXT",
dataTypeInterface: "string",
controlType: "Textarea",
},
{
seqModelFieldID: 212,
unique: false,
fieldName: "taskID",
autoincrement: false,
primaryKey: false,
allowNull: false,
databaseFieldName: "task_id",
pluralizedFieldName: null,
allowedOptions: null,
fieldOrder: 3,
verboseFieldName: "Task ID",
fieldWidth: null,
relatedModelID: null,
hideInTable: true,
orderField: false,
dataType: "BIGINT",
dataTypeInterface: "number",
controlType: "Text",
},
{
seqModelFieldID: 213,
unique: false,
fieldName: "file",
autoincrement: false,
primaryKey: false,
allowNull: true,
databaseFieldName: "file",
pluralizedFieldName: null,
allowedOptions: null,
fieldOrder: 4,
verboseFieldName: "File",
fieldWidth: 300,
relatedModelID: null,
hideInTable: true,
orderField: false,
dataType: "TEXT",
dataTypeInterface: "string",
controlType: "LocalFileInput",
},
{
seqModelFieldID: 220,
unique: false,
fieldName: "fileSize",
autoincrement: false,
primaryKey: false,
allowNull: true,
databaseFieldName: "file_size",
pluralizedFieldName: null,
allowedOptions: null,
fieldOrder: 5,
verboseFieldName: "File Size",
fieldWidth: null,
relatedModelID: null,
hideInTable: true,
orderField: false,
dataType: "BIGINT",
dataTypeInterface: "number",
controlType: "Hidden",
},
{
seqModelFieldID: 221,
unique: false,
fieldName: "fileName",
autoincrement: false,
primaryKey: false,
allowNull: true,
databaseFieldName: "file_name",
pluralizedFieldName: null,
allowedOptions: null,
fieldOrder: 6,
verboseFieldName: "File Name",
fieldWidth: null,
relatedModelID: null,
hideInTable: true,
orderField: false,
dataType: "TEXT",
dataTypeInterface: "string",
controlType: "Hidden",
},],
    filters: [//Generated by GetAllSeqModelFilterKeys
{
seqModelFilterID: 292,
seqModelID: 51,
seqModelFieldID: 213,
filterQueryName: "hasFile",
listVariableName: null,
filterOrder: 1,
filterCaption: "File",
seqModelRelationshipID: null,
modelListID: null,
modelPath: null,
controlType: "Switch",
variableName: null,
filterOperator: "Not is Null",
"options": [],
},],
    sorts: []
}
