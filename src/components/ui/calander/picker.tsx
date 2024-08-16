import { ReactNode, useContext } from "react";
import { CalanderContext } from "./context";
import { format, getMonth, getYear } from "date-fns";

type TPickerChildrenProps = {
  day: number;
  month: string;
  year: number;
};

type TPicker = {
  children: ({ day, month, year }: TPickerChildrenProps) => ReactNode;
};

export const Picker = ({ children }: TPicker) => {
  const { currentDate } = useContext(CalanderContext);
  const year = getYear(currentDate);
  const month = format(getMonth(currentDate), "MM");
  const day = getMonth(currentDate);

  return children({ day, month, year });
};
