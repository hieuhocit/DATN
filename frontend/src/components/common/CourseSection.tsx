// Components
import Section from '../common/Section';
import Slider from '../common/Slider';

// MUI
import { Typography } from '@mui/material';

// Types
import { Course } from '@/types';

type Props = {
  title: string;
  courses: Course[];
};

export default function CourseSection({ title, courses }: Props) {
  return (
    <Section
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant='h4' fontWeight={600}>
        {title}
      </Typography>
      <Slider courses={courses} />
    </Section>
  );
}
