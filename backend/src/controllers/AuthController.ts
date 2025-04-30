// Express
import { Request, Response, NextFunction } from "express";

// Services
import AuthService from "../services/AuthService.js";

// Server response
import serverResponse from "../utils/helpers/responses.js";

// Messages
import messages from "../configs/messagesConfig.js";

// Types
import { RequestWithUser } from "../types/types.js";

const AuthController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password } = req.body;

    try {
      const user = await AuthService.register({
        email,
        name,
        password,
        provider: "local",
      });

      res.status(messages.CREATED.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.CREATED,
            message: "Register successfully!",
          },
          user
        )
      );
    } catch (error) {
      next(error);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    const {
      email,
      password,
      provider,
      googleAccessToken,
      facebookAccessToken,
    } = req.body;

    try {
      const user = await AuthService.login(res, {
        email,
        password,
        provider,
        googleAccessToken,
        facebookAccessToken,
      });

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Login successfully!",
          },
          user
        )
      );
    } catch (error) {
      next(error);
    }
  },
  forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    try {
      await AuthService.sendResetCode(email);

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess({
          ...messages.OK,
          message: "Reset code has been sent to your email!",
        })
      );
    } catch (error) {
      next(error);
    }
  },
  verifyResetCode: async (req: Request, res: Response, next: NextFunction) => {
    const { email, resetCode } = req.body;

    try {
      const result = await AuthService.verifyResetCode(email, resetCode);

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Reset code verified!",
          },
          { resetToken: result }
        )
      );
    } catch (error) {
      next(error);
    }
  },
  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    const { resetToken, password } = req.body;

    try {
      await AuthService.resetPassword(resetToken, password);

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess({
          ...messages.OK,
          message: "Password has been reset!",
        })
      );
    } catch (error) {
      next(error);
    }
  },
  changePassword: async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as RequestWithUser).user;
    const { oldPassword, newPassword } = req.body;
    try {
      const data = await AuthService.changePassword(
        user.email,
        oldPassword,
        newPassword,
        user.refreshToken || ""
      );

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Password has been changed!",
          },
          data
        )
      );
    } catch (error) {
      next(error);
    }
  },
  logout: async (req: Request, res: Response, next: NextFunction) => {
    // const { acc_t: accessToken, ref_t: refreshToken } = req.cookies;
    // const email = (req as RequestWithUser).user.email;
    // const jit = (req as RequestWithUser).user.jit;

    const user = (req as RequestWithUser).user;

    try {
      await AuthService.logout(
        {
          // email,
          // accessToken,
          refreshToken: user.refreshToken || "",
          // jit,
        },
        res
      );

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess({
          ...messages.OK,
          message: "Đăng xuất thành công!",
        })
      );
    } catch (error) {
      next(error);
    }
  },
  verifyToken: async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as RequestWithUser).user;

    const data = await AuthService.getUserByEmail(user.email);

    res.status(messages.OK.statusCode).json(
      serverResponse.createSuccess(
        {
          ...messages.OK,
          message: "Token verified successfully!",
        },
        data
      )
    );
  },
};

export default AuthController;
