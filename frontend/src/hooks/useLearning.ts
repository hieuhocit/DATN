import { getCourseBySlug } from "@/services/courseService";
import { updateProgressLesson } from "@/services/lessonService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export const useLearning = () => {
  const { courseSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);

  const playerRef = useRef<HTMLVideoElement | null>(null);
  const idIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { data, refetch } = useQuery({
    queryKey: ["learning", courseSlug],
    queryFn: () => getCourseBySlug(courseSlug as string),
  });

  // Get the first uncompleted lesson
  useEffect(() => {
    if (searchParams.get("lesson")) return;

    const uncompletedLessonId = data?.lessons?.find(
      (lesson) => !lesson?.progress?.[0]?.isCompleted
    )?._id;

    if (uncompletedLessonId) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("lesson", uncompletedLessonId);
      setSearchParams(params);
      setCurrentLessonIndex(
        data?.lessons?.findIndex((lesson) => lesson._id === uncompletedLessonId)
      );
    }
  }, []);

  // Set the last watched position
  useEffect(() => {
    const videoPlayer = playerRef.current;
    const currentLesson = data?.lessons[currentLessonIndex];
    const lastWatchPosition =
      currentLesson?.progress?.[0]?.lastWatchPosition || 0;

    if (videoPlayer) {
      console.log(lastWatchPosition);
      videoPlayer.currentTime = lastWatchPosition;
    }
  }, [currentLessonIndex]);

  useEffect(() => {
    const videoPlayer = playerRef.current;

    if (videoPlayer) {
      videoPlayer.addEventListener("play", () => {
        clearInterval(idIntervalRef.current as NodeJS.Timeout);
        idIntervalRef.current = setInterval(async () => {
          const currentTime = videoPlayer.currentTime;
          const duration = videoPlayer.duration;
          const progress = Math.floor((currentTime / duration) * 100);
          const lastWatchPosition = Math.floor(currentTime);

          const currentLesson = data?.lessons[currentLessonIndex];
          const id = currentLesson?.progress?.[0]?._id;
          if (id) {
            await updateProgressLesson(id, {
              progress,
              lastWatchPosition,
            });
          }
        }, 15000);
      });

      videoPlayer.addEventListener("pause", () => {
        clearInterval(idIntervalRef.current as NodeJS.Timeout);
      });

      videoPlayer.addEventListener("ended", async () => {
        clearInterval(idIntervalRef.current as NodeJS.Timeout);
        const id = data?.lessons?.[currentLessonIndex]?.progress?.[0]?._id;

        if (id) {
          await updateProgressLesson(id, {
            progress: 100,
            lastWatchPosition: Math.floor(videoPlayer.duration) - 5,
          });
          handleClickNextLesson();
          refetch();
        }
      });
    }

    return () => {
      if (videoPlayer) {
        clearInterval(idIntervalRef.current as NodeJS.Timeout);
        videoPlayer.removeEventListener("play", () => {});
        videoPlayer.removeEventListener("pause", () => {});
        videoPlayer.removeEventListener("ended", () => {});
      }
    };
  }, [currentLessonIndex]);

  const handleClickNextLesson = () => {
    const nextLesson = data?.lessons[currentLessonIndex + 1];
    if (nextLesson) {
      setSearchParams({ lesson: nextLesson._id });
      setCurrentLessonIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleClickPrevLesson = () => {
    const prevLesson = data?.lessons[currentLessonIndex - 1];
    if (prevLesson) {
      setSearchParams({ lesson: prevLesson._id });
      setCurrentLessonIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleClickJumpToLesson = (lessonId: string) => {
    const lessonIndex = data?.lessons.findIndex(
      (lesson) => lesson._id === lessonId
    );

    if (lessonIndex !== undefined && lessonIndex !== currentLessonIndex) {
      setSearchParams({ lesson: lessonId });
      setCurrentLessonIndex(lessonIndex);
    }
  };

  const lessonId = searchParams.get("lesson") || data?.lessons[0]?._id;

  const comments = data?.lessons.find(
    (lesson) => lesson._id === lessonId
  )?.comments;

  return {
    data,
    refetch,
    playerRef,
    lessonId,
    notes: data?.notes,
    lessons: data?.lessons,
    comments,
    currentLessonIndex,
    handleClickNextLesson,
    handleClickPrevLesson,
    handleClickJumpToLesson,
  };
};
