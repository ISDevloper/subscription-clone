import {
  addMonths,
  getDay,
  getDaysInMonth,
  setDate,
  startOfMonth,
  subMonths,
} from "date-fns";
import { CalanderContext } from "./context";
import { ReactNode, useContext } from "react";

type TItem = {
  text: number;
  value: Date;
};
type TItemsChildrenProps = {
  items: Array<TItem>;
};
type TItems = {
  children: ({ items }: TItemsChildrenProps) => Array<ReactNode>;
};
export const Items = ({ children, ...rest }: TItems) => {
  const { currentDate } = useContext(CalanderContext);

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayInMonth = startOfMonth(currentDate);
  const weekDay = getDay(firstDayInMonth);
  const previousMonthDate = subMonths(currentDate, 1);
  const dayInPreviousMonth = getDaysInMonth(previousMonthDate);

  const dayOfPrevMonth = Array.from({ length: weekDay - 1 }, (_, i) => {
    const prevMonth = subMonths(currentDate, 1);
    return {
      text: dayInPreviousMonth - i,
      value: setDate(prevMonth, dayInPreviousMonth - i),
    };
  }).reverse();

  const dayOfCurrentMonth = Array.from({ length: daysInMonth }, (_, i) => {
    return {
      text: 1 + i,
      value: setDate(currentDate, 1 + i),
    };
  });

  const daysOfNextMonth = Array.from(
    { length: 35 - (dayOfCurrentMonth.length + dayOfPrevMonth.length) },
    (_, i) => {
      const nextMonth = addMonths(currentDate, 1);
      return {
        text: 1 + i,
        value: setDate(nextMonth, 1 + i),
      };
    }
  );
  const days = [...dayOfPrevMonth, ...dayOfCurrentMonth, ...daysOfNextMonth];

  return <div {...rest}>{children({ items: days })}</div>;
};
