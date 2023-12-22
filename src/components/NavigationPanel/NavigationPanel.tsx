import { Box, Text } from '@chakra-ui/react';

import { STEPS } from '../../constants';

interface NavigationPanelProps {
  currentStepIndex: number;
}

export const NavigationPanel = ({ currentStepIndex }: NavigationPanelProps) => {
  return (
    <Box as="article">
      {STEPS.map((step, index) => (
        <Box key={index} border={currentStepIndex === index ? '1px solid' : 'transparent'}>
          <Box>{index + 1}</Box>

          <Box>
            <Text>step {index + 1}</Text>

            <Text>{step.split('_').join(' ')}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
