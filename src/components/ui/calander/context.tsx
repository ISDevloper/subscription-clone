import { getDay, getDaysInMonth } from "date-fns";
import { createContext, useState } from "react";
import { getDate, structureDate } from "./utlis";
import { SlicedDate } from "./types";

const currentDate = structureDate(new Date());
const numberDaysInMonth = getDaysInMonth(getDate(currentDate));
const firstDayInMonth = getDay(getDate({ ...currentDate, day: 1 }));

export const CalanderContext = createContext({
  currentDate,
  numberDaysInMonth,
  firstDayInMonth,
  moveNextMonth: () => {},
  movePrevMonth: () => {},
  moveToDay: () => {},
});

export const CalanderProvider = ({ children }: any) => {
  const [currentDate, setCurrentDate] = useState(structureDate(new Date()));

  const numberDaysInMonth = getDaysInMonth(getDate(currentDate));
  const firstDayInMonth = getDay(getDate({ ...currentDate, day: 1 }));

  const moveNextMonth = () => {
    setCurrentDate((prev: SlicedDate) => {
      return { ...prev, month: prev.month + 1 };
    });
  };

  const movePrevMonth = () => {
    setCurrentDate((prev: SlicedDate) => {
      return { ...prev, month: prev.month - 1 };
    });
  };

  const moveToDay = (day: number) => {
    setCurrentDate((prev: SlicedDate) => {
      return { ...prev, day: day };
    });
  };
  return (
    <CalanderContext.Provider
      value={{
        currentDate,
        numberDaysInMonth,
        firstDayInMonth,
        moveNextMonth,
        movePrevMonth,
        moveToDay,
      }}
    >
      {children}
    </CalanderContext.Provider>
  );
};
