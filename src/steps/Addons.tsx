import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { useProductOptionsState } from '../contexts/ProductOptionsContext';
import { addons } from '../assets/static';
import { useStepState } from '../contexts/StepsContext';
import { NavigationButtons, StepHeader } from '../components';
import { Addon } from '../assets/types';
import { checkMarkIcon } from '../assets/images';

export const Addons = () => {
  const [currentProductOptions, setCurrentProductOptions] = useProductOptionsState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCurrentStep] = useStepState();

  const isMonthly = currentProductOptions.subscription === 'monthly';

  return (
    <>
      <StepHeader title="Pick add-ons" description="Add-ons help enhance your gaming experience." />

      <Flex flexDir="column" gap={[3, null, 4]} mt="1">
        {addons.map(addon => (
          <AddonCard
            key={addon.key}
            title={addon.title}
            description={addon.description}
            cost={addon.cost}
            isMonthly={isMonthly}
            isAddonSelected={currentProductOptions.addons.isAddonSelected(addon.key)}
            onPlanClick={() =>
              setCurrentProductOptions({ type: 'update-addon', payload: { selectedAddon: addon.key } })
            }
          />
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

interface AddonCardProps extends Omit<Addon, 'key'> {
  isAddonSelected: boolean;
  isMonthly: boolean;
  onPlanClick: React.MouseEventHandler<HTMLDivElement>;
}

const AddonCard = ({ isAddonSelected, title, description, cost, isMonthly, onPlanClick }: AddonCardProps) => (
  <Flex
    minH={['62px', null, '80px']}
    align="center"
    gap={[4, null, 6]}
    px={[3.5, null, 5]}
    borderWidth="1px"
    borderColor={isAddonSelected ? 'purple.800' : 'gray.300'}
    bg={isAddonSelected ? 'gray.100' : 'transparent'}
    rounded="10"
    cursor="pointer"
    userSelect="none"
    transition="border 0.7s, background 0.7s"
    _hover={{
      borderColor: 'purple.800',
      bg: 'gray.100'
    }}
    onClick={onPlanClick}
  >
    <Flex
      align="center"
      justify="center"
      rounded="5"
      boxSize="5"
      bg={isAddonSelected ? 'purple.800' : 'transparent'}
      borderWidth="1px"
      borderColor={isAddonSelected ? 'purple.800' : 'gray.400'}
      transition="border 0.5s, background 0.5s"
    >
      <Image src={checkMarkIcon} />
    </Flex>

    <Box>
      <Heading as="h4" textTransform="capitalize" fontSize={['sm', null, 'md']} mt="auto" color="blue.900">
        {title}
      </Heading>

      <Text fontSize={['xs', null, 'sm']} fontWeight="500" color="gray.500">
        {description}
      </Text>
    </Box>

    <Box ml="auto" fontSize={['xs', null, 'sm']} fontWeight="500" color="purple.800">
      +{isMonthly ? `$${cost.monthly}/mo` : `$${cost.yearly}/yr`}
    </Box>
  </Flex>
);
