// React
import { useState } from 'react';

// MUI
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import {
  List,
  ListItemButton,
  Menu,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Icons
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Components
import Image from '@/components/common/Image';
import { TwoLineTypography } from '@/components/typography';

// Redux
import { useAppSelector } from '@/hooks/useStore';
import { userSelector } from '@/features/account';

export default function Notification() {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const user = useAppSelector(userSelector);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tooltip title='Thông báo'>
        <IconButton onClick={handleClick} size='large' color='inherit'>
          <Badge badgeContent={4} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: {
            width: '400px',
            p: 0,
          },
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant='fullWidth'
              textColor='secondary'
              indicatorColor='secondary'
            >
              <Tab
                sx={{
                  textTransform: 'capitalize',
                }}
                label='Học sinh'
                {...a11yProps(0)}
              />
              {['admin', 'instructor'].includes(user?.role || '') && (
                <Tab
                  sx={{
                    textTransform: 'capitalize',
                  }}
                  label='Giáo viên'
                  {...a11yProps(1)}
                />
              )}
              {user?.role === 'admin' && (
                <Tab
                  sx={{
                    textTransform: 'capitalize',
                  }}
                  label='Quản trị'
                  {...a11yProps(2)}
                />
              )}
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={0}>
            <List sx={{ width: '100%', p: 0, bgcolor: 'background.paper' }}>
              <ListItemButton>
                <NotificationItem />
              </ListItemButton>
              <ListItemButton>
                <NotificationItem />
              </ListItemButton>
              <ListItemButton>
                <NotificationItem />
              </ListItemButton>
            </List>
          </CustomTabPanel>
          {['admin', 'instructor'].includes(user?.role || '') && (
            <CustomTabPanel value={value} index={1}>
              <List sx={{ width: '100%', p: 0, bgcolor: 'background.paper' }}>
                <ListItemButton>
                  <NotificationItem />
                </ListItemButton>
                <ListItemButton>
                  <NotificationItem />
                </ListItemButton>
              </List>
            </CustomTabPanel>
          )}
          {user?.role === 'admin' && (
            <CustomTabPanel value={value} index={2}>
              <List sx={{ width: '100%', p: 0, bgcolor: 'background.paper' }}>
                <ListItemButton>
                  <NotificationItem />
                </ListItemButton>
              </List>
            </CustomTabPanel>
          )}
        </Box>
      </Menu>
    </Box>
  );
}

function NotificationItem() {
  return (
    <Stack
      sx={{ width: 1, cursor: 'pointer' }}
      direction={'row'}
      gap={1}
      alignItems={'flex-start'}
    >
      <Box
        sx={{
          width: '70px',
          position: 'relative',
          aspectRatio: '1/1',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        <Image src='/images/image-placeholder.png' fill />
      </Box>
      <Stack direction={'column'} gap={0}>
        <TwoLineTypography sx={{ fontSize: '1rem' }} variant='body1'>
          Bài giảng mới đã được cập nhật
        </TwoLineTypography>
        <Typography sx={{ opacity: 0.6 }} fontSize={'0.75rem'} variant='body1'>
          2 giờ trước - Cập nhật
        </Typography>
        <TwoLineTypography
          sx={{ mt: '4px', fontSize: '0.85rem', fontWeight: 400 }}
          variant='body1'
        >
          Giảng viên Nguyễn Văn A vừa cập nhật bài giảng 'JavaScript ES6 Nâng
          cao'. Hãy xem ngay!
        </TwoLineTypography>
      </Stack>
    </Stack>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
