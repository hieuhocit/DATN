/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCourseBySlug } from "@/services/courseService";
import { Comment, Lesson } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export const useLearning = () => {
  const { courseSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);

  const {
    data: res,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["learning", courseSlug],
    queryFn: () => getCourseBySlug(courseSlug as string),
  });

  useEffect(() => {
    const lessonId = searchParams.get("lesson");
    const lessonIndex = res?.data?.lessons?.findIndex(
      (lesson: any) => lesson._id === lessonId
    );

    if (lessonIndex !== undefined && lessonIndex !== -1) {
      setCurrentLessonIndex(lessonIndex);
    } else {
      setCurrentLessonIndex(0);
    }
  }, [searchParams, res?.data?.lessons]);

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

  const handleClickJumpToLesson = (lessonId: string, position?: number) => {
    const lessonIndex = data?.lessons.findIndex(
      (lesson: any) => lesson._id === lessonId
    );

    if (lessonIndex !== undefined) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("lesson", lessonId);
      if (position) {
        newSearchParams.set("position", position.toString());
      }

      setSearchParams(newSearchParams);
      setCurrentLessonIndex(lessonIndex);
    }
  };

  const data = res?.data;
  const currentLesson = data?.lessons?.[currentLessonIndex] as
    | Lesson
    | undefined;
  const lessonId = currentLesson?._id as string | undefined;
  const comments = currentLesson?.comments as Comment[] | undefined;
  const course = data?.course;

  return {
    isLoading,
    data,
    course,
    refetch,
    currentLesson,
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
