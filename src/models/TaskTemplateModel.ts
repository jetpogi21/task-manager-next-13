//Generated by ImportCompleteModelFile
//Generated by GetCompleteModelFile

//Generated by GetModelImports
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import sequelize from "../config/db";
import { TaskCategory } from "./TaskCategoryModel";
import { TaskInterval } from "./TaskIntervalModel";

//Generated by GetModelInterface
export default interface TaskTemplate
  extends Model<
    InferAttributes<TaskTemplate>,
    InferCreationAttributes<TaskTemplate>
  > {
  id: CreationOptional<number>;
  description: string;
  isSuspended: boolean;
  taskCategoryID: number;
  taskIntervalID: number;
}

//Generated by GetModelDefinition
export const TaskTemplate = sequelize.define<TaskTemplate>(
  "TaskTemplate",
  //Generated by GetModelFieldsDictionary
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    description: {
      type: DataTypes.STRING(50),
      field: "description",
    },
    isSuspended: {
      type: DataTypes.BOOLEAN,
      field: "is_suspended",
    },
    taskCategoryID: {
      type: DataTypes.BIGINT,
      field: "task_category_id",
      //Generated by GetReferencesKeyForModelCreationMigration - references key for model creation
      references: {
        model: "taskmanager_taskcategory",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    taskIntervalID: {
      type: DataTypes.BIGINT,
      field: "task_interval_id",
      //Generated by GetReferencesKeyForModelCreationMigration - references key for model creation
      references: {
        model: "taskmanager_taskinterval",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  //Generated By GetModelOptionDict
  {
    name: { singular: "TaskTemplate", plural: "TaskTemplates" },
    tableName: "taskmanager_tasktemplate",
    timestamps: false,
  }
);

//Generated by GenerateSyncModel
export const TaskTemplateSync = async () => {
  try {
    await TaskTemplate.sync({ alter: true });
    console.log("Task Template table has been created!");
  } catch (error) {
    console.error(
      `Unable to create ${"Task Template".toLowerCase()} table:`,
      error
    );
  }
};

//Generated by GenerateModelRelationship
TaskCategory.hasMany(TaskTemplate, {
  foreignKey: "task_category_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
TaskTemplate.belongsTo(TaskCategory, {
  foreignKey: "task_category_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Generated by GenerateModelRelationship
TaskInterval.hasMany(TaskTemplate, {
  foreignKey: "task_interval_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
TaskTemplate.belongsTo(TaskInterval, {
  foreignKey: "task_interval_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});