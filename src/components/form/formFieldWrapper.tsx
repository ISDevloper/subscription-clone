import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
  useFormContext,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ReactNode } from "react";

type AllPrimitives = string | number | boolean | null | undefined;

type TFormFieldWrapper = {
  name: string;
  label: string;
  defaultValue?: AllPrimitives;
  children: (field: {
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FieldValues>;
  }) => ReactNode;
};

export const FormFieldWrapper = ({
  name,
  label,
  defaultValue,
  children,
}: TFormFieldWrapper) => {
  const methods = useFormContext();
  return (
    <FormField
      control={methods.control}
      name={name}
      defaultValue={defaultValue}
      render={(field) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{children(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
