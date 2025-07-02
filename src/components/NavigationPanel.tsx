import { Flex, Text } from '@chakra-ui/react';

import { STEPS } from '../constants';
import { transformString } from '../utils/helpers';
import { useStepState } from '../contexts';
import { desktopSideBarBg, mobileSideBarBg } from '../../public';

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
      bgImage={[`url("${mobileSideBarBg}")`, null, `url("${desktopSideBarBg}")`]}
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
              transition="border 0.5s, background 0.5s, color 0.5s"
              fontSize="sm"
            >
              {index + 1}
            </Flex>

            <Flex flexDir="column" display={['none', null, 'flex']}>
              <Text color="gray.500" fontSize="xs" fontWeight="normal">
                step {index + 1}
              </Text>

              <Text>{transformString(step)}</Text>
            </Flex>
          </Flex>
        )
      )}
    </Flex>
  );
};
