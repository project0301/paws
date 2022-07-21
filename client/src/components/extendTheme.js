import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    brands: {
      100: '#c3b8ff',
      900: '#ffffff',
    },
    grey: {
      100: '#eff3fa',
    },
    blue: {
      100: '#4824ff',
    },
    red: {
      100: '#fc3c3c',
      200: '#c70a0a'
    },
  },
  fonts: {
    body: 'Graphik Font',
    heading: 'Graphic Font',
  },
  fontWeights: {
    haorline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
});

export default customTheme;