import { Flex } from '@chakra-ui/react';

import { Step } from './types';

import { Addons, SelectPlan, Summary, ThankYou, YourInfo } from './steps';
import { ProductOptionsProvider, useStepState } from './contexts';
import { NavigationPanel } from './components';

const App = () => {
  const [currentStep] = useStepState();

  const CurrentStepComponent = StepsComponents[currentStep];

  return (
    <Flex as="main" justify="center" gap="10" w="60vw" minH="600px" rounded="24" bg="white" p="5">
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
