// import { getDay, getDaysInMonth } from "date-fns";
// import React, { ReactNode, useState } from "react";

import { ReactNode } from "react";

// type SlicedDate = {
//   day: number;
//   month: number;
//   year: number;
// };

// const structureDate = (date: Date): SlicedDate => {
//   const day = date.getDate();
//   const month = date.getMonth();
//   const year = date.getFullYear();
//   return { year, month, day };
// };

// const getDate = (params: SlicedDate): Date => {
//   const dateParams = Object.values(params) as [number, number, number];
//   return new Date(...dateParams);
// };

// const CalanderContext = React.createContext({});

// const CalanderProvider = ({ children }: any) => {
//   const [currentDate, setCurrentDate] = useState(structureDate(new Date()));

//   const numberDaysInMonth = getDaysInMonth(getDate(currentDate));
//   const firstDayInMonth = getDay(getDate({ ...currentDate, day: 1 }));

//   const moveNextMonth = () => {
//     setCurrentDate((prev) => {
//       return { ...prev, month: prev.month + 1 };
//     });
//   };

//   const movePrevMonth = () => {
//     setCurrentDate((prev) => {
//       return { ...prev, month: prev.month - 1 };
//     });
//   };

//   const moveToDay = (day: number) => {
//     setCurrentDate((prev) => {
//       return { ...prev, day: day };
//     });
//   };
//   return (
//     <CalanderContext.Provider
//       value={{
//         currentDate,
//         numberDaysInMonth,
//         firstDayInMonth,
//         moveNextMonth,
//         movePrevMonth,
//         moveToDay,
//       }}
//     >
//       {children}
//     </CalanderContext.Provider>
//   );
// };

// export const useCalander = () => {
//   const [currentDate, setCurrentDate] = useState(structureDate(new Date()));

//   const daysInMonth = getDaysInMonth(getDate(currentDate));
//   const firstDay = getDay(getDate({ ...currentDate, day: 1 }));

//   const moveNextMonth = () => {
//     setCurrentDate((prev) => {
//       return { ...prev, month: prev.month + 1 };
//     });
//   };

//   const movePrevMonth = () => {
//     setCurrentDate((prev) => {
//       return { ...prev, month: prev.month - 1 };
//     });
//   };

//   const moveToDay = (day: number) => {
//     setCurrentDate((prev) => {
//       return { ...prev, day: day };
//     });
//   };

//   return {
//     currentDate,
//     daysInMonth,
//     firstDay,
//     moveNextMonth,
//     movePrevMonth,
//     moveToDay,
//   };
// };

// export const Calander = () => {
//   const { currentDate, firstDay, daysInMonth, moveNextMonth, movePrevMonth } =
//     useCalander();
//   const date = getDate(currentDate);
//   const longMonth = date.toLocaleString("en-us", {
//     month: "long",
//     day: "2-digit",
//   });

//   const calanderValues = Array.from(
//     { length: 35 },
//     (_, index) => index + 1
//   ).map((day) => {
//     if (day >= firstDay && day - firstDay + 1 <= daysInMonth) {
//       return day;
//     } else {
//       return "-";
//     }
//   });

//   const chunk = (arr, size) =>
//     Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
//       arr.slice(i * size, i * size + size)
//     );

//   const chunkedArray = chunk(calanderValues, 7);
//   return (
//     <div className="relative">
//       <table>
//         {chunkedArray.map((arrayChunk) => {
//           return (
//             <tr className="flex">
//               {arrayChunk.map((chunk: number) => {
//                 return (
//                   <td
//                     className={vclsx(
//                       "w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center"
//                     )}
//                   >
//                     <span>{chunk}</span>
//                   </td>
//                 );
//               })}
//             </tr>
//           );
//         })}
//       </table>

//       <div className="flex items-center gap-x-4">
//         <button className="py-2 bg-black text-white" onClick={movePrevMonth}>
//           move prev month
//         </button>
//         <div>{longMonth}</div>
//         <button className="py-2 bg-black text-white" onClick={moveNextMonth}>
//           move next month
//         </button>
//       </div>A
//     </div>
//   );
// };

type TNonRangeChildren = ({ isSelected }: { isSelected: true }) => ReactNode;
type TRangeChildren = ({
  isSelected,
  isRange,
}: {
  isSelected: boolean;
  isRange: boolean;
}) => ReactNode;

type TTestComponentProps<T extends boolean> = {
  isRange: T;
  children: T extends true ? TRangeChildren : TNonRangeChildren;
};

export const TestComponent = <T extends boolean>({
  isRange,
  children,
  ...rest
}: TTestComponentProps<T>) => {
  const isSelected = true;
  return (
    <div {...rest}>
      {isRange
        ? (children as TRangeChildren)({ isSelected, isRange })
        : (children as TNonRangeChildren)({ isSelected })}
    </div>
  );
};
