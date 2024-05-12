import { Input } from "../ui/input";
import { FormFieldWrapper } from "./formFieldWrapper";

export const InputField = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  return (
    <FormFieldWrapper name={name} label={label} defaultValue="">
      {({ field, fieldState: { error } }) => {
        return <Input {...field} hasError={!!error} />;
      }}
    </FormFieldWrapper>
  );
};
