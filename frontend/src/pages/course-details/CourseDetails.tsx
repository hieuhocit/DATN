// Components
import Image from '@/components/common/Image';
import Section from '@/components/common/Section';
import { Course } from '@/types';

// MUI
import { Box, Stack, Typography } from '@mui/material';

const course: Course = {
  _id: '1',
  title: 'Khóa học HTML CSS Tips và Tricks',
};

export default function CourseDetails() {
  return (
    <>
      <Section sx={{ mt: '128px' }}>
        <Stack>
          <Stack>
            <Typography>
              Master HTML CSS với khóa học HTML CSS Tips và Tricks
            </Typography>
          </Stack>
          <Stack>
            <Box
              sx={{
                width: '200px',
                position: 'relative',
                aspectRatio: '5/4',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <Image src='/images/image-placeholder.png' fill />
            </Box>
          </Stack>
        </Stack>
      </Section>
    </>
  );
}
