import { createContext, useEffect, useRef, useState } from "react";
import {
  StepperContextType,
  StepperProviderType,
  TCallbackHandler,
  TEventType,
  TlistnerType,
} from "./types";
import { registerListner } from "./utils";
import { EventTypeEnum } from "./constants";

const StepperContextInitialState = {
  activeStep: 0,
  moveNext: () => {},
  movePrev: () => {},
  moveTo: () => {},
  itemsCount: 0,
  setItemsCount: () => {},
};

export const StepperContext = createContext<StepperContextType>(
  StepperContextInitialState
);

export const StepperProvider = ({
  currentStep,
  children,
  setApi,
}: StepperProviderType) => {
  const [activeStep, setActiveStep] = useState<number>(currentStep || 0);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const listners = useRef<TlistnerType>({});

  const moveNext = () => {
    setActiveStep((prev: number) => {
      const activeStep = prev + 1;
      notify(EventTypeEnum.NEXT, activeStep);
      return activeStep;
    });
  };

  const movePrev = () => {
    setActiveStep((prev: number) => {
      const activeStep = prev - 1;
      notify(EventTypeEnum.NEXT, activeStep);
      return activeStep;
    });
  };

  const moveTo = (index: number) => {
    notify(EventTypeEnum.MOVE, activeStep);
    setActiveStep(index);
  };

  const on = (event: string, callBack: TCallbackHandler) => {
    registerListner(event, callBack, listners.current);
  };

  const notify = (event: TEventType, value: number) => {
    listners.current[event].forEach((l: TCallbackHandler) => {
      l(value);
    });
  };

  useEffect(() => {
    if (setApi) {
      setApi({
        on: on,
        moveNext: moveNext,
        movePrev: movePrev,
        moveTo: moveTo,
      });
    }
  }, []);

  return (
    <StepperContext.Provider
      value={{
        activeStep,
        moveNext,
        movePrev,
        moveTo,
        itemsCount,
        setItemsCount,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};
