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
import { Task } from "./TaskModel";
import { Tag } from "./TagModel";

//Generated by GetModelInterface
export default interface TaskTag
  extends Model<InferAttributes<TaskTag>, InferCreationAttributes<TaskTag>> {
  id: CreationOptional<number>;
  taskID: number;
  tagID: number;
}

//Generated by GetModelDefinition
export const TaskTag = sequelize.define<TaskTag>(
  "TaskTag",
  //Generated by GetModelFieldsDictionary
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    taskID: {
      type: DataTypes.BIGINT,
      field: "task_id",
      //Generated by GetReferencesKeyForModelCreationMigration - references key for model creation
      references: {
        model: "taskmanager_task",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    tagID: {
      type: DataTypes.BIGINT,
      field: "tag_id",
      //Generated by GetReferencesKeyForModelCreationMigration - references key for model creation
      references: {
        model: "taskmanager_tag",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  //Generated By GetModelOptionDict
  {
    name: { singular: "TaskTag", plural: "TaskTags" },
    tableName: "taskmanager_task_tags",
    timestamps: false,
  }
);

//Generated by GenerateSyncModel
export const TaskTagSync = async () => {
  try {
    await TaskTag.sync({ alter: true });
    console.log("Task Tag table has been created!");
  } catch (error) {
    console.error(`Unable to create ${"Task Tag".toLowerCase()} table:`, error);
  }
};

//Generated by GenerateModelRelationship
Task.hasMany(TaskTag, {
  foreignKey: "task_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
TaskTag.belongsTo(Task, {
  foreignKey: "task_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//Generated by GenerateModelRelationship
Tag.hasMany(TaskTag, {
  foreignKey: "tag_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
TaskTag.belongsTo(Tag, {
  foreignKey: "tag_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
