import { Children } from "react";
import { CalanderProvider } from "./context";

export const Calander = ({ children, ...rest }: any) => {
  const subComponentList = Object.keys(Calander);
  const subComponents = subComponentList.map((key) => {
    return Children.map(children, (child: JSX.Element) =>
      child?.type?.name === key ? child : null
    );
  });

  return (
    <CalanderProvider>
      <div {...rest}>{subComponents.map((component) => component)}</div>
    </CalanderProvider>
  );
};
