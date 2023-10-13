//Generated by WriteToModelconfig_ts - ModelConfig.ts
import { ModelConfig } from "@/interfaces/ModelConfig";
import { Clock } from "lucide-react"

export const TaskIntervalConfig: ModelConfig = {
    //Generated by GetSeqmodelkeys
"seqModelID": 47,
"modelName": "TaskInterval",
"tableName": "taskmanager_taskinterval",
"timestamps": false,
"pluralizedModelName": "TaskIntervals",
"modelPath": "task-intervals",
"variableName": "taskInterval",
"isMainQuery": false,
"sortString": "name",
"slugField": null,
"variablePluralName": "taskIntervals",
"verboseModelName": "Task Interval",
"pluralizedVerboseModelName": "Task Intervals",
"navItemOrder": 2,
"capitalizedName": "TASKINTERVAL",
"isRowAction": false,
"isTable": false,
"navItemIcon": Clock,
"containerWidth": "max-w-[750px]",
    fields: [//Generated by GetAllSeqModelFieldKeys
{
"seqModelFieldID": 172,
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
"seqModelFieldID": 173,
"unique": true,
"fieldName": "name",
"autoincrement": false,
"primaryKey": false,
"allowNull": false,
"databaseFieldName": "name",
"pluralizedFieldName": null,
"allowedOptions": null,
"fieldOrder": 2,
"verboseFieldName": "Name",
"fieldWidth": null,
"relatedModelID": null,
"hideInTable": false,
"orderField": false,
"dataType": "STRING",
"dataTypeInterface": "string",
"controlType": "Text",
},],
    filters: [//Generated by GetAllSeqModelFilterKeys
{
"seqModelFilterID": 72,
"seqModelID": 47,
"seqModelFieldID": 173,
"filterQueryName": "q",
"listVariableName": null,
"filterOrder": 1,
"filterCaption": "Name",
"seqModelRelationshipID": null,
"modelListID": null,
"modelPath": null,
"controlType": "Text",
"variableName": null,
"options": [],
},],
    sorts: []
}
