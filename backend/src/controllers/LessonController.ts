// Types
import type { NextFunction, Request, Response } from "express";

// Services
import LessonService from "../services/LessonService.js";

// Messages
import messages from "../configs/messagesConfig.js";

// Server response
import serverResponse from "../utils/helpers/responses.js";

const LessonController = {
  getAllLessons: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lessons = await LessonService.getAllLessons();

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Lấy danh sách bài học thành công",
          },
          lessons
        )
      );
    } catch (error) {
      next(error);
    }
  },
  getLessonById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const lesson = await LessonService.getLessonById(id);

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Lấy bài học thành công",
          },
          lesson
        )
      );
    } catch (error) {
      next(error);
    }
  },
  createLesson: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        title,
        description,
        courseId,
        duration,
        orderIndex,
        videoUrl,
        publicId,
        isFree,
      } = req.body;

      const lesson = await LessonService.createLesson({
        title,
        description,
        courseId,
        duration,
        orderIndex,
        videoUrl,
        isFree,
        publicId,
      });

      res.status(messages.CREATED.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.CREATED,
            message: "Bài học đã được tạo thành công",
          },
          lesson
        )
      );
    } catch (error) {
      next(error);
    }
  },
  deleteLessonById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await LessonService.deleteLessonById(id);

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Bài học đã được xoá thành công",
          },
          null
        )
      );
    } catch (error) {
      next(error);
    }
  },
  updateLessonById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        courseId,
        orderIndex,
        videoUrl,
        duration,
        isFree,
        publicId,
      } = req.body;

      const course = await LessonService.updateLessonById(id, {
        title,
        description,
        courseId,
        duration,
        orderIndex,
        videoUrl,
        isFree,
        publicId,
      });

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Bài học đã được cập nhật thành công",
          },
          course
        )
      );
    } catch (error) {
      next(error);
    }
  },
};

export default LessonController;
