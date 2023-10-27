import useModelList from "@/hooks/useModelList";
import { BasicModel } from "@/interfaces/GeneralInterfaces";
import { ModelConfig } from "@/interfaces/ModelConfig";
import { AppConfig } from "@/lib/app-config";
import { extractDataTypeOptionSubstrings } from "@/lib/extractDataTypeOptionSubstrings";
import {
  findConfigItemObject,
  findRelationshipModelConfig,
} from "@/utils/utilities";

export const createRequiredModelLists = (modelConfig: ModelConfig) => {
  const requiredList: Record<string, BasicModel[]> = {};

  modelConfig.fields
    .filter(
      ({ dataTypeOption, dataType }) => dataTypeOption && dataType === "ENUM"
    )
    .forEach(({ fieldName, dataTypeOption }) => {
      const controlOptionArr = extractDataTypeOptionSubstrings(dataTypeOption!);

      requiredList[`${fieldName}List`] = controlOptionArr.map((item) => ({
        id: item,
        name: item,
      }));
    });

  //Loop through each field having relatedModelID value
  modelConfig.fields
    .filter(({ relatedModelID }) => relatedModelID)
    .forEach(({ relatedModelID }) => {
      const relatedModel = AppConfig.models.find(
        (model) => model.seqModelID === relatedModelID
      );
      if (!relatedModel) return;
      requiredList[`${relatedModel.variableName}List`] =
        useModelList(relatedModel);
    });

  AppConfig.relationships
    .filter((relationship) => {
      return (
        relationship.rightModelID === modelConfig.seqModelID &&
        relationship.isSimpleRelationship
      );
    })
    .map((relationship) => {
      const throughModelConfig = findRelationshipModelConfig(
        relationship.seqModelRelationshipID,
        "TROUGH"
      );

      requiredList[`${throughModelConfig.variableName}List`] =
        useModelList(throughModelConfig);
    });

  return requiredList;
};

export const createRequiredModelListsForFilter = (modelConfig: ModelConfig) => {
  const requiredList: Record<string, BasicModel[]> = {};

  modelConfig.filters
    .filter(({ modelListID }) => modelListID)
    .forEach(({ modelListID }) => {
      const relatedModel = findConfigItemObject(
        AppConfig.models,
        "seqModelID",
        modelListID!
      );

      requiredList[`${relatedModel.variableName}List`] =
        useModelList(relatedModel);
    });

  return requiredList;
};
