// Components
import Image from '../common/Image';
import { OneLineTypography, TwoLineTypography } from '../typography';

// MUI
import { Box, Rating, Stack, Tooltip, Typography } from '@mui/material';

export default function Card() {
  return (
    <Tooltip
      title='Xem chi tiết'
      sx={{ cursor: 'pointer' }}
      followCursor
      PopperProps={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [35, 10],
            },
          },
        ],
      }}
    >
      <Stack direction={'column'} width={'100%'} gap={1}>
        <Box
          sx={{
            width: '100%',
            position: 'relative',
            aspectRatio: '5/3',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Image src='/images/image-placeholder.png' fill />
        </Box>
        <TwoLineTypography
          sx={{ maxWidth: '100%', fontSize: '1rem' }}
          fontWeight={600}
        >
          React JS: Learn React JS From Scratch with Hands-On Projects
        </TwoLineTypography>
        <OneLineTypography
          sx={{ opacity: 0.8, fontSize: '0.8rem' }}
          variant='body1'
          fontWeight={400}
        >
          Oak Academy,OAK Academy Team
        </OneLineTypography>
        <Stack direction={'row'} alignItems={'center'} gap={'4px'}>
          <Typography sx={{ color: '#ff7b00', fontWeight: 600 }}>
            4.5
          </Typography>
          <Rating
            name='rating'
            defaultValue={4.5}
            precision={0.5}
            size='small'
            readOnly
          />
        </Stack>
        <Typography sx={{ fontSize: '1rem' }} fontWeight={600}>
          ₫959,000
        </Typography>
      </Stack>
    </Tooltip>
  );
}
