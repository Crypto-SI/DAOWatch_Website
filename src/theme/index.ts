import { extendTheme } from '@chakra-ui/react';

// Brand colors from the brandguide
const colors = {
  brand: {
    black: '#000000',
    blue: '#3d79fb',
    white: '#ffffff',
  },
};

// Custom fonts from the brandguide
const fonts = {
  heading: '"DAGGERSQUARE", "Arial Black", sans-serif',
  body: '"Century Gothic", "CenturyGothic", "AppleGothic", sans-serif',
};

// Component style overrides
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
      borderRadius: '4px',
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
      discord: {
        bg: '#5865F2',
        color: 'brand.white',
        _hover: {
          bg: '#4752c4',
        },
      },
    },
    defaultProps: {
      variant: 'primary',
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: 'bold',
      lineHeight: '1.2',
    },
  },
  Text: {
    baseStyle: {
      fontWeight: 'bold',
    },
  },
  Link: {
    baseStyle: {
      color: 'brand.blue',
      _hover: {
        textDecoration: 'none',
        color: 'brand.black',
      },
    },
  },
};

// Custom breakpoints
const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
};

// Create and export the theme
const theme = extendTheme({
  colors,
  fonts,
  components,
  breakpoints,
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'brand.black',
      },
    },
  },
});

export default theme; 