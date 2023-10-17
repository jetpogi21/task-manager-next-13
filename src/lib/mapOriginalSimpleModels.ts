import { ModelConfig } from "@/interfaces/ModelConfig";
import { AppConfig } from "@/lib/app-config";
import {
  findModelPrimaryKeyField,
  findRelationshipModelConfig,
} from "@/utils/utilities";

export const mapOriginalSimpleModels = (
  prop: Record<string, unknown>,
  modelConfig: ModelConfig
) => {
  const originalSimpleModels: Record<string, Record<string, unknown>[]> = {};

  AppConfig.relationships
    .filter(
      ({ rightModelID, isSimpleRelationship }) =>
        rightModelID === modelConfig.seqModelID && isSimpleRelationship
    )
    .forEach((relationship) => {
      const leftModelConfig = findRelationshipModelConfig(
        relationship.seqModelRelationshipID,
        "LEFT"
      );

      const leftPluralizedModelName = leftModelConfig.pluralizedModelName;
      const leftModelPrimaryFieldName =
        findModelPrimaryKeyField(leftModelConfig).fieldName;

      const leftModelDataPropItems: string[] | number[] = prop.data
        ? //@ts-ignore
          prop.data[leftPluralizedModelName]
        : [];

      originalSimpleModels[leftPluralizedModelName] =
        leftModelDataPropItems.map((item) => ({
          //@ts-ignore
          [leftModelPrimaryFieldName]: item[leftModelPrimaryFieldName],
          //@ts-ignore
          [relationship.fieldToBeInserted]:
            //@ts-ignore
            item[relationship.fieldToBeInserted],
        }));
    });

  return originalSimpleModels;
};
