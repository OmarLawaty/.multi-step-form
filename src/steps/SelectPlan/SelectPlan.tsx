import { Box, Flex, FormControl, FormLabel, Heading, Image, Switch, Text } from '@chakra-ui/react';

import { getYearlyCost } from '../../utils/helpers';
import { PLANS } from '../../constants';

interface SelectPlanProps {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

export const SelectPlan = ({ formValues, setFormValues }: SelectPlanProps) => {
  const isMonthly = formValues.subscriptionType === 'monthly';

  return (
    <>
      <Box>
        <Heading as="h1">Select your plan</Heading>

        <Text>You have the option of monthly or yearly billing.</Text>
      </Box>

      <Box>
        <Flex gap="2">
          {PLANS.map(plan => (
            <Box
              key={plan.title}
              borderWidth="1px"
              borderColor={plan.title === formValues.selectedPlan ? 'blue' : 'gray.500'}
              cursor="pointer"
              userSelect="none"
              onClick={() => setFormValues({ ...formValues, selectedPlan: plan.title })}
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
