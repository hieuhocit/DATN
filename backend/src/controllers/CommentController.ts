// Types
import type { NextFunction, Request, Response } from "express";
import type { RequestWithUser } from "../middlewares/authMiddleware.js";

// Services
import CommentService from "../services/CommentService.js";
import UserService from "../services/UserService.js";

// Messages
import messages from "../configs/messagesConfig.js";

// Server response
import serverResponse from "../utils/helpers/responses.js";

const CommentController = {
  getAllCommentsByLessonId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const lessonId = req.query.lessonId;

      const comments = await CommentService.getAllCommentsByLessonId(
        lessonId as string
      );

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Lấy danh sách đánh bình luận thành công",
          },
          comments
        )
      );
    } catch (error) {
      next(error);
    }
  },
  createComment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as RequestWithUser).user;
      const { lessonId, content, parentId } = req.body;

      const existedUser = await UserService.getUserByEmailWithoutPasswordHash(
        user.email
      );

      if (!existedUser) {
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "Người dùng không tồn tại",
        });
      }

      const comment = await CommentService.createComment({
        userId: existedUser._id,
        lessonId,
        content,
        parentId,
      });

      res.status(messages.CREATED.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.CREATED,
            message: "Tạo bình luận thành công",
          },
          comment
        )
      );
    } catch (error) {
      next(error);
    }
  },
  deleteCommentByIdAndUserId: async (
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
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "Người dùng không tồn tại",
        });
      }

      await CommentService.deleteCommentByIdAndUserId(
        id,
        existedUser._id.toString()
      );

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess({
          ...messages.OK,
          message: "Xóa bình luận thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },
  updateCommentByIdAndUserId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = (req as RequestWithUser).user;

      const { id } = req.params;
      const { content } = req.body;

      const existedUser = await UserService.getUserByEmailWithoutPasswordHash(
        user.email
      );

      if (!existedUser) {
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "Người dùng không tồn tại",
        });
      }

      const review = await CommentService.updateCommentByIdAndUserId(id, {
        userId: existedUser._id,
        content,
      });

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Cập nhật bình luận thành công",
          },
          review
        )
      );
    } catch (error) {
      next(error);
    }
  },
};

export default CommentController;
