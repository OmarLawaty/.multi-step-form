import { Box, Flex, Text } from '@chakra-ui/react';

import { STEPS } from '../../constants';
import { camelCaseToNormal } from '../../utils/helpers';
import { useStepState } from '../../contexts';

export const NavigationPanel = () => {
  const [currentStep] = useStepState();

  return (
    <Box as="article" minW="15vw">
      {STEPS.map((step, index) =>
        step === 'thankYou' ? null : (
          <Flex key={index}>
            <Flex
              align="center"
              justify="center"
              w="16"
              h="16"
              rounded="full"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="gray.300"
              bg={currentStep === step ? 'gray.500' : 'transparent'}
            >
              {index + 1}
            </Flex>

            <Flex flexDir="column">
              <Text>step {index + 1}</Text>

              <Text>{camelCaseToNormal(step)}</Text>
            </Flex>
          </Flex>
        )
      )}
    </Box>
  );
};
