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
      justify="center"
      gap={[0, null, 10]}
      w={['100vw', null, '65vw']}
      minH={['100vh', null, '600px']}
      rounded={[0, null, 16]}
      bg={['gray.100', null, 'white']}
      p={[0, null, 4]}
    >
      {currentStep !== 'thankYou' && <NavigationPanel />}

      <Flex as="section" flexDir="column" flex={1}>
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
