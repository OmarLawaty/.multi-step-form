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
            ref={nameRef}
            fontWeight="500"
            h={['40px', null, '50px']}
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
            ref={emailRef}
            fontWeight="500"
            h={['40px', null, '50px']}
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
            ref={phoneNumberRef}
            fontWeight="500"
            h={['40px', null, '50px']}
          />
        </Flex>
      </Flex>

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
