import { ReactNode, useContext } from "react";
import { CalanderContext } from "./context";
import { getDate, getMonth } from "date-fns";

type TItemChildren = {
  isToday: boolean;
  isCurrentMonth: boolean;
  isCurrent: boolean;
};

type TItem = {
  children: ({ isToday, isCurrentMonth }: TItemChildren) => ReactNode;
  item: {
    text: number;
    value: Date;
  };
};

export const Item = ({ children, item }: TItem) => {
  const { currentDate, selectedDate, moveToDay } = useContext(CalanderContext);

  const todayDate = new Date();

  const todayMonth = getMonth(todayDate) + 1;
  const todayDay = getDate(todayDate);

  const currentMonth = getMonth(currentDate) + 1;
  const currenDay = getDate(currentDate);

  const selectedMonth = getMonth(selectedDate) + 1;
  const selectedDay = getDate(selectedDate);

  const itemMonth = getMonth(item.value) + 1;
  const itemDay = getDate(item.value);

  const handleClick = () => {
    moveToDay(item.text);
  };

  const isToday = todayDay === itemDay && todayMonth === itemMonth;
  const isCurrentMonth = currentMonth === itemMonth;
  const isCurrent = selectedDay === itemDay && selectedMonth === itemMonth;
  return (
    <button onClick={handleClick}>
      {children({ isToday, isCurrentMonth, isCurrent })}
    </button>
  );
};
