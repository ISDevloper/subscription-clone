import { ReactNode, useContext } from "react";
import { CalanderContext } from "./context";

type TActions = {
  children: ReactNode;
  action: "prev" | "next";
};

export const Action = ({ children, action }: TActions) => {
  const { movePrevMonth } = useContext(CalanderContext);
  const { moveNextMonth } = useContext(CalanderContext);
  const handleClick = () => {
    if (action === "next") {
      moveNextMonth();
    } else {
      movePrevMonth();
    }
  };
  return (
    <button className="py-2 bg-black text-white" onClick={handleClick}>
      {children}
    </button>
  );
};
