import { ModelConfig } from "@/interfaces/ModelConfig";
import { backendModels } from "@/lib/backend-models";
import { findModelPrimaryKeyField, forceCastToNumber } from "@/utils/utilities";
import { Transaction } from "sequelize";

const createParsedPayload = (
  modelConfig: ModelConfig,
  payload: Record<string, unknown>
) => {
  const parsedPayload: Record<string, unknown> = {};
  modelConfig.fields
    .filter((field) => !field.primaryKey)
    .forEach(({ dataType, fieldName, allowNull }) => {
      const value = payload[fieldName];
      let parsedValue;
      if ((typeof value === undefined || typeof value === null) && allowNull) {
        parsedValue = null;
      } else if (dataType === "BIGINT") {
        parsedValue = forceCastToNumber(payload[fieldName] as string);
      }

      parsedPayload[fieldName] = parsedValue;
    });

  return parsedPayload;
};

export const createModel = async (
  modelConfig: ModelConfig,
  payload: Record<string, unknown>,
  t: Transaction
) => {
  const parsedPayload = createParsedPayload(modelConfig, payload);
  const Model =
    backendModels[modelConfig.modelName as keyof typeof backendModels];

  //@ts-ignore
  return await Model.create(parsedPayload as any, { transaction: t });
};

export const updateModel = async (
  modelConfig: ModelConfig,
  payload: Record<string, unknown>,
  primaryKeyValue: number | string,
  t: Transaction
) => {
  const parsedPayload = createParsedPayload(modelConfig, payload);
  const primaryKeyField = findModelPrimaryKeyField(modelConfig);
  const Model =
    backendModels[modelConfig.modelName as keyof typeof backendModels];
  //@ts-ignore
  await Model.update(parsedPayload as any, {
    //@ts-ignore
    where: {
      [primaryKeyField.fieldName]:
        primaryKeyValue || payload[primaryKeyField.fieldName],
    },
    transaction: t,
    individualHooks: true,
  });
};

export const deleteModels = async (
  modelConfig: ModelConfig,
  deletedIds: string[] | number[],
  t: Transaction
) => {
  const primaryKeyField = findModelPrimaryKeyField(modelConfig);
  const Model =
    backendModels[modelConfig.modelName as keyof typeof backendModels];
  //@ts-ignore
  await Model.destroy({
    //@ts-ignore
    where: { [primaryKeyField.fieldName]: { [Op.in]: deletedIds } },
    transaction: t,
  });
};
