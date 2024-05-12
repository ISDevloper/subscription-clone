import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormFieldWrapper } from "./formFieldWrapper";

export type TSelectField = {
  label: string;
  value: string;
};
export const SelectField = ({
  name,
  label,
  options,
  placeholder,
}: {
  name: string;
  label: string;
  options: Array<TSelectField>;
  placeholder: string;
}) => {
  return (
    <FormFieldWrapper name={name} label={label}>
      {({ field, fieldState: { error } }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger hasError={!!error}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map(({ label, value }: TSelectField, index: number) => {
                return (
                  <SelectItem key={index} value={value}>
                    {label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </FormFieldWrapper>
  );
};
