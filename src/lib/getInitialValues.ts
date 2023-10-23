import { BasicModel } from "@/interfaces/GeneralInterfaces";
import { ModelConfig } from "@/interfaces/ModelConfig";
import { AppConfig } from "@/lib/app-config";
import { getChildModels } from "@/lib/getChildModels";
import { getChildModelsWithSimpleRelationship } from "@/lib/getChildModelsWithSimpleRelationship";
import { sortFunction } from "@/lib/sortFunction";
import {
  findModelPrimaryKeyField,
  findConfigItemObject,
  convertDateToYYYYMMDD,
  findRelationshipModelConfig,
  replaceHighestOrder,
  findLeftForeignKeyField,
} from "@/utils/utilities";

//leftFieldName is for setting the default value of the parent model to 0
interface GetInitialValuesOption {
  requiredList?: Record<string, BasicModel[]>;
  childMode?: boolean;
  leftFieldName?: string;
}

export const getInitialValues = <T extends Record<keyof T, unknown>>(
  modelConfig: ModelConfig,
  record?: T,
  options?: GetInitialValuesOption
) => {
  const { seqModelID } = modelConfig;
  const primaryKeyField = findModelPrimaryKeyField(modelConfig).fieldName;
  const initialValues: Record<string, unknown> = {};
  modelConfig.fields.forEach(
    ({ allowNull, fieldName, dataType, relatedModelID, orderField }) => {
      if (record) {
        initialValues[fieldName] = record[fieldName as keyof T];
        return;
      }

      if (fieldName === options?.leftFieldName) {
        initialValues[fieldName] = 0;
        return;
      }

      if (allowNull) {
        initialValues[fieldName] = null;
        return;
      }

      if (orderField) {
        initialValues[fieldName] = 0;
        return;
      }

      //Meaning it uses some kind of reference to get its value based of a model
      if (relatedModelID) {
        const relatedModelConfig = findConfigItemObject(
          AppConfig.models,
          "seqModelID",
          relatedModelID
        );
        const variableName = relatedModelConfig.variableName;

        //Look at the requiredList
        const requiredList = options?.requiredList;
        if (requiredList) {
          const requiredModelList = requiredList[`${variableName}List`];
          if (requiredModelList.length > 0) {
            initialValues[fieldName] = requiredModelList[0].id;
            return;
          }
          initialValues[fieldName] = "";
          return;
        }
      }

      if (dataType === "BOOLEAN") {
        initialValues[fieldName] = false;
        return;
      }

      if (dataType === "DATEONLY") {
        initialValues[fieldName] = convertDateToYYYYMMDD(new Date());
        return;
      }

      initialValues[fieldName] = "";
    }
  );

  //Do this only if not childMode
  if (!options?.childMode) {
    getChildModels(modelConfig, { formMode: true }).forEach(
      ({ seqModelRelationshipID, leftForeignKey }) => {
        const leftModelConfig = findRelationshipModelConfig(
          seqModelRelationshipID,
          "LEFT"
        );
        const leftFieldName = findLeftForeignKeyField(
          seqModelRelationshipID
        ).fieldName;
        const { pluralizedModelName } = leftModelConfig;

        if (record) {
          const rows = record[pluralizedModelName as keyof T] as Record<
            string,
            unknown
          >[];
          initialValues[pluralizedModelName] = rows
            .sort(sortFunction(leftModelConfig.sortString, leftModelConfig))
            .map((item, index) => ({
              ...item,
              touched: false,
              index,
            }));
        } else {
          initialValues[pluralizedModelName] = [
            {
              ...getInitialValues(leftModelConfig, undefined, {
                childMode: true,
                leftFieldName,
                requiredList: options?.requiredList,
              }),
              index: 0,
            },
          ];
        }
        //Always add an empty row if there's a record
        if (record) {
          const draggableField = leftModelConfig.fields.find(
            (field) => field.orderField
          );

          const initialValuesRows = initialValues[
            pluralizedModelName
          ] as Record<string, unknown>[];

          const leftFieldName = findLeftForeignKeyField(
            seqModelRelationshipID
          ).fieldName;

          const newRow: Record<string, unknown> = {
            ...getInitialValues(leftModelConfig, undefined, {
              childMode: true,
            }),
            index: initialValuesRows.length + 1,
            [leftFieldName]: record[primaryKeyField as keyof T],
          };

          if (draggableField) {
            newRow[draggableField.fieldName] = replaceHighestOrder(
              initialValuesRows,
              draggableField.fieldName
            );
          }
          initialValuesRows.push(newRow);
        }
      }
    );
  }

  //Do this only if not childmode meaning you will generate the children rows of the modelConfig
  if (!options?.childMode) {
    getChildModelsWithSimpleRelationship(modelConfig).forEach(
      ({ seqModelRelationshipID, fieldToBeInserted }) => {
        const leftModelConfig = findRelationshipModelConfig(
          seqModelRelationshipID,
          "LEFT"
        );
        const { pluralizedModelName } = leftModelConfig;
        if (record) {
          //@ts-ignore
          initialValues[pluralizedModelName] = record[pluralizedModelName].map(
            //@ts-ignore
            (item) => item[fieldToBeInserted]
          );
        } else {
          initialValues[pluralizedModelName] = [];
        }
      }
    );
  }

  return initialValues as T;
};
