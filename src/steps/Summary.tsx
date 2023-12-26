import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import { useProductOptionsState, useStepState } from '../contexts';
import { NavigationButtons } from '../components';

export const Summary = () => {
  const [currentProductOptions, setCurrentProductOptions] = useProductOptionsState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCurrentStep] = useStepState();

  const isMonthly = currentProductOptions.subscription === 'monthly';

  const renderSelectedPlan = () => {
    const currentPlan = currentProductOptions.plans.getPlan();

    return (
      <>
        <Flex>
          <Text textTransform="capitalize">
            {currentPlan.title}

            <Text as="span">({currentProductOptions.subscription})</Text>
          </Text>

          <Text
            cursor="pointer"
            textDecor="underline"
            onClick={() => setCurrentStep({ type: 'set-step', payload: { selectedStep: 'selectPlan' } })}
          >
            Change
          </Text>
        </Flex>

        <Text>{isMonthly ? `$${currentPlan.cost.monthly}/mo` : `$${currentPlan.cost.yearly}/yr`}</Text>
      </>
    );
  };

  return (
    <>
      <Box>
        <Heading as="h1">Finishing up</Heading>

        <Text>Double-check everything looks OK before confirming.</Text>
      </Box>

      <Flex>{renderSelectedPlan()}</Flex>

      <Flex flexDir="column">
        {currentProductOptions.addons.selectedAddons.map(addonKey => {
          const addon = currentProductOptions.addons.getAddon(addonKey);

          return (
            <Flex key={addon.key}>
              <Text>{addon.title}</Text>

              <Text>+${isMonthly ? `${addon.cost.monthly}/mo` : `${addon.cost.yearly}/yr`}</Text>
            </Flex>
          );
        })}
      </Flex>

      <Flex>
        <Text>Total (per {isMonthly ? 'month' : 'year'})</Text>

        <Text>
          +$
          {`${currentProductOptions.getTotalCost()}/${isMonthly ? 'mo' : 'yr'}`}
        </Text>
      </Flex>

      <NavigationButtons
        onNext={() => {
          // Data to be sent to backend
          console.log(currentProductOptions.getAllDataObject());
          setCurrentProductOptions({ type: 'reset-options' });
          setCurrentStep({ type: 'go-to-next-step' });
        }}
        onBack={() => {
          setCurrentStep({ type: 'go-back-step' });
        }}
      >
        Confirm
      </NavigationButtons>
    </>
  );
};
