import { ReactNode, createContext, useState } from "react";
import { addMonths, setDate, subMonths } from "date-fns";
interface DateContextType {
  currentDate: Date;
  selectedDate: null | Date;
  moveNextMonth: () => void;
  movePrevMonth: () => void;
  moveToDay: (day: number) => void;
}

type TProvider = {
  children: ReactNode;
  defaultvalue: null | Date;
};

const defaultDateContext: DateContextType = {
  currentDate: new Date(),
  selectedDate: null,
  moveNextMonth: () => {},
  movePrevMonth: () => {},
  moveToDay: () => {},
};

export const CalanderContext =
  createContext<DateContextType>(defaultDateContext);

export const CalanderProvider = ({
  children,
  defaultvalue = null,
}: TProvider) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(defaultvalue);

  const moveNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const movePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const moveToDay = (day: number) => {
    setSelectedDate(setDate(currentDate, day));
  };
  return (
    <CalanderContext.Provider
      value={{
        currentDate,
        selectedDate,
        moveNextMonth,
        movePrevMonth,
        moveToDay,
      }}
    >
      {children}
    </CalanderContext.Provider>
  );
};
