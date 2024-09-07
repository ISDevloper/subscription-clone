import { Children, ReactNode, cloneElement } from "react";
import { Action } from "./actions";
import { CalanderProvider } from "./context";
import { Item } from "./item";
import { Items } from "./items";
import { Picker } from "./picker";

type TCalander = {
  children: ReactNode;
  defaultValue: null | Date;
  isRange: boolean;
};

export const Calander = ({
  children,
  defaultValue,
  isRange,
  ...rest
}: TCalander) => {
  const clonedChild = Children.map(children, (child) =>
    cloneElement(child, { a: "lklk" })
  );

  return (
    <CalanderProvider defaultvalue={defaultValue} isRange={isRange}>
      <div {...rest}>{clonedChild}</div>
    </CalanderProvider>
  );
};

Calander.Picker = Picker;
Calander.Action = Action;
Calander.Items = Items;
Calander.Item = Item;
