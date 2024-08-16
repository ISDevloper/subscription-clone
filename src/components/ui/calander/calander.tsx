import { ReactNode } from "react";
import { Action } from "./actions";
import { CalanderProvider } from "./context";
import { Item } from "./item";
import { Items } from "./items";
import { Picker } from "./picker";

export const Calander = ({
  children,
  defaultValue,
  ...rest
}: {
  children: ReactNode;
  defaultValue: null | Date;
}) => {
  return (
    <CalanderProvider defaultvalue={defaultValue}>
      <div {...rest}>{children}</div>
    </CalanderProvider>
  );
};

Calander.Picker = Picker;
Calander.Action = Action;
Calander.Items = Items;
Calander.Item = Item;
