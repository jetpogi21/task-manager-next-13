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

//Generated by GetModelInterface
export default interface TaskCategory
  extends Model<
    InferAttributes<TaskCategory>,
    InferCreationAttributes<TaskCategory>
  > {
  id: CreationOptional<number>;
  name: string;
}

//Generated by GetModelDefinition
export const TaskCategory = sequelize.define<TaskCategory>(
  "TaskCategory",
  //Generated by GetModelFieldsDictionary
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    name: {
      type: DataTypes.STRING(50),
      unique: true,
      field: "name",
    },
  },
  //Generated By GetModelOptionDict
  {
    name: { singular: "TaskCategory", plural: "TaskCategories" },
    tableName: "taskmanager_taskcategory",
    timestamps: false,
  }
);

//Generated by GenerateSyncModel
export const TaskCategorySync = async () => {
  try {
    await TaskCategory.sync({ alter: true });
    console.log("Task Category table has been created!");
  } catch (error) {
    console.error(
      `Unable to create ${"Task Category".toLowerCase()} table:`,
      error
    );
  }
};
