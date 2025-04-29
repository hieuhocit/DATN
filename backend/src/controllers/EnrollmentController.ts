// Types
import type { NextFunction, Request, Response } from "express";
import type { RequestWithUser } from "../middlewares/authMiddleware.js";

// Services
import EnrollmentService from "../services/EnrollmentService.js";
import UserService from "../services/UserService.js";

// Messages
import messages from "../configs/messagesConfig.js";

// Server response
import serverResponse from "../utils/helpers/responses.js";

const ReviewController = {
  getEnrollmentsByUserId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = (req as RequestWithUser).user;

      const existedUser = await UserService.getUserByEmailWithoutPasswordHash(
        user.email
      );

      if (!existedUser) {
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "Người dùng không tồn tại",
        });
      }

      const enrollments = await EnrollmentService.getEnrollmentsByUserId(
        existedUser._id.toString()
      );

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Lấy danh sách khoá học đã đăng ký thành công",
          },
          enrollments
        )
      );
    } catch (error) {
      next(error);
    }
  },
};

export default ReviewController;
