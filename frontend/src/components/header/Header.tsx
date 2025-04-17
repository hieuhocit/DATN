// MUI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

// Components
import DesktopHeader from './desktop/DesktopHeader';

export default function Header() {
  return (
    <AppBar position='static'>
      <Toolbar
        sx={{
          alignItems: 'center',
          gap: 8,
        }}
      >
        <DesktopHeader />
      </Toolbar>
    </AppBar>
  );
}
