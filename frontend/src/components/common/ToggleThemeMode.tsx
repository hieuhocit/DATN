// Hooks
import { useTheme } from '@/hooks/useTheme';

// Icons
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';

// MUI
import { Stack, Tooltip } from '@mui/material';

export default function ToggleThemeMode() {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <Stack direction={'row'} alignItems={'center'}>
      <Tooltip
        title={`Chuyển chế độ ${themeMode === 'light' ? 'tối' : 'sáng'}`}
      >
        {themeMode === 'light' ? (
          <IconButton onClick={toggleTheme}>
            <DarkModeIcon sx={{ color: 'black' }} />
          </IconButton>
        ) : (
          <IconButton onClick={toggleTheme}>
            <LightModeIcon />
          </IconButton>
        )}
      </Tooltip>
    </Stack>
  );
}
