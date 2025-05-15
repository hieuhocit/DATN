// Types
import type { NextFunction, Request, Response } from "express";

// OpenAI
import OpenAI from "openai";

// Services
import AIService from "../services/AIService.js";
import UserService from "../services/UserService.js";

// Messages
import messages from "../configs/messagesConfig.js";

// Server response
import serverResponse from "../utils/helpers/responses.js";

// Type
import type { RequestWithUser } from "../middlewares/authMiddleware.js";

const AIController = {
  chatWithAI: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, lessonId, message } = req.body;

      const user = (req as RequestWithUser).user;

      const existedUser = await UserService.getUserByEmailWithPasswordHash(
        user.email
      );

      if (!existedUser) {
        return serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "Người dùng không tồn tại",
        });
      }

      const result = await AIService.chatWithAI({
        courseId,
        lessonId,
        userId: existedUser._id.toString(),
        message,
      });

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: "Trả lời thành công",
          },
          result
        )
      );
    } catch (error) {
      next(error);
    }
  },
};

export default AIController;
