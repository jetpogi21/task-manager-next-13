"use client";
import { Label } from "@/components/ui/Label";
import { useField, useFormikContext } from "formik";
import {
  useEffect,
  useRef,
  useState,
  RefObject,
  FormEventHandler,
} from "react";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import { Switch, SwitchProps } from "@/components/ui/Switch";
import { ButtonProps } from "@/components/ui/Button";

export interface FormikSwitchProps extends SwitchProps {
  label?: string;
  name: string;
  setFocusOnLoad?: boolean;
  setArrayTouched?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  inputRef?: RefObject<HTMLButtonElement> | undefined;
  helperText?: string;
  submitOnChange?: boolean;
  containerClassNames?: ClassValue[];
  setHasUpdate?: () => void;
}

export const FormikSwitch: React.FC<FormikSwitchProps> = ({
  containerClassNames = "",
  label = "",
  setArrayTouched,
  setFocusOnLoad = false,
  inputRef: propInputRef,
  onKeyDown,
  helperText,
  submitOnChange = false,
  setHasUpdate,
  ...props
}) => {
  const { submitForm } = useFormikContext();
  const [field, meta, { setValue }] = useField(props.name);
  const fieldValue = field.value;
  const [internalVal, setInternalVal] = useState(fieldValue);

  const inputRef = useRef<HTMLButtonElement>(null);

  const hasError = meta.touched && meta.error;

  const handleChange = (checked: boolean) => {
    setValue(checked);
    setHasUpdate && setHasUpdate();
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
      className={cn(
        "flex flex-col w-full gap-1.5 items-center",
        containerClassNames
      )}
    >
      <Switch
        checked={fieldValue}
        onCheckedChange={handleChange}
        ref={propInputRef || inputRef}
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
