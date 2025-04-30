// Types
import type { NextFunction, Request, Response } from "express";

// Services
import CartService from "../services/CartService.js";
import UserService from "../services/UserService.js";

// Messages
import messages from "../configs/messagesConfig.js";

// Server response
import serverResponse from "../utils/helpers/responses.js";

// Type
import type { RequestWithUser } from "../middlewares/authMiddleware.js";

const CartController = {
  getCartByUserId: async (req: Request, res: Response, next: NextFunction) => {
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

      const cart = await CartService.getCartByUserId(existedUser._id);

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Lấy giỏ hàng thành công",
          },
          cart
        )
      );
    } catch (error) {
      next(error);
    }
  },
  createCartItem: async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as RequestWithUser).user;
    try {
      const { courseId } = req.body;

      const existedUser = await UserService.getUserByEmailWithoutPasswordHash(
        user.email
      );

      if (!existedUser) {
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "Người dùng không tồn tại",
        });
      }

      const cartItem = await CartService.createCartItem({
        courseId,
        userId: existedUser._id,
      });

      res.status(messages.CREATED.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.CREATED,
            message: "Đã thêm khoá học vào giỏ hàng thành công",
          },
          cartItem
        )
      );
    } catch (error) {
      next(error);
    }
  },
  deleteCartItemByCourseIdAndUserId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = (req as RequestWithUser).user;
    try {
      const { courseId } = req.params;

      const existedUser = await UserService.getUserByEmailWithoutPasswordHash(
        user.email
      );

      if (!existedUser) {
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "Người dùng không tồn tại",
        });
      }

      const result = await CartService.deleteCartItemByCourseIdAndUserId(
        courseId,
        existedUser._id
      );

      if (!result) {
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "Không tìm thấy khoá học trong giỏ hàng",
        });
      }

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Khoá học đã được xóa khỏi giỏ hàng thành công",
          },
          null
        )
      );
    } catch (error) {
      next(error);
    }
  },
  addMultipleCoursesToCart: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = (req as RequestWithUser).user;
    try {
      const { courseIds } = req.body;

      const existedUser = await UserService.getUserByEmailWithoutPasswordHash(
        user.email
      );

      if (!existedUser) {
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "Người dùng không tồn tại",
        });
      }

      const items = await CartService.addMultipleCoursesToCart(
        existedUser._id,
        courseIds
      );

      res.status(messages.CREATED.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.CREATED,
            message: "Đã thêm khoá học vào giỏ hàng thành công",
          },
          items
        )
      );
    } catch (error) {
      next(error);
    }
  },
};

export default CartController;
