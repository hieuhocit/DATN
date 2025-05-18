// Express
import { Request, Response, NextFunction } from "express";

// Services
import UserService from "../services/UserService.js";

// Server response
import serverResponse from "../utils/helpers/responses.js";

// Messages
import messages from "../configs/messagesConfig.js";

// Types
import { RequestWithUser } from "../types/types.js";
import User from "../models/User.js";

const UserController = {
  me: async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as RequestWithUser).user;
    try {
      const data = await UserService.getUserByEmailWithoutPasswordHash(
        user.email
      );

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Get user successfully!",
          },
          data
        )
      );
    } catch (error) {
      next(error);
    }
  },
  updateProfile: async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as RequestWithUser).user;
    const { name, bio, avatarUrl } = req.body;
    try {
      const data = await UserService.updateProfile(user.email, {
        name,
        bio,
        avatarUrl,
      });

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Cập nhật thông tin cá nhân thành công!",
          },
          data
        )
      );
    } catch (error) {
      next(error);
    }
  },
  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const data = await UserService.getUserById(id);

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Get user successfully!",
          },
          data
        )
      );
    } catch (error) {
      next(error);
    }
  },
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await UserService.getAllUsers();

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Get all users successfully!",
          },
          data
        )
      );
    } catch (error) {
      next(error);
    }
  },
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, bio, role, password, provider, avatarUrl } = req.body;

    try {
      const data = await UserService.createUser({
        email,
        name,
        password,
        bio: bio || "",
        role: role || "user",
        provider: provider || "local",
        avatarUrl: avatarUrl || "",
      });

      res.status(messages.CREATED.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.CREATED,
            message: "Tao người dùng thành công!",
          },
          data
        )
      );
    } catch (error) {
      next(error);
    }
  },
  deleteUserById: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const user = (req as RequestWithUser).user;

      const existedUser = await UserService.getUserByEmailWithPasswordHash(
        user.email
      );

      if (!existedUser) {
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "Tài khoản hiện đăng nhập không tồn tại!",
        });
      }

      if (existedUser._id.toString() === id) {
        throw serverResponse.createError({
          ...messages.FORBIDDEN,
          message: "Không thể xóa tài khoản của chính mình!",
        });
      }

      const deletedUser = await UserService.getUserById(id);

      if (!deletedUser) {
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "Người dùng không tồn tại!",
        });
      }

      if (deletedUser.role === "admin") {
        throw serverResponse.createError({
          ...messages.FORBIDDEN,
          message: "Không thể xóa tài khoản quản trị viên!",
        });
      }

      await UserService.deleteUserById(id);

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess({
          ...messages.OK,
          message: "Xoá người dùng thành công!",
        })
      );
    } catch (error) {
      next(error);
    }
  },
  updateUserById: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { email, name, bio, role, password, provider, avatarUrl } = req.body;

    try {
      const data = await UserService.updateUserById(id, {
        email,
        name,
        password,
        bio: bio || "",
        role: role || "user",
        provider: provider || "local",
        avatarUrl: avatarUrl || "",
      });

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Cập nhật người dùng thành công!",
          },
          data
        )
      );
    } catch (error) {
      next(error);
    }
  },
  becomeInstructor: async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as RequestWithUser).user;

    try {
      const data = await UserService.becomeInstructor(user.email);

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Bạn đã trở thành giảng viên!",
          },
          data
        )
      );
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;
