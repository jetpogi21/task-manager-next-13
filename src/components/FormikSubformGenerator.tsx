import ModelSubform from "@/components/ModelSubform";
import { ModelConfig } from "@/interfaces/ModelConfig";
import { AppConfig } from "@/lib/app-config";
import { findRelationshipModelConfig } from "@/utils/utilities";
import { FormikProps } from "formik";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type FormikSubformGeneratorProps<T> = {
  modelConfig: ModelConfig;
  formik: FormikProps<T>;
  handleHasUdpate: () => void;
  filterFunction?: (item: Record<string, unknown>) => boolean;
};

const FormikSubformGenerator = <T,>({
  modelConfig,
  formik,
  handleHasUdpate,
  filterFunction,
}: FormikSubformGeneratorProps<T>) => {
  return getChildModels(modelConfig, { formMode: true }).map((relationship) => {
    const leftModelConfig = findRelationshipModelConfig(
      relationship.seqModelRelationshipID,
      "LEFT"
    );

    const hasOrderField = leftModelConfig.fields.some(
      (field) => field.orderField
    );

    if (hasOrderField) {
      return (
        <DndProvider
          backend={HTML5Backend}
          key={relationship.seqModelRelationshipID}
        >
          <ModelSubform
            key={relationship.seqModelRelationshipID}
            formik={formik}
            relationshipConfig={relationship}
            setHasUpdate={handleHasUdpate}
            filterFunction={filterFunction}
          />
        </DndProvider>
      );
    } else {
      return (
        <ModelSubform
          key={relationship.seqModelRelationshipID}
          formik={formik}
          relationshipConfig={relationship}
          setHasUpdate={handleHasUdpate}
          filterFunction={filterFunction}
        />
      );
    }
  });
};

export default FormikSubformGenerator;

interface GetChilModelsOptions {
  formMode?: boolean;
}

export function getChildModels(
  modelConfig: ModelConfig,
  options?: GetChilModelsOptions
) {
  return AppConfig.relationships.filter(
    ({ rightModelID, isSimpleRelationship, excludeInForm }) =>
      rightModelID === modelConfig.seqModelID &&
      !isSimpleRelationship &&
      (options?.formMode ? !excludeInForm : true)
  );
}
