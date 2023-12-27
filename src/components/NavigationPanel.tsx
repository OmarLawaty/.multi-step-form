import { Flex, Text } from '@chakra-ui/react';

import { STEPS } from '../constants';
import { camelCaseToNormal } from '../utils/helpers';
import { useStepState } from '../contexts';
import { desktopSideBarBg, mobileSideBarBg } from '../assets/images';

export const NavigationPanel = () => {
  const [currentStep] = useStepState();

  return (
    <Flex
      as="article"
      minW={[null, null, '270px']}
      h={['30vh', null, 'auto']}
      flexDir={['row', null, 'column']}
      align={['flex-start', null, 'center']}
      justify={['center', null, 'flex-start']}
      gap={[4, null, 6]}
      bgImage={[mobileSideBarBg, null, desktopSideBarBg]}
      bgRepeat="no-repeat"
      bgSize="100%"
      px={[null, null, 7]}
      py={[8, null, 9]}
    >
      {STEPS.map((step, index) =>
        step === 'thankYou' ? null : (
          <Flex
            key={index}
            align="center"
            gap="3.5"
            textTransform="uppercase"
            color="white"
            w={['fit-content', null, '100%']}
          >
            <Flex
              align="center"
              justify="center"
              w={[8, null, 9]}
              h={[8, null, 9]}
              rounded="full"
              borderWidth="1px"
              borderStyle="solid"
              borderColor={currentStep === step ? 'blue.200' : 'gray.100'}
              bg={currentStep === step ? 'blue.200' : 'transparent'}
              color={currentStep === step ? 'blue.900' : 'white'}
              fontSize="sm"
            >
              {index + 1}
            </Flex>

            <Flex flexDir="column" display={['none', null, 'flex']}>
              <Text color="gray.500" fontSize="xs" fontWeight="normal">
                step {index + 1}
              </Text>

              <Text>{camelCaseToNormal(step)}</Text>
            </Flex>
          </Flex>
        )
      )}
    </Flex>
  );
};
