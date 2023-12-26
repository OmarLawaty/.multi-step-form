import { Box, Flex, Heading, Input, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { NavigationButtons } from '../components/index.ts';
import { useStepState } from '../contexts/StepsContext.tsx';
import { useProductOptionsState } from '../contexts/ProductOptionsContext.tsx';

interface ErrorMessages {
  name: string;
  email: string;
  phoneNumber: string;
}

const defaultErrorMessages: ErrorMessages = { name: '', email: '', phoneNumber: '' };

export const YourInfo = () => {
  const [error, setError] = useState(defaultErrorMessages);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentProductOptions, setCurrentProductOptions] = useProductOptionsState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCurrentStep] = useStepState();

  const [inputValues, setInputValues] = useState(currentProductOptions.userData);

  const ValidateInput = () => {
    const errorValues = defaultErrorMessages;

    const validEmailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isEmailCorrect = validEmailRegex.test(inputValues.email);
    if (!isEmailCorrect) errorValues.email = 'Enter a valid email address';

    const isNameEmpty = inputValues.name === '';
    if (isNameEmpty) errorValues.name = 'This field is required';

    const isEmailEmpty = inputValues.email === '';
    if (isEmailEmpty) errorValues.email = 'This field is required';

    const isPhoneNumberEmpty = inputValues.phoneNumber === '';
    if (isPhoneNumberEmpty) errorValues.phoneNumber = 'This field is required';

    const isAllInputsValid = !isNameEmpty && !isEmailEmpty && !isPhoneNumberEmpty && isEmailCorrect;
    if (isAllInputsValid) {
      setCurrentProductOptions({
        type: 'update-user-data',
        payload: inputValues
      });

      setCurrentStep({ type: 'go-to-next-step' });
    }

    setError({ ...errorValues });
  };

  return (
    <>
      <Flex flexDir="column" gap={[2, null, 2.5]}>
        <Heading as="h1" fontSize={[25, null, 32]} color="blue.900">
          Personal info
        </Heading>

        <Text fontWeight="400" letterSpacing="-0.2px" color="gray.500" w={['80%', null, '100%']}>
          Please provide your name, email address, and phone number.
        </Text>
      </Flex>

      <Flex flexDir="column" gap={[3.5, null, 5]}>
        <Flex flexDir="column" gap={[0.5, null, 2]}>
          <Flex>
            <Box as="label" htmlFor="name" color="blue.900" fontWeight="500" fontSize={['xs', null, 'small']}>
              Name
            </Box>

            <Box ml="auto" color="red.600" fontSize={['xs', null, 'small']} letterSpacing="0.5px">
              {error.name}
            </Box>
          </Flex>

          <Input
            id="name"
            type="text"
            placeholder="Your name"
            fontWeight="500"
            h={['40px', null, '50px']}
            value={inputValues.name}
            onChange={e => setInputValues({ ...inputValues, name: e.target.value })}
          />
        </Flex>

        <Flex flexDir="column" gap={[0.5, null, 2]}>
          <Flex>
            <Box as="label" htmlFor="email" color="blue.900" fontWeight="500" fontSize={['xs', null, 'small']}>
              Email Address
            </Box>

            <Box ml="auto" color="red.600" fontSize={['xs', null, 'small']} letterSpacing="0.5px">
              {error.email}
            </Box>
          </Flex>

          <Input
            id="email"
            type="email"
            placeholder="youremail@example.com"
            fontWeight="500"
            h={['40px', null, '50px']}
            value={inputValues.email}
            onChange={e => setInputValues({ ...inputValues, email: e.target.value })}
          />
        </Flex>

        <Flex flexDir="column" gap={[0.5, null, 2]}>
          <Flex>
            <Box as="label" htmlFor="phone-number" color="blue.900" fontWeight="500" fontSize={['xs', null, 'small']}>
              Phone Number
            </Box>

            <Box ml="auto" color="red.600" fontSize={['xs', null, 'small']} letterSpacing="0.5px">
              {error.phoneNumber}
            </Box>
          </Flex>

          <Input
            id="phone-number"
            type="text"
            placeholder="e.g. +1234567890"
            fontWeight="500"
            h={['40px', null, '50px']}
            value={inputValues.phoneNumber}
            onChange={e => setInputValues({ ...inputValues, phoneNumber: e.target.value })}
          />
        </Flex>
      </Flex>

      <NavigationButtons
        isFirstStep
        onNext={() => {
          ValidateInput();
        }}
      >
        Next Step
      </NavigationButtons>
    </>
  );
};
