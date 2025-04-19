// Types
import type { PaletteOptions } from '@mui/material';

// Colors
import { common } from '@mui/material/colors';

export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: common.white,
    contrastText: common.black,
  },
  action: {
    hover: 'rgba(0, 0, 0, 0.15) !important',
  },
  background: {
    paper: common.white,
    default: '#edf6f9',
  },
};

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  background: {
    paper: '#212529',
    default: '#000',
  },
};
