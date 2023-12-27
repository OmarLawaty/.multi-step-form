import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { useProductOptionsState } from '../contexts/ProductOptionsContext';
import { useStepState } from '../contexts/StepsContext';
import { NavigationButtons, StepHeader } from '../components';
import { PlanKey, Plan } from '../assets/types';
import { plans } from '../assets/static';

export const SelectPlan = () => {
  const [currentProductOptions, setCurrentProductOptions] = useProductOptionsState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCurrentStep] = useStepState();

  const isMonthly = currentProductOptions.subscription === 'monthly';

  return (
    <>
      <StepHeader title="Select your plan" description="You have the option of monthly or yearly billing." />

      <Flex flexDir="column" mt="1" gap={[5, null, 7]}>
        <Flex flexDir={['column', null, 'row']} gap={[3, null, 5]} justify="space-between">
          {plans.map(plan => (
            <PlanCard
              key={plan.key}
              planKey={plan.key}
              cost={plan.cost}
              isMonthly={isMonthly}
              currentSelectedPlan={currentProductOptions.plans.selectedPlan}
              icon={plan.icon}
              title={plan.title}
              freeMonths={plan.freeMonths}
              onPlanClick={() => setCurrentProductOptions({ type: 'update-plan', payload: { selectedPlan: plan.key } })}
            />
          ))}
        </Flex>

        <SubscriptionSwitch
          subscription={currentProductOptions.subscription}
          onSwitchClick={() => setCurrentProductOptions({ type: 'switch-subscription' })}
        />
      </Flex>

      <NavigationButtons
        onNext={() => {
          setCurrentStep({ type: 'go-to-next-step' });
        }}
        onBack={() => {
          setCurrentStep({ type: 'go-back-step' });
        }}
      >
        Next Step
      </NavigationButtons>
    </>
  );
};

interface PlanCardProps extends Omit<Plan, 'key'> {
  planKey: PlanKey;
  currentSelectedPlan: PlanKey;
  isMonthly: boolean;
  onPlanClick: React.MouseEventHandler<HTMLDivElement>;
}

const PlanCard = ({
  planKey,
  currentSelectedPlan,
  title,
  icon,
  cost,
  freeMonths,
  isMonthly,
  onPlanClick
}: PlanCardProps) => (
  <Flex
    flexDir={['row', null, 'column']}
    flex="1"
    gap={[4, null, 10]}
    minH={['75px', null, '160px']}
    borderWidth="2px"
    borderColor={planKey === currentSelectedPlan ? 'purple.800' : 'gray.300'}
    bg={planKey === currentSelectedPlan ? 'gray.100' : 'transparent'}
    rounded="10"
    p={[3.5, null, 3]}
    pt={[3.5, null, 5]}
    cursor="pointer"
    userSelect="none"
    fontSize="md"
    transition="border 0.7s, background 0.7s"
    onClick={onPlanClick}
  >
    <Image src={icon} w="10" h="10" />

    <Box mt="auto">
      <Heading as="h3" textTransform="capitalize" fontSize="inherit" mt="auto" color="blue.900">
        {title}
      </Heading>

      <Text fontSize="sm" mb={[0, null, 1]} fontWeight="500" color="gray.500">
        {isMonthly ? `$${cost.monthly}/mo` : `$${cost.yearly}/yr`}
      </Text>

      {!isMonthly && (
        <Box fontSize="xs" fontWeight="500" color="blue.900">
          {freeMonths} months free
        </Box>
      )}
    </Box>
  </Flex>
);

interface SubscriptionSwitchProps {
  subscription: 'monthly' | 'yearly';
  onSwitchClick: React.MouseEventHandler<HTMLDivElement>;
}

const SubscriptionSwitch = ({ subscription, onSwitchClick }: SubscriptionSwitchProps) => {
  const isMonthly = subscription === 'monthly';

  return (
    <Flex
      align="center"
      justify="center"
      gap="5"
      h="50px"
      bg="gray.100"
      mt="0.5"
      rounded="10"
      fontSize="sm"
      fontWeight="500"
      pr="5"
      onClick={onSwitchClick}
    >
      <Box color={isMonthly ? 'blue.900' : 'gray.500'} fontSize="inherit" fontWeight="inherit" transition="color 0.5s">
        Monthly
      </Box>

      <Box pos="relative" w="10" h="5" rounded="full" bg="blue.900" cursor="pointer">
        <Box
          pos="absolute"
          rounded="full"
          boxSize="3"
          insetY="1"
          left={isMonthly ? 1 : 'calc(100% - 16px)'}
          bg="white"
          transition="left 0.5s"
        ></Box>
      </Box>

      <Box color={!isMonthly ? 'blue.900' : 'gray.500'} fontSize="inherit" fontWeight="inherit" transition="color 0.5s">
        Yearly
      </Box>
    </Flex>
  );
};
