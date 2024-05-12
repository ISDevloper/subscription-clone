import { useContext } from "react";
import { CalanderContext } from "./context";

export const DayList = ({ children }: any) => {
  const { numberDaysInMonth, firstDayInMonth } = useContext(CalanderContext);
  const calanderValues = Array.from(
    { length: 35 },
    (_, index) => index + 1
  ).map((day) => {
    if (
      day >= firstDayInMonth &&
      day - firstDayInMonth + 1 <= numberDaysInMonth
    ) {
      return day;
    } else {
      return "-";
    }
  });

  return children;
};
