import { ModelConfig } from "@/interfaces/ModelConfig";

export function getFirstAndLastFieldInForm(fields: ModelConfig["fields"]) {
  const visibleFields = fields
    .filter((field) => !field.hideInTable)
    .sort((a, b) => a.fieldOrder - b.fieldOrder);

  const firstFieldInForm = visibleFields[0]?.fieldName || "";
  const lastFieldInForm =
    visibleFields[visibleFields.length - 1]?.fieldName || "";

  return [firstFieldInForm, lastFieldInForm];
}
