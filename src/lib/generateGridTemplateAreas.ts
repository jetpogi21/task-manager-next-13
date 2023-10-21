import {
  getChildModelsWithSimpleRelationship,
  getSortedFormikFormControlFields,
} from "@/components/FormikFormControlGenerator";
import { getChildModels } from "@/components/FormikSubformGenerator";
import { getChildModelsWithDropzone } from "@/components/ModelDropzonesForRelationships";
import { ModelConfig } from "@/interfaces/ModelConfig";
import { findRelationshipModelConfig } from "@/utils/utilities";

export const generateGridTemplateAreas = (modelConfig: ModelConfig) => {
  const rows: string[][] = [];
  const fields = getSortedFormikFormControlFields(modelConfig);

  let row: string[] = [];
  for (let { columnsOccupied, fieldName } of fields) {
    for (let x = 0; x < columnsOccupied; x++) {
      row.push(fieldName);
      if (row.length === 12) {
        rows.push([...row]);
        row = [];
      }
    }
  }

  let lastRow = rows[rows.length - 1];
  if (lastRow.length < 12) {
    while (lastRow.length < 12) {
      lastRow.push(lastRow[lastRow.length - 1]);
    }
    rows[rows.length - 1] = lastRow;
  }

  const childModelsWithSimpleRelationship =
    getChildModelsWithSimpleRelationship(modelConfig);

  for (let { seqModelRelationshipID } of childModelsWithSimpleRelationship) {
    const leftModelConfig = findRelationshipModelConfig(
      seqModelRelationshipID,
      "LEFT"
    );
    const leftPluralizedModelName = leftModelConfig.pluralizedModelName;
    let row: string[] = new Array(12).fill(leftPluralizedModelName);
    rows.push(row);
  }

  const childModels = getChildModels(modelConfig);
  for (let { seqModelRelationshipID } of childModels) {
    const leftModelConfig = findRelationshipModelConfig(
      seqModelRelationshipID,
      "LEFT"
    );
    const leftPluralizedModelName = leftModelConfig.pluralizedModelName;
    let row: string[] = new Array(12).fill(leftPluralizedModelName);
    rows.push(row);
  }

  const childModelsWithDropzone = getChildModelsWithDropzone(modelConfig);
  for (let { seqModelRelationshipID } of childModelsWithDropzone) {
    const leftModelConfig = findRelationshipModelConfig(
      seqModelRelationshipID,
      "LEFT"
    );
    const leftPluralizedModelName = leftModelConfig.pluralizedModelName;
    let row: string[] = new Array(12).fill(leftPluralizedModelName + "Files");
    rows.push(row);
  }

  return `${rows.map((row) => `"${row.join(" ")}"`).join(" ")}`;
};
