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
import { TaskTemplate } from "./TaskTemplateModel";

//Generated by GetModelInterface
export default interface SubTaskTemplate
  extends Model<
    InferAttributes<SubTaskTemplate>,
    InferCreationAttributes<SubTaskTemplate>
  > {
  id: CreationOptional<number>;
  description: string;
  priority: string;
  taskTemplateID: number;
}

//Generated by GetModelDefinition
export const SubTaskTemplate = sequelize.define<SubTaskTemplate>(
  "SubTaskTemplate",
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
    priority: {
      type: DataTypes.DECIMAL(4, 2),
      field: "priority",
    },
    taskTemplateID: {
      type: DataTypes.BIGINT,
      field: "task_template_id",
      //Generated by GetReferencesKeyForModelCreationMigration - references key for model creation
      references: {
        model: "taskmanager_tasktemplate",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  //Generated By GetModelOptionDict
  {
    name: { singular: "SubTaskTemplate", plural: "SubTaskTemplates" },
    tableName: "taskmanager_subtasktemplate",
    timestamps: false,
  }
);

//Generated by GenerateSyncModel
export const SubTaskTemplateSync = async () => {
  try {
    await SubTaskTemplate.sync({ alter: true });
    console.log("Sub Task Template table has been created!");
  } catch (error) {
    console.error(
      `Unable to create ${"Sub Task Template".toLowerCase()} table:`,
      error
    );
  }
};

//Generated by GenerateModelRelationship
TaskTemplate.hasMany(SubTaskTemplate, {
  foreignKey: "task_template_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
SubTaskTemplate.belongsTo(TaskTemplate, {
  foreignKey: "task_template_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
