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
};

const FormikSubformGenerator = <T,>({
  modelConfig,
  formik,
  handleHasUdpate,
}: FormikSubformGeneratorProps<T>) => {
  return AppConfig.relationships
    .filter(
      ({ rightModelID, isSimpleRelationship }) =>
        rightModelID === modelConfig.seqModelID && !isSimpleRelationship
    )
    .map((relationship) => {
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
              formik={formik}
              relationshipConfig={relationship}
              setHasUpdate={handleHasUdpate}
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
          />
        );
      }
    });
};

export default FormikSubformGenerator;
