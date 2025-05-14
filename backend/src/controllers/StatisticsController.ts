import { NextFunction, Request, Response } from "express";
import StatisticsService from "../services/StastisticsService.js";
import messages from "../configs/messagesConfig.js";
import serverResponse from "../utils/helpers/responses.js";
import { RequestWithUser } from "../middlewares/authMiddleware.js";
import UserService from "../services/UserService.js";

const StatisticController = {
  getDashboardStats: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const stats = await StatisticsService.getDashboardStats();
      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Lấy thông tin thống kê thành công",
          },
          stats
        )
      );
    } catch (error) {
      next(error);
    }
  },
  getDashboardStatsForInstructor: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = (req as RequestWithUser).user;

      const existedInstructor =
        await UserService.getUserByEmailWithoutPasswordHash(user.email);

      if (!existedInstructor) {
        res.status(messages.NOT_FOUND.statusCode).json(
          serverResponse.createError({
            ...messages.NOT_FOUND,
            message: "Người dùng không tồn tại",
          })
        );
        return;
      }

      const stats = await StatisticsService.getDashboardStatsForInstructor(
        existedInstructor._id.toString()
      );

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Lấy thông tin thống kê thành công",
          },
          stats
        )
      );
    } catch (error) {
      next(error);
    }
  },
};
export default StatisticController;
