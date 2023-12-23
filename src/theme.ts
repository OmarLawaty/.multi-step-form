import { extendTheme } from '@chakra-ui/react';

const colors = {
  white: 'hsl(0, 0%, 100%)'
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
        bg: 'gray.300',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '32px',
        fontWeight: '700'
      }
    }
  },
  colors,
  fonts: {
    body: '"Spartan", sans-serif'
  }
});
