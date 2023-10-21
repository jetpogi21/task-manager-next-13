//Generated by WriteToModelconfig_ts - ModelConfig.ts
import { ModelConfig } from "@/interfaces/ModelConfig";


export const SubTaskTemplateConfig: ModelConfig = {
    //Generated by GetSeqmodelkeys
seqModelID: 50,
modelName: "SubTaskTemplate",
tableName: "taskmanager_subtasktemplate",
timestamps: false,
pluralizedModelName: "SubTaskTemplates",
modelPath: "sub-task-templates",
variableName: "subTaskTemplate",
isMainQuery: true,
sortString: "priority",
slugField: null,
variablePluralName: "subTaskTemplates",
verboseModelName: "Sub Task Template",
pluralizedVerboseModelName: "Sub Task Templates",
navItemOrder: null,
capitalizedName: "SUBTASKTEMPLATE",
isRowAction: false,
isTable: false,
navItemIcon: null,
containerWidth: null,
limit: null,
    fields: [//Generated by GetAllSeqModelFieldKeys
{
seqModelFieldID: 183,
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
hideInTable: false,
orderField: false,
dataType: "BIGINT",
dataTypeInterface: "number",
controlType: "Hidden",
columnsOccupied: null,
},
{
seqModelFieldID: 184,
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
controlType: "Text",
columnsOccupied: null,
},
{
seqModelFieldID: 185,
unique: false,
fieldName: "priority",
autoincrement: false,
primaryKey: false,
allowNull: false,
databaseFieldName: "priority",
pluralizedFieldName: null,
allowedOptions: null,
fieldOrder: 3,
verboseFieldName: "Priority",
fieldWidth: null,
relatedModelID: null,
hideInTable: false,
orderField: true,
dataType: "DECIMAL",
dataTypeInterface: "number",
controlType: "Decimal",
columnsOccupied: null,
},
{
seqModelFieldID: 186,
unique: false,
fieldName: "taskTemplateID",
autoincrement: false,
primaryKey: false,
allowNull: false,
databaseFieldName: "task_template_id",
pluralizedFieldName: null,
allowedOptions: null,
fieldOrder: 4,
verboseFieldName: "Task Template ID",
fieldWidth: null,
relatedModelID: null,
hideInTable: false,
orderField: false,
dataType: "BIGINT",
dataTypeInterface: "number",
controlType: "WholeNumber",
columnsOccupied: null,
},],
    filters: [],
    sorts: []
}
