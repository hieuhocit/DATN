import { useState, useEffect } from 'react';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import Section from '@/components/common/Section';

import { fetchCourseLessons, fetchCourseDetails, fetchProgress, fetchComments } from './learn/api';
import VideoPlayer from './learn/VideoPlayer';
import Comments from './learn/Comments';
import Sidebar from './learn/SlideBar';
import LessonNavigation from './learn/LessonNavigation';

export default function LearningLayout({ courseId = 1, userId = 1 }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [comments, setComments] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = theme.palette.mode === 'dark';

  const currentLesson = lessons.find((l) => l.id === currentLessonId);
  const currentLessonIndex = lessons.findIndex((l) => l.id === currentLessonId);

  useEffect(() => {
    const loadData = async () => {
      const [lessonsData, courseData, progressData] = await Promise.all([
        fetchCourseLessons(courseId),
        fetchCourseDetails(courseId),
        fetchProgress(userId, courseId),
      ]);

      setLessons(lessonsData);
      setCourse(courseData);
      setProgress(progressData.completionPercentage);
      setCurrentLessonId(lessonsData[0]?.id);
    };
    loadData();
  }, [courseId, userId]);

  useEffect(() => {
    if (currentLessonId) {
      fetchComments(currentLessonId).then(setComments);
    }
  }, [currentLessonId]);

  if (!currentLesson || !course) return null;

  return (
    <Section>
      <Box sx={{ px: { xs: 2, md: 4 }, py: 4, pb: 10 }}>
        {isMobile && (
          <IconButton onClick={() => setDrawerOpen(true)} sx={{ mb: 2 }}>
            <MenuIcon sx={{ color: isDark ? '#fff' : '#000' }} />
          </IconButton>
        )}

        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ flexGrow: 1 }}>
            <VideoPlayer lesson={currentLesson} course={course} />
            <Comments comments={comments} />
          </Box>

          {!isMobile && (
            <Sidebar
              lessons={lessons}
              currentLessonId={currentLessonId}
              onLessonClick={setCurrentLessonId}
              progress={progress}
            />
          )}
        </Box>

        <LessonNavigation
          lessons={lessons}
          currentLessonIndex={currentLessonIndex}
          onNavigate={setCurrentLessonId}
        />

        {isMobile && (
          <Sidebar
            lessons={lessons}
            currentLessonId={currentLessonId}
            onLessonClick={setCurrentLessonId}
            progress={progress}
            mobile
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          />
        )}
      </Box>
    </Section>
  );
}
