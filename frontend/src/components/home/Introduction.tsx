// MUI
import { Box } from '@mui/material';

// Components
import Section from '../common/Section';
import Image from '../common/Image';

export default function Introduction() {
  return (
    <Section sx={{ mt: '48px' }}>
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          aspectRatio: '15/7',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <Image src='/images/image-placeholder.png' fill />
      </Box>
    </Section>
  );
}
