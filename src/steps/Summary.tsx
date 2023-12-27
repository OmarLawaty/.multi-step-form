import { Divider, Flex, Text } from '@chakra-ui/react';

import { useProductOptionsState, useStepState } from '../contexts';
import { NavigationButtons, StepHeader } from '../components';
import { Plan } from '../assets/types';
import { transformString } from '../utils/helpers';

export const Summary = () => {
  const [currentProductOptions, setCurrentProductOptions] = useProductOptionsState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCurrentStep] = useStepState();

  const isMonthly = currentProductOptions.subscription === 'monthly';

  return (
    <>
      <StepHeader title="Finishing up" description="Double-check everything looks OK before confirming." />

      <Flex flexDir="column" gap={[4, null, 6]}>
        <Flex flexDir="column" bg="gray.50" rounded="10" py="5" pl={[4, null, 5]} pr={[4, null, 7]}>
          <CurrentPlanInfo
            currentPlan={currentProductOptions.plans.getPlan()}
            subscription={currentProductOptions.subscription}
            isMonthly={isMonthly}
            onPlanChange={() => setCurrentStep({ type: 'set-step', payload: { selectedStep: 'selectPlan' } })}
          />

          {!!currentProductOptions.addons.selectedAddons.length && <Divider mt={[3, null, 6]} mb={[3, null, 4]} />}

          <Flex flexDir="column" gap={[3, null, 4]}>
            {currentProductOptions.addons.selectedAddons.map(addonKey => {
              const addon = currentProductOptions.addons.getAddon(addonKey);

              return (
                <Flex key={addon.key}>
                  <Text color="gray.500" fontWeight="500" fontSize="sm">
                    {transformString(addon.title)}
                  </Text>

                  <Text ml="auto" color="blue.900" fontWeight="400" fontSize="sm">
                    +${isMonthly ? `${addon.cost.monthly}/mo` : `${addon.cost.yearly}/yr`}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
        </Flex>

        <Flex pl={[4, null, 5]} pr={[4, null, 7]} align="center">
          <Text color="gray.500" fontWeight="500" fontSize="sm">
            Total (per {isMonthly ? 'month' : 'year'})
          </Text>

          <Text ml="auto" color="purple.800" fontSize={['md', null, 'xl']}>
            +$
            {`${currentProductOptions.getTotalCost()}/${isMonthly ? 'mo' : 'yr'}`}
          </Text>
        </Flex>
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

interface CurrentPlanInfoProps {
  currentPlan: Plan;
  subscription: 'monthly' | 'yearly';
  isMonthly: boolean;
  onPlanChange: React.MouseEventHandler<HTMLParagraphElement>;
}

const CurrentPlanInfo = ({ currentPlan, subscription, onPlanChange, isMonthly }: CurrentPlanInfoProps) => (
  <Flex align="center" color="blue.900">
    <Flex flexDir="column">
      <Text textTransform="capitalize" fontSize={['sm', null, 'md']} lineHeight={['1.2', null, 'normal']}>
        {currentPlan.title}

        <Text as="span"> ({transformString(subscription)})</Text>
      </Text>

      <Text
        color="gray.500"
        w="fit-content"
        fontWeight="500"
        fontSize="sm"
        cursor="pointer"
        textDecor="underline"
        _hover={{
          color: 'gray.600'
        }}
        transition="color 0.5s"
        onClick={onPlanChange}
      >
        Change
      </Text>
    </Flex>

    <Text ml="auto" fontSize={['sm', null, 'md']}>
      {isMonthly ? `$${currentPlan.cost.monthly}/mo` : `$${currentPlan.cost.yearly}/yr`}
    </Text>
  </Flex>
);
