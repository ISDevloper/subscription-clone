import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import { InputField } from "./InputField";
import { SelectField } from "./selectField";
import { ReactNode } from "react";

type Tform = {
  children: ReactNode;
  onSubmit: (data: any) => void;
} & UseFormReturn<FieldValues, undefined>;

export const Form = ({ children, onSubmit, ...rest }: Tform) => {
  const { handleSubmit } = rest;
  return (
    <FormProvider {...rest}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

Form.Input = InputField;
Form.Select = SelectField;

export default Form;
