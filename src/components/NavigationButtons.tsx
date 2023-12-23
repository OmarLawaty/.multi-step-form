import { Button, Flex } from '@chakra-ui/react';

import { STEPS } from '../constants';
import { getStep } from '../utils/helpers';

interface NavigationButtonsProps {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

export const NavigationButtons = ({ formValues, setFormValues }: NavigationButtonsProps) => {
  return (
    <Flex mt="auto">
      {STEPS.indexOf(formValues.currentStep) > 0 ? (
        <Button
          onClick={() =>
            setFormValues({ ...formValues, isValid: true, currentStep: getStep(formValues.currentStep, -1) })
          }
        >
          Go Back
        </Button>
      ) : null}

      <Button
        ml="auto"
        onClick={() =>
          setFormValues({
            ...formValues,
            currentStep:
              STEPS.indexOf(formValues.currentStep) < STEPS.length - 1
                ? getStep(formValues.currentStep, 1)
                : formValues.currentStep
          })
        }
        _disabled={{ cursor: 'not-allowed' }}
        isDisabled={!formValues.isValid}
      >
        {STEPS.indexOf(formValues.currentStep) < STEPS.length - 1 ? 'Next Step' : 'Confirm'}
      </Button>
    </Flex>
  );
};
