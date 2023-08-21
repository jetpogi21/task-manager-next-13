"use client";
import { Label } from "@/components/ui/Label";
import { useField, useFormikContext } from "formik";
import {
  useEffect,
  useRef,
  useState,
  RefObject,
  ChangeEventHandler,
  FocusEventHandler,
} from "react";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/components/ui/Button";
import { DatePicker, DatePickerProps } from "@/components/ui/DatePicker";
import { SelectSingleEventHandler } from "react-day-picker";
import { Input } from "@/components/ui/Input";
import {
  convertStringToLocaleString,
  toValidDateTime,
} from "@/utils/utilities";

export interface FormikDateAndTimeProps
  extends ButtonProps,
    Pick<DatePickerProps, "format"> {
  label?: string;
  name: string;
  setFocusOnLoad?: boolean;
  setArrayTouched?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  inputRef?: RefObject<HTMLInputElement> | undefined;
  helperText?: string;
  submitOnChange?: boolean;
  containerClassNames?: ClassValue[];
  showLabel?: boolean;
  setHasUpdate?: () => void;
}

export const FormikDateAndTime: React.FC<FormikDateAndTimeProps> = ({
  containerClassNames = "",
  label = "",
  setArrayTouched,
  setFocusOnLoad = false,
  inputRef: propInputRef,
  onKeyDown,
  helperText,
  submitOnChange = false,
  showLabel = true,
  format,
  ...props
}) => {
  const { submitForm } = useFormikContext();
  const [field, meta, { setValue }] = useField(props.name);
  const fieldValue = field.value
    ? field.value instanceof Date
      ? toValidDateTime(new Date(field.value))
      : field.value
    : undefined;

  const [internal, setInternal] = useState(fieldValue);

  const inputRef = useRef<HTMLInputElement>(null);

  const hasError = meta.touched && meta.error;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInternal(e.currentTarget.value);
    submitOnChange && submitForm();
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    setValue(internal);
    setArrayTouched && setArrayTouched();
    props.setHasUpdate && props.setHasUpdate();
  };

  useEffect(() => {
    if (inputRef && setFocusOnLoad) {
      inputRef.current?.focus();
    }
  }, [inputRef, setFocusOnLoad]);

  return (
    <div className={cn("flex flex-col w-full gap-1.5", containerClassNames)}>
      {showLabel && !!label && <Label htmlFor={props.name}>{label}</Label>}
      <Input
        type="datetime-local"
        value={fieldValue}
        onChange={handleChange}
        onBlur={handleBlur}
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
