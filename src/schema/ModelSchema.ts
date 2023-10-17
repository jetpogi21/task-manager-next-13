import { ModelConfig } from "@/interfaces/ModelConfig";
import { AppConfig } from "@/lib/app-config";
import { findRelationshipModelConfig } from "@/utils/utilities";
import * as Yup from "yup";

const getBaseYupChain = (dataTypeInterface: string) => {
  let yupChain;
  switch (dataTypeInterface) {
    case "string":
      yupChain = Yup.string();
      break;

    case "number":
      yupChain = Yup.number();
      break;

    case "boolean":
      yupChain = Yup.boolean();
      break;

    default:
      yupChain = Yup.string();
      break;
  }

  return yupChain;
};

const createShapeFromModelConfig = (
  modelConfig: ModelConfig,
  arrayMode: boolean = false
) => {
  const shape: Record<string, unknown> = {};
  modelConfig.fields
    .filter(({ primaryKey }) => !primaryKey)
    .forEach(
      ({ fieldName, allowNull, verboseFieldName, dataTypeInterface }) => {
        let yupChain = getBaseYupChain(dataTypeInterface);

        if (dataTypeInterface !== "boolean") {
          if (!allowNull) {
            if (arrayMode) {
              //@ts-ignore
              yupChain = yupChain.when("touched", ([touched], schema) =>
                touched
                  ? schema.required(`${verboseFieldName} is a required field.`)
                  : schema.notRequired()
              );
            } else {
              yupChain = yupChain.required(
                `${verboseFieldName} is a required field.`
              );
            }
          } else {
            if (arrayMode) {
              //@ts-ignore
              yupChain = yupChain.nullable();
            } else {
              //@ts-ignore
              yupChain = yupChain
                .nullable()
                .transform((value, originalValue) =>
                  originalValue && originalValue !== "" ? value : null
                );
            }
          }
        }

        shape[fieldName] = yupChain;
      }
    );

  return shape;
};

export const ModelSchema = (modelConfig: ModelConfig) => {
  const shape: Record<string, unknown> =
    createShapeFromModelConfig(modelConfig);
  //one level deep of object relationship only to avoid loop

  const relationshipShape: Record<string, unknown> = {};
  AppConfig.relationships
    .filter(
      ({ rightModelID, isSimpleRelationship }) =>
        rightModelID === modelConfig.seqModelID && !isSimpleRelationship
    )
    .forEach(({ seqModelRelationshipID }) => {
      //get the modelSchema of the leftModel
      const leftModelConfig = findRelationshipModelConfig(
        seqModelRelationshipID,
        "LEFT"
      );

      relationshipShape[leftModelConfig.pluralizedModelName] = Yup.array().of(
        //@ts-ignore
        Yup.object().shape(createShapeFromModelConfig(leftModelConfig, true))
      );
    });

  //@ts-ignore
  return Yup.object().shape({ ...shape, ...relationshipShape });
};
