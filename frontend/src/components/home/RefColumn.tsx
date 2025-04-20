// MUI
import { Theme } from '@emotion/react';
import { Stack, SxProps, Typography } from '@mui/material';

// React router
import { Link } from 'react-router-dom';

// Types
type Props = {
  title: string;
  items: { name: string; link: string }[];
  sx?: SxProps<Theme>;
};

export default function RefColumn({ title, items, sx }: Props) {
  return (
    <Stack direction={'column'} spacing={1} sx={sx}>
      <Typography
        variant='body2'
        fontSize={'16px'}
        fontWeight={600}
        textTransform={'capitalize'}
      >
        {title}
      </Typography>

      {items.map((item) => (
        <Link
          to={item.link}
          key={item.name}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Typography
            variant='body2'
            fontSize={'14px'}
            sx={{ opacity: 0.85, textTransform: 'capitalize' }}
          >
            {item.name}
          </Typography>
        </Link>
      ))}
    </Stack>
  );
}
