import { createTheme } from '@mui/material/styles';

const COLORS = {
  bg: '#000000',
  content: '#1b1824',
  aqua: '#46cfc8',
  orange: '#f28a3a',
  textLight: '#fff8cc',
  textMedium: '#84834c',
  border: '#4d475c',
};

const FONTS = {
  body: 'var(--font-body), Lexend, sans-serif',
  subheading: 'var(--font-subheading), sans-serif',
  heading: 'var(--font-heading), "Black Han Sans", sans-serif',
};

/*======================================
 * Note to self that fontSize 14 is 16px
 *======================================*/
const retroTheme = createTheme({
  typography: {
    fontSize: 14,
    fontFamily: FONTS.body,
    h1: {
      fontFamily: FONTS.heading,
      fontWeight: 400,
      fontSize: 38,
    },
    h2: {
      fontFamily: FONTS.body,
      fontWeight: 700,
      fontSize: 24,
    },
    h3: {
      fontFamily: FONTS.subheading,
      fontWeight: 700,
      fontSize: 20,
    },
    h4: {
      fontFamily: FONTS.subheading,
    },
    h5: {
      fontFamily: FONTS.subheading,
    },
    h6: {
      fontFamily: FONTS.subheading,
    },
    bigheading: {
      fontSize: 64,
      fontFamily: FONTS.heading,
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: FONTS.body,
        },
        h1: {
          fontFamily: FONTS.heading,
          fontWeight: 400,
        },
        h2: {
          fontFamily: FONTS.heading,
          fontWeight: 400,
        },
        h3: {
          fontFamily: FONTS.heading,
          fontWeight: 400,
        },
        h4: {
          fontFamily: FONTS.subheading,
        },
        h5: {
          fontFamily: FONTS.subheading,
        },
        h6: {
          fontFamily: FONTS.subheading,
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    contrastThreshold: 7,
    tonalOffset: 0.2,
    primary: {
      main: COLORS.aqua,
    },
    secondary: {
      main: COLORS.orange,
    },
    background: {
      default: COLORS.bg,
      paper: COLORS.content,
    },
    text: {
      primary: COLORS.textLight,
      secondary: COLORS.textLight,
      medium: COLORS.textMedium,
    },
    divider: COLORS.border,
  },
  gradients: {
    superDark: `linear-gradient(to right top, #000000, #06030c, #1d1928, #06030c, #000000)`,
    gradientText: 'linear-gradient(45deg, #fff8cc, #ffc05c, #ffd8d8, #fff1cc, #c6fff6, #d2ffcc)',
    gradientLink: 'linear-gradient(90deg, #ffffff, #ffb6e9, #e3c1ff, #ffffff)',
    borderGlow: 'linear-gradient(90deg, #ffb742 0%, #f2247e 33%, #ba34eb 66%, #2cdec3 100%)',
  },
});

export default retroTheme;
