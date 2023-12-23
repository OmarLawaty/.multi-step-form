import { Box, Heading, Input, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks';

interface YourInfoProps {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

type FieldValidation = (name: string, email: string, phoneNumber: string) => void;

export const YourInfo = ({ formValues, setFormValues }: YourInfoProps) => {
  const [errorMessage, setErrorMessage] = useState({ name: '', email: '', phoneNumber: '' });

  const debouncedName = useDebounce(formValues.name);
  const debouncedEmail = useDebounce(formValues.email);
  const debouncedPhoneNumber = useDebounce(formValues.phoneNumber);

  useEffect(() => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (
      debouncedName === '' ||
      debouncedEmail === '' ||
      debouncedPhoneNumber === '' ||
      !emailRegex.test(debouncedEmail)
    )
      setFormValues({ ...formValues, isValid: false });

    if (debouncedName === '') {
      return setErrorMessage({ ...errorMessage, name: 'This field is required' });
    }

    if (debouncedEmail === '') {
      return setErrorMessage({ ...errorMessage, email: 'This field is required' });
    }

    if (debouncedPhoneNumber === '') {
      return setErrorMessage({ ...errorMessage, phoneNumber: 'This field is required' });
    }

    if (!emailRegex.test(debouncedEmail)) {
      return setErrorMessage({ ...errorMessage, email: 'Enter a valid Email Address' });
    }

    setErrorMessage({ name: '', email: '', phoneNumber: '' });
    setFormValues({ ...formValues, isValid: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedName, debouncedEmail, debouncedPhoneNumber]);

  return (
    <>
      <Box>
        <Heading as="h1">Personal info</Heading>

        <Text>Please provide your name, email address, and phone number.</Text>
      </Box>

      <Box>
        <Box as="label" htmlFor="name">
          Name
        </Box>

        <Input
          id="name"
          type="text"
          placeholder="Your name"
          value={formValues.name}
          onChange={e => setFormValues({ ...formValues, name: e.currentTarget.value })}
        />
      </Box>

      <Box>
        <Box htmlFor="email" as="label">
          Email Address
        </Box>

        <Input
          id="email"
          type="email"
          placeholder="youremail@example.com"
          value={formValues.email}
          onChange={e => setFormValues({ ...formValues, email: e.currentTarget.value })}
        />
      </Box>

      <Box>
        <Box as="label" htmlFor="phoneNumber">
          Phone Number
        </Box>

        <Input
          id="phoneNumber"
          type="text"
          placeholder="e.g. 1234567890"
          value={formValues.phoneNumber}
          onChange={e =>
            setFormValues({
              ...formValues,
              phoneNumber:
                /^[0-9\b]+$/.test(e.currentTarget.value) || e.currentTarget.value === ''
                  ? e.currentTarget.value
                  : formValues.phoneNumber
            })
          }
        />
      </Box>
    </>
  );
};
