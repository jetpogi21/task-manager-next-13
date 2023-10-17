import { FormikCheckbox } from "@/components/formik/FormikCheckbox";
import { FormikCombobox } from "@/components/formik/FormikCombobox";
import { FormikDate } from "@/components/formik/FormikDate";
import { FormikDateAndTime } from "@/components/formik/FormikDateAndTime";
import { FormikDatePicker } from "@/components/formik/FormikDatePicker";
import { FormikDateRangePicker } from "@/components/formik/FormikDateRangePicker";
import { FormikFacetedControl } from "@/components/formik/FormikFacetedControl";
import { FormikFileInput } from "@/components/formik/FormikFileInput";
import { FormikInput } from "@/components/formik/FormikInput";
import { FormikSelect } from "@/components/formik/FormikSelect";
import { FormikSwitch } from "@/components/formik/FormikSwitch";
import { FormikTextArea } from "@/components/formik/FormikTextArea";
import { BasicModel } from "@/interfaces/GeneralInterfaces";
import { ModelConfig } from "@/interfaces/ModelConfig";
import { AppConfig } from "@/lib/app-config";
import { getModelListById } from "@/lib/getModelListById";
import {
  findConfigItemObject,
  findRelationshipModelConfig,
} from "@/utils/utilities";
import { ClassValue } from "clsx";
import { CSSProperties } from "react";

interface RequiredList {
  [key: string]: BasicModel[];
}

interface FormikFormControlGeneratorProps {
  modelConfig: ModelConfig;
  options?: {
    requiredList?: RequiredList;
    setHasUpdate?: () => void;
    onChange?: Record<string, (newValue: unknown) => void>;
    styles?: Record<string, React.CSSProperties>;
    containerClassName?: Record<string, ClassValue>;
  };
}

export const FormikFormControlGenerator = ({
  modelConfig,
  options,
}: FormikFormControlGeneratorProps) => {
  const controls = modelConfig.fields
    .filter(({ controlType }) => controlType !== "Hidden")
    .sort((a, b) => a.fieldOrder - b.fieldOrder)
    .map(
      (
        { fieldName, verboseFieldName, controlType, relatedModelID, allowNull },
        index
      ) => {
        const style: CSSProperties = {
          ...options?.styles?.[fieldName],
          gridArea: fieldName,
        };

        const commonProps = {
          name: fieldName,
          label: verboseFieldName,
          setHasUpdate: options?.setHasUpdate,
          onChange: options?.onChange?.[fieldName],
          style: style,
          containerClassNames: options?.containerClassName?.[fieldName],
        };
        const relatedModelList = getModelListById(
          relatedModelID,
          options?.requiredList
        );
        switch (controlType) {
          case "Switch":
            return (
              <FormikSwitch
                size={"sm"}
                key={fieldName}
                {...commonProps}
              />
            );
          case "ComboBox":
            return (
              <FormikCombobox
                items={relatedModelList}
                showLabel={true}
                key={fieldName}
                {...commonProps}
              />
            );

          case "Select":
            return (
              <FormikSelect
                options={relatedModelList}
                showLabel={true}
                allowBlank={allowNull}
                key={fieldName}
                {...commonProps}
              />
            );
          case "Textarea":
            return (
              <FormikTextArea
                setFocusOnLoad={index === 0}
                rows={6}
                key={fieldName}
                {...commonProps}
              />
            );
          case "DateRangePicker":
            return (
              <FormikDateRangePicker
                key={fieldName}
                {...commonProps}
              />
            );
          case "WholeNumber":
            return (
              <FormikInput
                isNumeric={true}
                wholeNumberOnly={true}
                nullAllowed={allowNull}
                key={fieldName}
                {...commonProps}
              />
            );
          case "Decimal":
            return (
              <FormikInput
                isNumeric={true}
                wholeNumberOnly={false}
                nullAllowed={allowNull}
                key={fieldName}
                {...commonProps}
              />
            );
          case "Checkbox":
            return (
              <FormikCheckbox
                key={fieldName}
                {...commonProps}
              />
            );
          case "DatePicker":
            return (
              <FormikDatePicker
                key={fieldName}
                {...commonProps}
              />
            );
          case "DateAndTime":
            return (
              <FormikDateAndTime
                key={fieldName}
                {...commonProps}
              />
            );
          case "Date":
            return (
              <FormikDate
                key={fieldName}
                {...commonProps}
              />
            );
          case "Currency":
            return (
              <FormikInput
                isNumeric={true}
                wholeNumberOnly={false}
                currency={"₱"}
                nullAllowed={allowNull}
                key={fieldName}
                {...commonProps}
              />
            );
          case "FileInput":
            return (
              <FormikFileInput
                key={fieldName}
                {...commonProps}
              />
            );
          default:
            return (
              <FormikInput
                key={fieldName}
                placeholder={verboseFieldName}
                setFocusOnLoad={index === 0}
                {...commonProps}
              />
            );
        }
      }
    );

  const relatedControls = AppConfig.relationships
    .filter(
      ({ rightModelID, isSimpleRelationship }) =>
        rightModelID === modelConfig.seqModelID && isSimpleRelationship
    )
    .map(({ seqModelRelationshipID }) => {
      const leftModelConfig = findRelationshipModelConfig(
        seqModelRelationshipID,
        "LEFT"
      );

      const throughModelConfig = findRelationshipModelConfig(
        seqModelRelationshipID,
        "TROUGH"
      );
      const fieldName = leftModelConfig.pluralizedModelName;
      const caption = throughModelConfig.pluralizedVerboseModelName;

      const style: CSSProperties = {
        ...options?.styles?.[fieldName],
        gridArea: fieldName,
      };

      return (
        <FormikFacetedControl
          key={fieldName}
          name={fieldName}
          label={caption}
          options={
            options?.requiredList?.[`${throughModelConfig.variableName}List`] ||
            []
          }
          containerClassNames={options?.containerClassName?.[fieldName]}
          limit={10}
          setHasUpdate={options?.setHasUpdate}
          onChange={options?.onChange?.[fieldName]}
          style={style}
        />
      );
    });

  const combinedControls = [...controls, ...relatedControls];
  return combinedControls.map((control) => control);
};
