// MUI theme configuration
import { createTheme, responsiveFontSizes } from '@mui/material';
import { lightPalette, darkPalette } from './palette';
import { components } from './components';
import { typography } from './typography';

export const getTheme = (mode: 'light' | 'dark') => {
  return responsiveFontSizes(
    createTheme({
      palette: mode === 'light' ? lightPalette : darkPalette,
      typography: typography,
      components: components,
    })
  );
};
