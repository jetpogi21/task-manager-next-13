"use client";
import { Label } from "@/components/ui/Label";
import { useField, useFormikContext } from "formik";
import { useEffect, useRef, useState, RefObject } from "react";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";

export interface FormikCheckboxProps extends ButtonProps {
  label?: string;
  name: string;
  setFocusOnLoad?: boolean;
  setArrayTouched?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  inputRef?: RefObject<HTMLButtonElement> | undefined;
  helperText?: string;
  submitOnChange?: boolean;
  containerClassNames?: ClassValue[];
}

export const FormikCheckbox: React.FC<FormikCheckboxProps> = ({
  containerClassNames = "",
  label = "",
  setArrayTouched,
  setFocusOnLoad = false,
  inputRef: propInputRef,
  onKeyDown,
  helperText,
  submitOnChange = false,
  ...props
}) => {
  const { submitForm } = useFormikContext();
  const [field, meta, { setValue }] = useField(props.name);
  const fieldValue =
    typeof field.value === "number" ? Boolean(field.value) : field.value;
  const [internalVal, setInternalVal] = useState(fieldValue);

  const inputRef = useRef<HTMLButtonElement>(null);

  const hasError = meta.touched && meta.error;

  const handleChange = (checked: boolean) => {
    setArrayTouched && setArrayTouched();
    setValue(checked);
    if (submitOnChange) {
      submitForm();
    }
  };

  useEffect(() => {
    if (fieldValue !== internalVal) {
      setInternalVal(fieldValue);
    }
  }, [fieldValue]);

  useEffect(() => {
    if (inputRef && setFocusOnLoad) {
      inputRef.current?.focus();
    }
  }, [inputRef, setFocusOnLoad]);

  return (
    <div
      className={cn("flex flex-col gap-1.5 items-center", containerClassNames)}
    >
      <Checkbox
        checked={fieldValue}
        onCheckedChange={handleChange}
        ref={propInputRef || inputRef}
        onKeyDown={(e) => {
          onKeyDown && onKeyDown(e);
        }}
        {...props}
      />
      {!!label && <Label htmlFor={props.name}>{label}</Label>}
      {helperText && (
        <span className="mt-1 text-xs font-bold text-muted-foreground">
          {helperText}
        </span>
      )}
      {hasError && <span className="text-xs text-red-500">{meta.error}</span>}
    </div>
  );
};
