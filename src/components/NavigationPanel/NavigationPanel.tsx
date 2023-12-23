import { Box, Flex, Text } from '@chakra-ui/react';

import { STEPS } from '../../constants';

interface NavigationPanelProps {
  currentStep: Step;
}

export const NavigationPanel = ({ currentStep }: NavigationPanelProps) => {
  return (
    <Box as="article" minW="15vw">
      {STEPS.map((step, index) => (
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

            <Text>{step.split('_').join(' ')}</Text>
          </Flex>
        </Flex>
      ))}
    </Box>
  );
};
