// MUI
import { Box, SxProps, Theme } from '@mui/material';

// Types
type Props = {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

export default function Section({ children, sx }: Props) {
  return (
    <Box
      sx={{
        paddingInline: {
          xs: '16px',
          sm: '32px',
          md: '64px',
          lg: '96px',
          xl: '128px',
        },
        mt: '64px',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
