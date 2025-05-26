import { Box, CircularProgress, Stack } from "@mui/material";

import Section from "@/components/common/Section";
import VideoPlayer from "@components/learning/VideoPlayer";
import Comments from "../components/learning/Comments";
import Category from "../components/learning/Category";
import LessonNavigation from "../components/learning/LessonNavigation";
import Notes from "@components/learning/Notes";
import { useLearning } from "@/hooks/useLearning";
import { useEffect, useRef } from "react";
import ChatWidget from "@/components/chatbot/ChatWidget";
import cloudinary from "cloudinary-video-player";
import { deleteHistory } from "@/services/aiService";

export default function LearningPage() {
  const playerRef = useRef<cloudinary.VideoPlayer | null>(null);

  const {
    data,
    refetch,
    course,
    currentLesson,
    lessonId,
    comments,
    notes,
    lessons,
    currentLessonIndex,
    isLoading,
    handleClickNextLesson,
    handleClickPrevLesson,
    handleClickJumpToLesson,
  } = useLearning();

  useEffect(() => {
    if (!course) return;
    async function handleDeleteHistory() {
      await deleteHistory(course._id);
    }
    handleDeleteHistory();
  }, [course]);

  if (isLoading || !currentLesson) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Section sx={{ mt: "128px", mb: "128px", overflowX: "hidden" }}>
      <Box>
        <Stack direction={"row"} gap={2}>
          <Box key={currentLesson?._id} sx={{ flexGrow: 1 }}>
            <VideoPlayer
              handleClickNextLesson={handleClickNextLesson}
              // lastWatchPosition={
              //   currentLesson?.progress?.[0]?.lastWatchPosition ?? 0
              // }
              progressId={currentLesson?.progress?.[0]?._id ?? ""}
              refetch={refetch}
              ref={playerRef}
              publicId={currentLesson?.publicId ?? ""}
              playerConfig={{
                profile: import.meta.env.VITE_CLOUDINARY_PROFILE,
                cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
                controls: true,
                fluid: true,
                muted: false,
                posterOptions: {
                  transformation: { effect: ["blur"] },
                },
                bigPlayButton: true,
                aiHighlightsGraph: true,
                chaptersButton: true,
                pictureInPictureToggle: true,
                playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
                showJumpControls: true,
                showLogo: false,
                seekThumbnails: true,
                // floatingWhenNotVisible: 'right',
              }}
              // sourceConfig={{
              //   // info: { title: 'Glide Over Coastal Beach' },
              //   preload: "metadata",
              //   textTracks: {
              //     captions: {
              //       label: "Vietnamese",
              //       language: "vi",
              //       url: "https://res.cloudinary.com/dzemgr0jr/raw/upload/v1741271376/subtitles/pnsaadmtyili2juj2rti.vtt",
              //       default: true,
              //     },
              //     // subtitles: [
              //     //   {
              //     //     label: 'Vietnamese',
              //     //     language: 'vi',
              //     //     url: '/subs.vtt',
              //     //   },
              //     // ],
              //   },
              //   sourceTypes: ["hls"],
              // }}
            />
            {lessonId && comments && (
              <Comments
                comments={comments}
                refetch={refetch}
                lessonId={lessonId}
              />
            )}
          </Box>

          <Box sx={{ position: "relative" }}>
            {lessons && (
              <Category
                currentLessonId={lessonId}
                lessons={lessons}
                handleClickJumpToLesson={handleClickJumpToLesson}
              />
            )}
            {/* Notes */}
            <Box
              sx={{
                position: "absolute",
                top: "17px",
                right: "24px",
              }}
            >
              {lessonId && data && notes && (
                <Notes
                  notes={notes}
                  lessonId={lessonId}
                  courseId={data.course._id}
                  playerRef={playerRef}
                  refetch={refetch}
                  handleClickJumpToLesson={handleClickJumpToLesson}
                />
              )}
            </Box>
          </Box>
        </Stack>

        {lessons && (
          <LessonNavigation
            min={0}
            max={lessons.length}
            current={currentLessonIndex}
            onNext={handleClickNextLesson}
            onPrev={handleClickPrevLesson}
          />
        )}
      </Box>
      <ChatWidget
        courseId={currentLesson?.courseId}
        lessonId={currentLesson?._id}
      />
    </Section>
  );
}
