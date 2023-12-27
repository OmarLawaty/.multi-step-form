import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import { useProductOptionsState } from '../contexts/ProductOptionsContext';
import { addons } from '../assets/static';
import { useStepState } from '../contexts/StepsContext';
import { NavigationButtons } from '../components';

export const Addons = () => {
  const [currentProductOptions, setCurrentProductOptions] = useProductOptionsState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCurrentStep] = useStepState();

  const isMonthly = currentProductOptions.subscription === 'monthly';

  return (
    <>
      <Box>
        <Heading as="h1">Pick add-ons</Heading>

        <Text>Add-ons help enhance your gaming experience.</Text>
      </Box>

      <Flex flexDir="column" gap="5">
        {addons.map((addon, index) => (
          <Box
            key={index}
            onClick={() => setCurrentProductOptions({ type: 'update-addon', payload: { selectedAddon: addon.key } })}
            cursor="pointer"
            userSelect="none"
            borderWidth="1px"
            borderColor="purple"
            borderStyle="solid"
          >
            <Box
              boxSize="5"
              bg={currentProductOptions.addons.isAddonSelected(addon.key) ? 'purple' : 'transparent'}
              borderWidth="1px"
              borderColor={currentProductOptions.addons.isAddonSelected(addon.key) ? 'purple' : 'gray.400'}
              rounded="sm"
              p="0.5"
              bgClip="content-box"
            />

            <Box>
              <Heading as="h4" textTransform="capitalize">
                {addon.title.split('-').join(' ')}
              </Heading>

              <Text>{addon.description}</Text>
            </Box>

            <Box>{isMonthly ? `$${addon.cost.monthly}/mo` : `$${addon.cost.yearly}/yr`}</Box>
          </Box>
        ))}
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
