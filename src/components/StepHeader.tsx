import { Flex, Heading, Text } from '@chakra-ui/react';

interface StepHeaderProps {
  title: string;
  description: string;
}

export const StepHeader = ({ title, description }: StepHeaderProps) => (
  <Flex flexDir="column" gap={[2, null, 2.5]}>
    <Heading as="h1" fontSize={[25, null, 32]} color="blue.900">
      {title}
    </Heading>

    <Text fontWeight="400" letterSpacing="-0.2px" color="gray.500" w={['80%', null, '100%']}>
      {description}
    </Text>
  </Flex>
);
