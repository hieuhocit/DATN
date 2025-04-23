// Types
import type { NextFunction, Request, Response } from "express";
import type { RequestWithUser } from "../middlewares/authMiddleware.js";

// Services
import ReviewService from "../services/ReviewService.js";
import UserService from "../services/UserService.js";

// Messages
import messages from "../configs/messagesConfig.js";

// Server response
import serverResponse from "../utils/helpers/responses.js";

const ReviewController = {
  getAllReviewsByCourseId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courseId = req.query.courseId;

      const reviews = await ReviewService.getAllReviewsByCourseId(
        courseId as string
      );

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Lấy danh sách đánh giá thành công",
          },
          reviews
        )
      );
    } catch (error) {
      next(error);
    }
  },
  createReview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as RequestWithUser).user;
      const { courseId, rating, comment } = req.body;

      const existedUser = await UserService.getUserByEmailWithoutPasswordHash(
        user.email
      );

      if (!existedUser) {
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "Người dùng không tồn tại",
        });
      }

      const review = await ReviewService.createReview({
        userId: existedUser._id,
        courseId,
        rating,
        comment,
      });

      res.status(messages.CREATED.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.CREATED,
            message: "Tạo đánh giá thành công",
          },
          review
        )
      );
    } catch (error) {
      next(error);
    }
  },
  deleteReviewByIdAndUserId: async (
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

      await ReviewService.deleteReviewByIdAndUserId(
        id,
        existedUser._id.toString()
      );

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess({
          ...messages.OK,
          message: "Xóa đánh giá thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },
  updateReviewByIdAndUserId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = (req as RequestWithUser).user;

      const { id } = req.params;
      const { rating, comment } = req.body;

      const existedUser = await UserService.getUserByEmailWithoutPasswordHash(
        user.email
      );

      if (!existedUser) {
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "Người dùng không tồn tại",
        });
      }

      const review = await ReviewService.updateReviewByIdAndUserId(id, {
        userId: existedUser._id,
        rating,
        comment,
      });

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Cập nhật đánh giá thành công",
          },
          review
        )
      );
    } catch (error) {
      next(error);
    }
  },
};

export default ReviewController;
