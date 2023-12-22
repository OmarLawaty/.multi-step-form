import { Box } from '@chakra-ui/react';

import { DEFAULT_FORM_VALUES, STEPS } from './constants';
import { Addons, SelectPlan, Summary, YourInfo } from './steps';
import { NavigationButtons, NavigationPanel } from './components';
import { useLocalStorage } from './hooks';

const App = () => {
  const [formValues, setFormValues] = useLocalStorage<FormValues>('form-values', DEFAULT_FORM_VALUES);

  return (
    <Box as="main">
      <NavigationPanel currentStepIndex={formValues.activeStepIndex} />

      <Box as="section">
        {STEPS[formValues.activeStepIndex] === 'your_info' ? (
          <YourInfo />
        ) : STEPS[formValues.activeStepIndex] === 'select_plan' ? (
          <SelectPlan />
        ) : STEPS[formValues.activeStepIndex] === 'add-ons' ? (
          <Addons />
        ) : STEPS[formValues.activeStepIndex] ? (
          <Summary />
        ) : null}

        <NavigationButtons formValues={formValues} setFormValues={setFormValues} />
      </Box>
    </Box>
  );
};

export default App;
