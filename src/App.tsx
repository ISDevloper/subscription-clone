import { Button } from "./components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import Form from "./components/form";
import { TSelectField } from "./components/form/selectField";
import { ReactNode, useEffect, useState } from "react";
import { Stepper, TStepperApi } from "./components/ui/stepper";
import { vclsx } from "./lib/utils";
import { EventTypeEnum } from "./components/ui/stepper/constants";
import { useGetWidth } from "./utils/getWith";
import { Calander, TestComponent } from "./components/ui/calander";

const selectOptions: Array<TSelectField> = [
  { label: "label", value: "value1" },
  { label: "label", value: "value2" },
  { label: "label", value: "value3" },
];

const PersonalInfoStep = () => {
  return (
    <>
      <Form.Input name="firstName" label="First Name" />
      <Form.Input name="lastName" label="Last Name" />
      <Form.Select
        name="gender"
        label="Gender"
        placeholder="Please select an option"
        options={selectOptions}
      />
    </>
  );
};

const PayementStep = () => {
  return (
    <>
      <Form.Input name="cardNumber" label="Card number" />
      <Form.Input name="expDate" label="Exp Date" />
    </>
  );
};

const ShippingStep = () => {
  return (
    <>
      <Form.Input name="city" label="City" />
      <Form.Input name="address" label="Address" />
    </>
  );
};

enum StepsEnum {
  PERSONAL = "PERSONAL",
  PAYEMENT = "PAYEMENT",
  SHIPPING = "SHIPPING",
}

type TStep = {
  stepName: string;
  validation?: Array<string>;
  component: ReactNode;
};
type TSteps = {
  [k in string]: TStep;
};

const steps: TSteps = {
  [StepsEnum.PERSONAL]: {
    stepName: "Personal info",
    validation: ["firstName", "lastName", "gender"],
    component: <PersonalInfoStep />,
  },
  [StepsEnum.PAYEMENT]: {
    stepName: "Payement",
    validation: ["cardNumber", "expDate"],
    component: <PayementStep />,
  },
  [StepsEnum.SHIPPING]: {
    stepName: "Shipping",
    validation: ["city", "address"],
    component: <ShippingStep />,
  },
};

type TFormData = {
  firstName: string;
  lastName: string;
  gender: string;
  cardNumber: string;
  expDate: string;
  city: string;
  address: string;
};

const validations = z.object({
  firstName: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
  lastName: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
  gender: z.string(),
  cardNumber: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
  expDate: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
  city: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
  address: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
});

const Step = ({ step }: { step: TStep }) => {
  return <div>{step.component}</div>;
};

function App() {
  const [api, setApi] = useState<TStepperApi>();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const methods = useForm({
    resolver: zodResolver(validations),
    mode: "onChange",
  });

  const {
    trigger,
    formState: { errors },
  } = methods;

  console.log(errors);

  const onSubmit = (data: TFormData) => {
    console.log(data);
  };

  const handleNext = async () => {
    const fields = steps[Object.keys(steps)[currentStep]].validation;
    const isValid = await trigger(fields);
    if (isValid) {
      api?.moveNext();
    }
  };

  const handleMoveTo = async (index: number) => {
    const fields = steps[Object.keys(steps)[currentStep]].validation;
    let isValid = true;
    if (index > currentStep) {
      isValid = await trigger(fields);
    }
    if (isValid) api?.moveTo(index);
  };

  useEffect(() => {
    if (api) {
      api.on(EventTypeEnum.NEXT, (activeStep) => {
        setCurrentStep(activeStep);
      });
      api.on(EventTypeEnum.PREVIOUS, (activeStep) => {
        setCurrentStep(activeStep);
      });
      api.on(EventTypeEnum.MOVE, (activeStep) => {
        setCurrentStep(activeStep);
      });
    }
  }, [api]);
  return (
    <div className="w-1/3 py-12 mx-auto">
      <TestComponent className="text-red-500">
        {({ isSelected }) => (
          <div>
            <p>{isSelected}</p>
          </div>
        )}
      </TestComponent>
      {/* <Calander /> */}
      <Form onSubmit={onSubmit} {...methods}>
        <Stepper setApi={setApi} currentStep={0}>
          <Stepper.Indicators className="flex">
            {Object.keys(steps).map((key, index) => {
              return (
                <Stepper.Indicator
                  key={index}
                  onClick={() => {
                    handleMoveTo(index);
                  }}
                >
                  {({ activeStep, handleClick }) => {
                    return (
                      <div
                        onClick={handleClick}
                        className={vclsx(
                          "px-6 py-3 flex-1 flex items-center justify-center border",
                          activeStep === index
                            ? "border-red-500"
                            : "border-gray-100"
                        )}
                      >
                        <span>{steps[key].stepName}</span>
                      </div>
                    );
                  }}
                </Stepper.Indicator>
              );
            })}
          </Stepper.Indicators>
          <Stepper.StepList className="py-6">
            {Object.keys(steps).map((key) => (
              <Stepper.Step key={key}>
                <Step step={steps[key]} />
              </Stepper.Step>
            ))}
          </Stepper.StepList>
          <Stepper.Actions className="flex justify-between">
            <Stepper.Previous type="button">
              <Button>Previous</Button>
            </Stepper.Previous>
            <Stepper.Next type="button" onClick={handleNext}>
              <Button>Next</Button>
            </Stepper.Next>
            <Stepper.Last type="submit">
              <Button>Submit</Button>
            </Stepper.Last>
          </Stepper.Actions>
        </Stepper>
      </Form>
    </div>
  );
}

export default App;
