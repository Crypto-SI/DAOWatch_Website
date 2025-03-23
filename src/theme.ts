import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      black: '#000000',
      white: '#FFFFFF',
      blue: '#3d79fb',
      purple: '#6B46C1',
      gray: {
        50: '#F7FAFC',
        100: '#EDF2F7',
        200: '#E2E8F0',
        300: '#CBD5E0',
        400: '#A0AEC0',
        500: '#718096',
        600: '#4A5568',
        700: '#2D3748',
        800: '#1A202C',
        900: '#171923',
      }
    },
  },
  fonts: {
    heading: '"DAGGERSQUARE", "Arial Black", sans-serif',
    body: '"Century Gothic", "CenturyGothic", "AppleGothic", sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'brand.black',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
      variants: {
        primary: {
          bg: 'brand.blue',
          color: 'brand.white',
          _hover: {
            bg: 'brand.black',
          },
        },
        secondary: {
          bg: 'brand.black',
          color: 'brand.white',
          _hover: {
            bg: 'gray.700',
          },
        },
      },
      defaultProps: {
        variant: 'primary',
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: '700',
      },
    },
    Container: {
      baseStyle: {
        maxW: "container.xl",
        px: { base: 4, md: 6 },
      },
    },
  },
});

export default theme; 