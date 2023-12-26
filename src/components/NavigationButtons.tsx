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
  <Flex mt="auto">
    {!isFirstStep && <Button onClick={() => onBack()}>Go Back</Button>}

    <Button ml="auto" onClick={() => onNext()} _disabled={{ cursor: 'not-allowed' }} isDisabled={isError}>
      {children}
    </Button>
  </Flex>
);
