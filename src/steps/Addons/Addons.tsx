import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { ADDONS } from '../../constants';
import { getYearlyCost } from '../../utils/helpers';
import { useEffect } from 'react';

interface AddonsProps {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

export const Addons = ({ formValues, setFormValues }: AddonsProps) => {
  const onAddonClick = (index: number) => {
    const activeAddonsArr: [boolean, boolean, boolean] = [...formValues.activeAddons];

    activeAddonsArr[index] = !activeAddonsArr[index];

    setFormValues({
      ...formValues,
      activeAddons: activeAddonsArr
    });
  };

  useEffect(() => {
    setFormValues({ ...formValues, isValid: !formValues.activeAddons.every(addon => addon === false) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues.activeAddons]);

  return (
    <>
      <Box>
        <Heading as="h1">Pick add-ons</Heading>

        <Text>Add-ons help enhance your gaming experience.</Text>
      </Box>

      <Flex flexDir="column" gap="5">
        {ADDONS.map((addon, index) => (
          <Box
            key={index}
            onClick={() => onAddonClick(index)}
            cursor="pointer"
            userSelect="none"
            borderWidth="1px"
            borderColor="purple"
            borderStyle="solid"
          >
            <Box
              boxSize="5"
              bg={formValues.activeAddons[index] ? 'purple' : 'transparent'}
              borderWidth="1px"
              borderColor={formValues.activeAddons[index] ? 'purple' : 'gray.400'}
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

            <Box>
              {formValues.subscriptionType === 'monthly' ? `$${addon.cost}/mo` : `$${getYearlyCost(addon.cost)}/yr`}
            </Box>
          </Box>
        ))}
      </Flex>
    </>
  );
};
