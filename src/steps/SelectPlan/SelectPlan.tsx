import { Box, Flex, FormControl, FormLabel, Heading, Image, Switch, Text } from '@chakra-ui/react';

import { arcadeIcon, controllerIcon, gamePadIcon } from '../../assets/images';
import { getYearlyCost } from '../../utils/helpers';

interface SelectPlanProps {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

interface Plan {
  title: string;
  cost: number;
  icon: string;
  freeMonths?: number;
}

const PLANS: Plan[] = [
  { title: 'Arcade', cost: 9, icon: arcadeIcon, freeMonths: 2 },
  { title: 'Advanced', cost: 12, icon: gamePadIcon, freeMonths: 2 },
  { title: 'Pro', cost: 15, icon: controllerIcon, freeMonths: 2 }
];

export const SelectPlan = ({ formValues, setFormValues }: SelectPlanProps) => {
  const isMonthly = formValues.subscriptionType === 'monthly';

  return (
    <>
      <Box>
        <Heading as="h1">Select your plan</Heading>

        <Text>You have the option of monthly or yearly billing.</Text>
      </Box>

      <Box>
        <Flex>
          {PLANS.map((plan, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderColor={index === formValues.selectedPlan ? 'blue' : 'gray.500'}
              cursor="pointer"
              userSelect="none"
              onClick={() => setFormValues({ ...formValues, selectedPlan: index as 0 | 1 | 2 })}
            >
              <Image src={plan.icon} />

              <Heading as="h3">{plan.title}</Heading>
              <Text>{isMonthly ? `$${plan.cost}/mo` : `$${getYearlyCost(plan.cost)}/yr`}</Text>

              {!isMonthly && `${plan.freeMonths} months free`}
            </Box>
          ))}
        </Flex>

        <Box>
          <Text as="span">Monthly</Text>

          <FormControl>
            <FormLabel htmlFor="subscription-type">Monthly</FormLabel>

            <Switch
              id="subscription-type"
              isChecked={!isMonthly}
              onChange={() => setFormValues({ ...formValues, subscriptionType: isMonthly ? 'yearly' : 'monthly' })}
            />

            <FormLabel htmlFor="subscription-type">Yearly</FormLabel>
          </FormControl>

          <Text as="span">Yearly</Text>
        </Box>
      </Box>
    </>
  );
};
