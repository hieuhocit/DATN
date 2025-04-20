// Types
import type { Components, CssVarsTheme, Theme } from '@mui/material';

type ThemeComponents =
  | Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme>
  | undefined;

export function getComponents(mode: 'light' | 'dark') {
  const components: ThemeComponents = {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0f4c5c',
          color: 'whitesmoke',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        text: ({ theme }) => ({
          backgroundColor: 'transparent',
          textTransform: 'none',
          color: mode === 'light' ? '#0077b6' : '#00b4d8',
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
          },
        }),
        contained: () => ({
          backgroundColor: '#0077b6',
          color: 'white',
          boxShadow: 'none',
          textTransform: 'none',
        }),
        outlined: () => ({
          color: mode === 'light' ? '#0077b6' : '#00b4d8',
          borderColor: mode === 'light' ? '#0077b6' : '#00b4d8',
          boxShadow: 'none',
          textTransform: 'none',
        }),
      },
    },
  };

  return components;
}
