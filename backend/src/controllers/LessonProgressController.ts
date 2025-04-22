// Types
import type { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../middlewares/authMiddleware.js";

// Services
import LessonProgressService from "../services/LessonProgressService.js";

// Messages
import messages from "../configs/messagesConfig.js";

// Server response
import serverResponse from "../utils/helpers/responses.js";
import UserService from "../services/UserService.js";

const LessonProgressController = {
  getAllLessonProgressesByUserId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = (req as RequestWithUser).user;
    try {
      const existedUser = await UserService.getUserByEmailWithoutPasswordHash(
        user.email
      );

      if (!existedUser) {
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "Người dùng không tồn tại",
        });
      }

      const lessonProgresses =
        await LessonProgressService.getAllLessonProgressesByUserId(
          existedUser._id
        );

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Lấy danh sách tiến trình bài học thành công",
          },
          lessonProgresses
        )
      );
    } catch (error) {
      next(error);
    }
  },
  getLessonProgressById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const lessonProgress = await LessonProgressService.getLessonProgressById(
        id
      );

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Lấy tiến trình bài học thành công",
          },
          lessonProgress
        )
      );
    } catch (error) {
      next(error);
    }
  },
  createLessonProgress: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = (req as RequestWithUser).user;

      const { lessonId } = req.body;

      const existedUser = await UserService.getUserByEmailWithoutPasswordHash(
        user.email
      );

      if (!existedUser) {
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "Người dùng không tồn tại",
        });
      }

      const lessonProgress = await LessonProgressService.createLessonProgress({
        userId: existedUser._id,
        lessonId: lessonId,
      });

      res.status(messages.CREATED.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.CREATED,
            message: "Tiến trình bài học đã được tạo thành công",
          },
          lessonProgress
        )
      );
    } catch (error) {
      next(error);
    }
  },
  updateLessonProgressById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { progress, lastWatchPosition } = req.body;

      const lessonProgress =
        await LessonProgressService.updateLessonProgressById(id, {
          progress,
          lastWatchPosition,
        });

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Tiến trình bài học đã được cập nhật thành công",
          },
          lessonProgress
        )
      );
    } catch (error) {
      next(error);
    }
  },
};

export default LessonProgressController;
