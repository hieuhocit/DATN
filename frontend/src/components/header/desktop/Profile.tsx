// MUI
import Box from '@mui/material/Box';
import { Avatar, Menu, MenuItem, Stack, Tooltip } from '@mui/material';

// Icons
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

// React
import { useState } from 'react';

export default function Profile() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Tooltip title='Tài khoản'>
        <IconButton onClick={handleClick} size='medium' color='inherit'>
          <Avatar sx={{ width: 32, height: 32 }}>T</Avatar>
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Học tập</MenuItem>
        <MenuItem onClick={handleClose}>Hồ sơ</MenuItem>
        <MenuItem onClick={handleClose}>Giỏ hàng</MenuItem>
        {/* Will display if use register to be teacher */}
        <MenuItem onClick={handleClose}>Giáo viên</MenuItem>
        <MenuItem onClick={handleClose}>
          <Stack direction={'row'} alignItems={'center'} gap={3}>
            Đăng xuất
            <LogoutIcon fontSize='small' />
          </Stack>
        </MenuItem>
      </Menu>
    </Box>
  );
}
