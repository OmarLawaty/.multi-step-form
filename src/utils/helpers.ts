import { STEPS } from '../constants';

type GetStep = (currentStep: Step, changeInIndex: number) => Step;

export const getStep: GetStep = (currentStep, changeInIndex = 0) => {
  const currentStepIndex = STEPS.indexOf(currentStep);

  if (currentStepIndex === 0 && changeInIndex < 0) return STEPS[0];
  if (currentStepIndex === STEPS.length - 1 && changeInIndex > 0) return STEPS[STEPS.length - 1];

  return STEPS[currentStepIndex + changeInIndex];
};

export const getYearlyCost = (monthlyCost: number): number => {
  const conversionAmount: number = 10;

  return monthlyCost * conversionAmount;
};
