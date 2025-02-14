import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#008080', // Primary color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'var(--variant-textColor)',
          borderColor: 'var(--variant-outlinedBorder)',
          '&.MuiButton-contained': {
            backgroundColor: 'var(--variant-containedBg)',
            color: 'var(--variant-containedColor)',
          },
          '&.MuiButton-outlined': {
            borderColor: 'var(--variant-outlinedBorder)',
            color: 'var(--variant-outlinedColor)',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'var(--variant-textColor)',
        },
      },
    },
  },
});

export default theme;
