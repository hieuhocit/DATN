// Types
import type { NextFunction, Request, Response } from "express";
import type { RequestWithUser } from "../middlewares/authMiddleware.js";

// Services
import NoteService from "../services/NoteService.js";
import UserService from "../services/UserService.js";

// Messages
import messages from "../configs/messagesConfig.js";

// Server response
import serverResponse from "../utils/helpers/responses.js";

const NoteController = {
  getAllNotesByCourseIdAndUserId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = (req as RequestWithUser).user;

      const courseId = req.query.courseId;
      const lessonId = req.query.lessonId;

      const existedUser = await UserService.getUserByEmailWithoutPasswordHash(
        user.email
      );

      if (!existedUser) {
        res.status(messages.NOT_FOUND.statusCode).json(
          serverResponse.createError({
            ...messages.NOT_FOUND,
            message: "Người dùng không tồn tại",
          })
        );
        return;
      }

      let notes: any[] = [];

      if (courseId) {
        notes = await NoteService.getAllNotesByCourseIdAndUserId(
          courseId as string,
          existedUser._id.toString()
        );
      } else if (lessonId) {
        notes = await NoteService.getAllNotesByLessonIdAndUserId(
          lessonId as string,
          existedUser._id.toString()
        );
      }

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Lấy danh sách ghi chú thành công",
          },
          notes
        )
      );
    } catch (error) {
      next(error);
    }
  },
  createNote: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as RequestWithUser).user;
      const { lessonId, courseId, content, position } = req.body;

      const existedUser = await UserService.getUserByEmailWithoutPasswordHash(
        user.email
      );

      if (!existedUser) {
        res.status(messages.NOT_FOUND.statusCode).json(
          serverResponse.createError({
            ...messages.NOT_FOUND,
            message: "Người dùng không tồn tại",
          })
        );
        return;
      }

      const note = await NoteService.createNote({
        userId: existedUser._id,
        lessonId,
        courseId,
        content,
        position,
      });

      res.status(messages.CREATED.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.CREATED,
            message: "Ghi chú đã được tạo thành công",
          },
          note
        )
      );
    } catch (error) {
      next(error);
    }
  },
  deleteNoteByIdAndUserId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = (req as RequestWithUser).user;
      const { id } = req.params;

      const existedUser = await UserService.getUserByEmailWithoutPasswordHash(
        user.email
      );

      if (!existedUser) {
        res.status(messages.NOT_FOUND.statusCode).json(
          serverResponse.createError({
            ...messages.NOT_FOUND,
            message: "Người dùng không tồn tại",
          })
        );
        return;
      }

      await NoteService.deleteNoteByIdAndUserId(id, existedUser._id.toString());

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Ghi chú đã được xoá thành công",
          },
          null
        )
      );
    } catch (error) {
      next(error);
    }
  },
  updateNoteById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as RequestWithUser).user;
      const { id } = req.params;
      const { lessonId, courseId, content, position } = req.body;

      const existedUser = await UserService.getUserByEmailWithoutPasswordHash(
        user.email
      );

      if (!existedUser) {
        res.status(messages.NOT_FOUND.statusCode).json(
          serverResponse.createError({
            ...messages.NOT_FOUND,
            message: "Người dùng không tồn tại",
          })
        );
        return;
      }

      const note = await NoteService.updateNoteById(id, {
        userId: existedUser._id,
        lessonId,
        courseId,
        content,
        position,
      });

      res.status(messages.CREATED.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.CREATED,
            message: "Ghi chú đã được cập nhật thành công",
          },
          note
        )
      );
    } catch (error) {
      next(error);
    }
  },
};

export default NoteController;
