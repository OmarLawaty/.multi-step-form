import { extendTheme } from '@chakra-ui/react';

const colors = {
  blue: {
    100: 'hsl(228, 100%, 84%)',
    200: 'hsl(206, 94%, 87%)',
    900: 'hsl(213, 96%, 18%)'
  },
  purple: {
    800: 'hsl(243, 100%, 62%)'
  },
  red: {
    600: 'hsl(354, 84%, 57%)'
  },
  gray: {
    50: 'hsl(231, 100%, 99%)',
    100: 'hsl(217, 100%, 97%)',
    300: 'hsl(229, 24%, 87%)',
    500: 'hsl(231, 11%, 63%)'
  }
};

export default extendTheme({
  styles: {
    global: {
      '*': {
        WebkitTapHighlightColor: 'transparent'
      },
      body: {
        scrollbarGutter: 'stable',
        minH: '100vh',
        bg: 'gray.100',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 'md',
        fontWeight: 'bold'
      }
    }
  },
  colors,
  fonts: {
    body: '"Ubuntu", sans-serif'
  }
});
