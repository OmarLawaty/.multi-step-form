import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { DEFAULT_FORM_VALUES } from './constants';
import { Addons, SelectPlan, Summary, YourInfo } from './steps';
import { NavigationButtons, NavigationPanel } from './components';

const App = () => {
  const [formValues, setFormValues] = useState<FormValues>(DEFAULT_FORM_VALUES);

  return (
    <Flex as="main" justify="center" gap="10" w="60vw" minH="600px" rounded="24" bg="white" p="5">
      <NavigationPanel currentStep={formValues.currentStep} />

      <Flex as="section" flexDir="column" flex={1}>
        <Box flex={1}>
          {formValues.currentStep === 'your_info' ? (
            <YourInfo formValues={formValues} setFormValues={setFormValues} />
          ) : formValues.currentStep === 'select_plan' ? (
            <SelectPlan formValues={formValues} setFormValues={setFormValues} />
          ) : formValues.currentStep === 'add-ons' ? (
            <Addons formValues={formValues} setFormValues={setFormValues} />
          ) : formValues.currentStep ? (
            <Summary />
          ) : null}
        </Box>

        <NavigationButtons formValues={formValues} setFormValues={setFormValues} />
      </Flex>
    </Flex>
  );
};

export default App;
