import { ReactNode, createContext, useContext, useReducer } from 'react';

import { STEPS } from '../constants';
import { Step } from '../types';

type Action =
  | {
      type: 'go-to-next-step';
    }
  | {
      type: 'go-back-step';
    };

const StepsContext = createContext<Step>(STEPS[0]);
const StepsDispatcherContext = createContext<React.Dispatch<Action>>(null as unknown as React.Dispatch<Action>);

export const StepsProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, dispatch] = useReducer(stepReducer, STEPS[0]);

  return (
    <StepsDispatcherContext.Provider value={dispatch}>
      <StepsContext.Provider value={currentStep}>{children}</StepsContext.Provider>
    </StepsDispatcherContext.Provider>
  );
};

const stepReducer = (currentStep: Step, action: Action): Step => {
  switch (action.type) {
    case 'go-to-next-step':
      return getStep(currentStep, 1);

    case 'go-back-step':
      return getStep(currentStep, -1);
  }
};

type StepState = () => [Step, React.Dispatch<Action>];

export const useStepState: StepState = () => [useContext(StepsContext), useContext(StepsDispatcherContext)];

const getStep = (currentStep: Step, changeInIndex = 0) => {
  const currentStepIndex = STEPS.indexOf(currentStep);

  if (currentStepIndex === 0 && changeInIndex < 0) return STEPS[0];
  if (currentStepIndex === STEPS.length - 1 && changeInIndex > 0) return STEPS[STEPS.length - 1];

  return STEPS[currentStepIndex + changeInIndex];
};
