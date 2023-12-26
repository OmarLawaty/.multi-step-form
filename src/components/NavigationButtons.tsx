import { ReactNode } from 'react';
import { Button, Flex } from '@chakra-ui/react';

type NavigationButtonsProps = {
  children?: ReactNode;
  onNext: () => void;
  isError?: boolean;
} & (
  | {
      isFirstStep: true;
      onBack?: never;
    }
  | {
      isFirstStep?: false;
      onBack: () => void;
    }
);

export const NavigationButtons = ({ isFirstStep, onBack, onNext, isError, children }: NavigationButtonsProps) => (
  <Flex
    mt="auto"
    pos={['fixed', null, 'static']}
    insetX="0"
    bottom="0"
    bg="white"
    p="4"
    px={[4, null, 0.5]}
    fontWeight="500"
    fontSize={['sm', null, 'md']}
  >
    {!isFirstStep && (
      <Button
        bg="transparent"
        p="0"
        h="auto"
        color="gray.500"
        fontSize="inherit"
        fontWeight="inherit"
        transition="color 0.5s"
        _hover={{
          bg: 'transparent',
          color: 'blue.900'
        }}
        onClick={() => onBack()}
      >
        Go Back
      </Button>
    )}

    <Button
      ml="auto"
      color="white"
      bg="blue.900"
      p={['inherit', null, 6]}
      fontSize="inherit"
      fontWeight="inherit"
      transition="opacity 0.5s"
      _hover={{
        opacity: '0.85'
      }}
      _active={{}}
      onClick={() => onNext()}
      _disabled={{ cursor: 'not-allowed' }}
      isDisabled={isError}
    >
      {children}
    </Button>
  </Flex>
);
