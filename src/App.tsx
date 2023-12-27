import { Flex } from '@chakra-ui/react';

import { Step } from './types';

import { Addons, SelectPlan, Summary, ThankYou, YourInfo } from './steps';
import { ProductOptionsProvider, useStepState } from './contexts';
import { NavigationPanel } from './components';

const App = () => {
  const [currentStep] = useStepState();

  const CurrentStepComponent = StepsComponents[currentStep];

  return (
    <Flex
      as="main"
      flexDir={['column', null, 'row']}
      justify={['flex-start', null, 'center']}
      gap={[0, null, 24]}
      w={['100vw', null, '65vw']}
      minH={['100vh', null, '600px']}
      rounded={[0, null, 16]}
      bg={['gray.100', null, 'white']}
      p={[0, null, 4]}
      pos="relative"
    >
      {currentStep !== 'thankYou' && <NavigationPanel />}

      <Flex
        as="section"
        flexDir="column"
        gap={[5, null, 9]}
        flex={1}
        bg="white"
        top="100px"
        insetX="4"
        pos={['absolute', null, 'static']}
        rounded={[10, null, 0]}
        pl={[6, null, 2]}
        pr={[6, null, 20]}
        pt={[7, null, 9]}
        pb={[7, null, 0]}
        boxShadow={['0px 26px 55px 2px rgba(0,0,0,0.18)', null, 'unset']}
      >
        <ProductOptionsProvider>
          <CurrentStepComponent />
        </ProductOptionsProvider>
      </Flex>
    </Flex>
  );
};

const StepsComponents: Record<Step, () => JSX.Element> = {
  yourInfo: YourInfo,
  selectPlan: SelectPlan,
  addons: Addons,
  summary: Summary,
  thankYou: ThankYou
};

export default App;
