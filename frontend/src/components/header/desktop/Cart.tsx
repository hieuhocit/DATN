// Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// React
import { useState } from 'react';

// Components
import Image from '@/components/common/Image';

// MUI
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button, Stack, Tooltip, Typography } from '@mui/material';
import { OneLineTypography, TwoLineTypography } from '@/components/typography';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box>
        <Tooltip title='Giỏ hàng'>
          <IconButton onClick={handleClick} size='large' color='inherit'>
            <Badge badgeContent={2} color='error'>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Menu
          MenuListProps={{
            sx: { padding: 0 },
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <Stack
            direction={'row'}
            alignItems={'center'}
            gap={1}
            padding={2}
            justifyContent={'space-between'}
          >
            <Typography variant='body1' fontWeight={600}>
              Giỏ hàng của bạn
            </Typography>
            <Link to='/cart'>
              <Typography fontSize={'0.85rem'}>Xem tất cả</Typography>
            </Link>
          </Stack>
          <MenuItem onClick={handleClose}>
            <CartItem />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <CartItem />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <CartItem />
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}

function CartItem() {
  return (
    <>
      <Stack direction={'row'} gap={1} alignItems={'flex-start'}>
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
        <Stack direction={'column'} gap={'6px'}>
          <TwoLineTypography sx={{ fontSize: '0.9rem' }} variant='body1'>
            Master HTML CSS với khóa học HTML CSS Tips
          </TwoLineTypography>

          <Stack>
            <OneLineTypography variant='body1'>
              Stephane Maarek | AWS Certified Cloud Practitioner,Solutions
              Architect,Developer
            </OneLineTypography>
            <Stack direction={'row'} gap={1} alignItems={'center'}>
              <Typography
                sx={{ fontSize: '0.9rem' }}
                variant='body1'
                fontWeight={600}
              >
                ₫399,000
              </Typography>
              <Typography
                sx={{ textDecoration: 'line-through' }}
                variant='body1'
                fontSize={'0.75rem'}
              >
                ₫2,329,000
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
