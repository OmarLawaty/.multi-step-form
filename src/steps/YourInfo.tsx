import { Box, Flex, Input } from '@chakra-ui/react';
import { useState } from 'react';

import { NavigationButtons, StepHeader } from '../components/index.ts';
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

      return;
    }

    setError({ ...errorValues });
  };

  return (
    <>
      <StepHeader title="Personal info" description="Please provide your name, email address, and phone number." />

      <Flex flexDir="column" gap={[3.5, null, 5]}>
        <InputField
          id="name"
          label="Name"
          placeHolder="Your name"
          type="text"
          errorMessage={error.name}
          inputValue={inputValues.name}
          onInputChange={e => setInputValues({ ...inputValues, name: e.target.value })}
        />

        <InputField
          id="email"
          label="Email Address"
          placeHolder="youremail@example.com"
          type="email"
          errorMessage={error.email}
          inputValue={inputValues.email}
          onInputChange={e => setInputValues({ ...inputValues, email: e.target.value })}
        />

        <InputField
          id="phone-number"
          label="Phone number"
          placeHolder="e.g. +1234567890"
          type="text"
          errorMessage={error.phoneNumber}
          inputValue={inputValues.phoneNumber}
          onInputChange={e => setInputValues({ ...inputValues, phoneNumber: e.target.value })}
        />
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

interface inputFieldProps {
  id: string;
  label: string;
  errorMessage: string;
  type: React.HTMLInputTypeAttribute;
  placeHolder: string;
  inputValue: string;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputField = ({ id, label, errorMessage, type, placeHolder, inputValue, onInputChange }: inputFieldProps) => {
  return (
    <Flex flexDir="column" gap={[0.5, null, 2]}>
      <Flex fontSize={['xs', null, 'small']}>
        <Box as="label" htmlFor={id} color="blue.900" fontWeight="500">
          {label}
        </Box>

        <Box ml="auto" color="red.600" letterSpacing="0.5px">
          {errorMessage}
        </Box>
      </Flex>

      <Input
        id={id}
        type={type}
        placeholder={placeHolder}
        fontWeight="500"
        h={['40px', null, '50px']}
        value={inputValue}
        onChange={onInputChange}
      />
    </Flex>
  );
};
