import { Flex, Heading, Image, Text } from '@chakra-ui/react';

import { thankYouIcon } from '../assets/images';

export const ThankYou = () => {
  return (
    <Flex flexDir="column" justify="center" align="center" gap="8" minH="95%" textAlign="center">
      <Image src={thankYouIcon} boxSize={[16, null, 20]} />

      <Flex flexDir="column" gap="4" w={['fit-content', null, '450px']}>
        <Heading color="blue.900" fontSize="3xl" letterSpacing="1px">
          Thank you!
        </Heading>

        <Text color="gray.500" fontSize="md" fontWeight="500" letterSpacing="-0.2px">
          Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support,
          please feel free to email us at support@loremgaming.com.
        </Text>
      </Flex>
    </Flex>
  );
};
