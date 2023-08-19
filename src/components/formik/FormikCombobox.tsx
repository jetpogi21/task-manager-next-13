import { Label } from "@/components/ui/Label";
import Combobox from "@/components/ui/Combobox";
import { BasicModel } from "@/interfaces/GeneralInterfaces";
import { useField } from "formik";
import { useEffect, useState } from "react";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

export interface FormikComboboxProp {
  label: string;
  items: BasicModel[];
  newInputHandler?: (inputValue: string) => void;
  freeSolo?: boolean;
  name: string;
  setArrayTouched?: () => void;
  onUpdate?: () => void;
  helperText?: string;
  containerClassNames?: ClassValue[];
  showLabel: boolean;
  setHasUpdate?: () => void;
  [key: string]: unknown;
}

export const FormikCombobox = ({
  label,
  items,
  multiple,
  newInputHandler,
  freeSolo = true,
  setArrayTouched,
  onUpdate,
  helperText,
  containerClassNames,
  showLabel = true,
  ...props
}: FormikComboboxProp) => {
  const [field, meta, { setValue }] = useField(props);
  const fieldValue = field.value;

  const hasError = meta.touched && meta.error;

  return (
    <div className={cn("flex flex-col w-full gap-1.5", containerClassNames)}>
      {showLabel && <Label htmlFor={props.name}>{label}</Label>}
      <Combobox
        value={fieldValue}
        onChange={(value) => {
          setValue(value);
          setArrayTouched && setArrayTouched();
          props.setHasUpdate && props.setHasUpdate();
        }}
        list={items}
        caption={label}
      />
      {helperText && (
        <span className="mt-1 text-xs font-bold text-muted-foreground">
          {helperText}
        </span>
      )}
      {hasError && <span className="text-xs text-red-500">{meta.error}</span>}
    </div>
  );
};
