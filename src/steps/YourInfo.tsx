import { Box, Heading, Input, Text } from '@chakra-ui/react';
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
  const [__, setCurrentProductOptions] = useProductOptionsState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCurrentStep] = useStepState();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const ValidateInput = () => {
    const errorValues = defaultErrorMessages;

    const nameValue = nameRef.current?.value as string;
    const emailValue = emailRef.current?.value as string;
    const phoneNumberValue = phoneNumberRef.current?.value as string;

    const validEmailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isEmailCorrect = validEmailRegex.test(emailValue as string);
    if (!isEmailCorrect) errorValues.email = 'Enter a valid email address';

    const isNameEmpty = nameValue === '';
    if (isNameEmpty) errorValues.name = 'This field is required';

    const isEmailEmpty = emailValue === '';
    if (isEmailEmpty) errorValues.email = 'This field is required';

    const isPhoneNumberEmpty = phoneNumberValue === '';
    if (isPhoneNumberEmpty) errorValues.phoneNumber = 'This field is required';

    const isAllInputsValid = !isNameEmpty && !isEmailEmpty && !isPhoneNumberEmpty && isEmailCorrect;
    if (isAllInputsValid) {
      setCurrentProductOptions({
        type: 'update-user-data',
        payload: {
          name: nameValue,
          email: emailValue,
          phoneNumber: phoneNumberValue
        }
      });

      setCurrentStep({ type: 'go-to-next-step' });
    }

    setError({ ...errorValues });
  };

  return (
    <>
      <Box>
        <Heading as="h1">Personal info</Heading>

        <Text>Please provide your name, email address, and phone number.</Text>
      </Box>

      <Box>
        <Box>
          <Box as="label" htmlFor="name">
            Name
          </Box>

          <Box ml="auto">{error.name}</Box>
        </Box>

        <Input id="name" type="text" placeholder="Your name" ref={nameRef} />
      </Box>

      <Box>
        <Box>
          <Box htmlFor="email" as="label">
            Email Address
          </Box>

          <Box ml="auto">{error.email}</Box>
        </Box>

        <Input id="email" type="email" placeholder="youremail@example.com" ref={emailRef} />
      </Box>

      <Box>
        <Box>
          <Box as="label" htmlFor="phone-number">
            Phone Number
          </Box>

          <Box ml="auto">{error.phoneNumber}</Box>
        </Box>

        <Input id="phone-number" type="text" placeholder="e.g. +1234567890" ref={phoneNumberRef} />
      </Box>

      <NavigationButtons
        isFirstStep
        onNext={() => {
          ValidateInput();
        }}
      >
        Next
      </NavigationButtons>
    </>
  );
};
