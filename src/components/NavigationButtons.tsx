import { Button, Flex } from '@chakra-ui/react';

import { STEPS } from '../constants';

interface NavigationButtonsProps {
  formValues: FormValues;
  setFormValues: React.Dispatch<FormValues>;
}

export const NavigationButtons = ({ formValues, setFormValues }: NavigationButtonsProps) => (
  <Flex>
    {formValues.activeStepIndex > 0 ? (
      <Button onClick={() => setFormValues({ ...formValues, activeStepIndex: formValues.activeStepIndex - 1 })}>
        Go Back
      </Button>
    ) : null}

    <Button
      onClick={() =>
        setFormValues({
          ...formValues,
          activeStepIndex:
            formValues.activeStepIndex < STEPS.length - 1 ? formValues.activeStepIndex + 1 : formValues.activeStepIndex
        })
      }
      disabled={formValues.error.name || formValues.error.email || formValues.error.phoneNumber}
    >
      {formValues.activeStepIndex < STEPS.length - 1 ? 'Next Step' : 'Confirm'}
    </Button>
  </Flex>
);
