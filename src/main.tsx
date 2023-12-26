import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';
import theme from './theme';
import { StepsProvider } from './contexts/StepsContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <StepsProvider>
        <App />
      </StepsProvider>
    </ChakraProvider>
  </React.StrictMode>
);
