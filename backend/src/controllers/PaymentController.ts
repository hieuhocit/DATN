// Types
import type { NextFunction, Request, Response } from "express";
import type { RequestWithUser } from "../middlewares/authMiddleware.js";

// Services
import PaymentService from "../services/PaymentService.js";
import UserService from "../services/UserService.js";

// Messages
import messages from "../configs/messagesConfig.js";

// Server response
import serverResponse from "../utils/helpers/responses.js";

const PaymentController = {
  getAllPayments: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payments = await PaymentService.getAllPayments();

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Lấy danh sách thanh toán thành công",
          },
          payments
        )
      );
    } catch (error) {
      next(error);
    }
  },
  deletePaymentById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      await PaymentService.deletePaymentById(id);

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess({
          ...messages.OK,
          message: "Xóa thanh toán thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },
  updatePaymentById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = (req as RequestWithUser).user;
      const { id } = req.params;

      const { amount, paymentDetails } = req.body;

      const existedUser = await UserService.getUserByEmailWithoutPasswordHash(
        user.email
      );

      if (!existedUser) {
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "Người dùng không tồn tại",
        });
      }

      const payment = await PaymentService.updatePaymentById(id, {
        amount,
        paymentDetails,
      });

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Cập nhật thanh toán thành công",
          },
          payment
        )
      );
    } catch (error) {
      next(error);
    }
  },
};

export default PaymentController;
