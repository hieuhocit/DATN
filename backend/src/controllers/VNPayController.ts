// Express
import { Request, Response, NextFunction } from "express";

// Services
import VNPayService from "../services/VNPayService.js";

// Types
import { RequestWithUser } from "../types/types.js";

// Server response
import serverResponse from "../utils/helpers/responses.js";

// Messages
import messages from "../configs/messagesConfig.js";

// Config
import UserService from "../services/UserService.js";

const VNPayController = {
  createPaymentUrl: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = (req as RequestWithUser).user;

      const existedUser = await UserService.getUserByEmailWithPasswordHash(
        user.email
      );

      if (!existedUser) {
        res.status(messages.NOT_FOUND.statusCode).json(
          serverResponse.createError({
            ...messages.NOT_FOUND,
            message: "Người dùng không tồn tại!",
          })
        );
        return;
      }

      const ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress;

      const { bankCode, language } = req.body;

      const locale = language || "vn";

      const url = await VNPayService.createPaymentUrl({
        userId: existedUser._id,
        bankCode,
        ipAddr: ipAddr as string,
        locale,
      });

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Tạo url thanh toán thành công!",
          },
          {
            url: url,
          }
        )
      );
    } catch (error) {
      next(error);
    }
  },
  vnPayReturn: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = (req as RequestWithUser).user;
      const vnp_Params = req.query;

      const existedUser = await UserService.getUserByEmailWithPasswordHash(
        user.email
      );

      if (!existedUser) {
        res.status(messages.NOT_FOUND.statusCode).json(
          serverResponse.createError({
            ...messages.NOT_FOUND,
            message: "Người dùng không tồn tại!",
          })
        );
        return;
      }

      const result = await VNPayService.vnPayReturn(
        existedUser._id,
        vnp_Params as any
      );
      if (result) {
        res.status(messages.OK.statusCode).json(
          serverResponse.createSuccess(
            {
              ...messages.OK,
              message: "Giao dịch thành công!",
            },
            vnp_Params
          )
        );
      } else {
        res.status(messages.OK.statusCode).json(
          serverResponse.createSuccess(
            {
              ...messages.OK,
              message: "Giao dịch thất bại!",
            },
            vnp_Params
          )
        );
      }
    } catch (error) {
      next(error);
    }
  },
};

export default VNPayController;
