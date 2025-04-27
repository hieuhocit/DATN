import { Box } from "@mui/material";

import Section from "@/components/common/Section";
import VideoPlayer from "@components/learning/VideoPlayer";
import Comments from "../components/learning/Comments";
import Sidebar from "../components/learning/SideBar";
import LessonNavigation from "../components/learning/LessonNavigation";

export default function LearningPage() {
  return (
    <Section sx={{ mt: "128px", mb: "128px" }}>
      <Box>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Box sx={{ flexGrow: 1 }}>
            <VideoPlayer
              publicId="videos/sskgoahpg0bmoshkfwuc"
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
              sourceConfig={{
                // info: { title: 'Glide Over Coastal Beach' },
                preload: "metadata",
                textTracks: {
                  captions: {
                    label: "Vietnamese",
                    language: "vi",
                    url: "https://res.cloudinary.com/dzemgr0jr/raw/upload/v1741271376/subtitles/pnsaadmtyili2juj2rti.vtt",
                    default: true,
                  },
                  // subtitles: [
                  //   {
                  //     label: 'Vietnamese',
                  //     language: 'vi',
                  //     url: '/subs.vtt',
                  //   },
                  // ],
                },
                sourceTypes: ["hls"],
              }}
            />

            <Comments comments={[]} />
          </Box>

          <Sidebar lessons={[]} currentLessonId={1} progress={0} />
        </Box>

        <LessonNavigation lessons={[]} currentLessonIndex={1} />
      </Box>
    </Section>
  );
}
