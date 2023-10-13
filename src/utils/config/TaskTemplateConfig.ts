//Generated by WriteToModelconfig_ts - ModelConfig.ts
import { ModelConfig } from "@/interfaces/ModelConfig";
import { File } from "lucide-react"

export const TaskTemplateConfig: ModelConfig = {
    //Generated by GetSeqmodelkeys
"seqModelID": 49,
"modelName": "TaskTemplate",
"tableName": "taskmanager_tasktemplate",
"timestamps": false,
"pluralizedModelName": "TaskTemplates",
"modelPath": "task-templates",
"variableName": "taskTemplate",
"isMainQuery": true,
"sortString": "id",
"slugField": null,
"variablePluralName": "taskTemplates",
"verboseModelName": "Task Template",
"pluralizedVerboseModelName": "Task Templates",
"navItemOrder": 4,
"capitalizedName": "TASKTEMPLATE",
"isRowAction": true,
"isTable": true,
"navItemIcon": File,
"containerWidth": null,
    fields: [//Generated by GetAllSeqModelFieldKeys
{
"seqModelFieldID": 176,
"unique": false,
"fieldName": "id",
"autoincrement": true,
"primaryKey": true,
"allowNull": false,
"databaseFieldName": "id",
"pluralizedFieldName": null,
"allowedOptions": null,
"fieldOrder": 1,
"verboseFieldName": "ID",
"fieldWidth": null,
"relatedModelID": null,
"hideInTable": false,
"orderField": false,
"dataType": "BIGINT",
"dataTypeInterface": "number",
"controlType": "Hidden",
},
{
"seqModelFieldID": 177,
"unique": false,
"fieldName": "description",
"autoincrement": false,
"primaryKey": false,
"allowNull": false,
"databaseFieldName": "description",
"pluralizedFieldName": null,
"allowedOptions": null,
"fieldOrder": 2,
"verboseFieldName": "Description",
"fieldWidth": null,
"relatedModelID": null,
"hideInTable": false,
"orderField": false,
"dataType": "STRING",
"dataTypeInterface": "string",
"controlType": "Text",
},
{
"seqModelFieldID": 178,
"unique": false,
"fieldName": "isSuspended",
"autoincrement": false,
"primaryKey": false,
"allowNull": false,
"databaseFieldName": "is_suspended",
"pluralizedFieldName": null,
"allowedOptions": null,
"fieldOrder": 5.5,
"verboseFieldName": "Is Suspended",
"fieldWidth": null,
"relatedModelID": null,
"hideInTable": false,
"orderField": false,
"dataType": "BOOLEAN",
"dataTypeInterface": "boolean",
"controlType": "Checkbox",
},
{
"seqModelFieldID": 179,
"unique": false,
"fieldName": "taskCategoryID",
"autoincrement": false,
"primaryKey": false,
"allowNull": false,
"databaseFieldName": "task_category_id",
"pluralizedFieldName": null,
"allowedOptions": null,
"fieldOrder": 4,
"verboseFieldName": "Task Category",
"fieldWidth": null,
"relatedModelID": null,
"hideInTable": false,
"orderField": false,
"dataType": "BIGINT",
"dataTypeInterface": "number",
"controlType": "Select",
},
{
"seqModelFieldID": 180,
"unique": false,
"fieldName": "taskIntervalID",
"autoincrement": false,
"primaryKey": false,
"allowNull": false,
"databaseFieldName": "task_interval_id",
"pluralizedFieldName": null,
"allowedOptions": null,
"fieldOrder": 5,
"verboseFieldName": "Task Interval",
"fieldWidth": null,
"relatedModelID": null,
"hideInTable": false,
"orderField": false,
"dataType": "BIGINT",
"dataTypeInterface": "number",
"controlType": "Select",
},],
    filters: [//Generated by GetAllSeqModelFilterKeys
{
"seqModelFilterID": 191,
"seqModelID": 49,
"seqModelFieldID": 177,
"filterQueryName": "q",
"listVariableName": null,
"filterOrder": 1,
"filterCaption": null,
"seqModelRelationshipID": null,
"modelListID": null,
"modelPath": null,
"controlType": "Text",
"variableName": null,
"options": [],
},
{
"seqModelFilterID": 193,
"seqModelID": 49,
"seqModelFieldID": 179,
"filterQueryName": "taskCategory",
"listVariableName": null,
"filterOrder": 2,
"filterCaption": "Task Category",
"seqModelRelationshipID": null,
"modelListID": 46,
"modelPath": "task-categories",
"controlType": "Select",
"variableName": "taskCategory",
"options": [],
},
{
"seqModelFilterID": 194,
"seqModelID": 49,
"seqModelFieldID": 180,
"filterQueryName": "taskInterval",
"listVariableName": null,
"filterOrder": 3,
"filterCaption": "Task Interval",
"seqModelRelationshipID": null,
"modelListID": 47,
"modelPath": "task-intervals",
"controlType": "Select",
"variableName": "taskInterval",
"options": [],
},],
    sorts: []
}
