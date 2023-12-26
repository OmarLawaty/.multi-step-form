import { Box, Flex, FormControl, FormLabel, Heading, Image, Switch, Text } from '@chakra-ui/react';

import { useProductOptionsState } from '../contexts/ProductOptionsContext';
import { useStepState } from '../contexts/StepsContext';
import { plans } from '../assets/static';
import { NavigationButtons } from '../components';

export const SelectPlan = () => {
  const [currentProductOptions, setCurrentProductOptions] = useProductOptionsState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCurrentStep] = useStepState();

  const isMonthly = currentProductOptions.subscription === 'monthly';

  return (
    <>
      <Box>
        <Heading as="h1">Select your plan</Heading>

        <Text>You have the option of monthly or yearly billing.</Text>
      </Box>

      <Box>
        <Flex gap="2">
          {plans.map(plan => (
            <Box
              key={plan.key}
              borderWidth="1px"
              borderColor={plan.key === currentProductOptions.plans.selectedPlan ? 'blue' : 'gray.500'}
              cursor="pointer"
              userSelect="none"
              onClick={() => setCurrentProductOptions({ type: 'update-plan', payload: { selectedPlan: plan.key } })}
            >
              <Image src={plan.icon} />

              <Heading as="h3">{plan.title}</Heading>
              <Text>{isMonthly ? `$${plan.cost.monthly}/mo` : `$${plan.cost.yearly}/yr`}</Text>

              {!isMonthly && `${plan.freeMonths} months free`}
            </Box>
          ))}
        </Flex>

        <Box>
          <FormControl>
            <FormLabel htmlFor="subscription-type">Monthly</FormLabel>

            <Switch
              id="subscription-type"
              isChecked={!isMonthly}
              onChange={() => setCurrentProductOptions({ type: 'switch-subscription' })}
            />

            <FormLabel htmlFor="subscription-type">Yearly</FormLabel>
          </FormControl>
        </Box>
      </Box>

      <NavigationButtons
        onNext={() => {
          setCurrentStep({ type: 'go-to-next-step' });
        }}
        onBack={() => {
          setCurrentStep({ type: 'go-back-step' });
        }}
      >
        Next
      </NavigationButtons>
    </>
  );
};
