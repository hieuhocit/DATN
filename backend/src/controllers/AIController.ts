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

const conversation: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
  {
    role: "user",
    content: "Xin chào chatbot của tôi!",
  },
  {
    role: "assistant",
    content:
      "Xin chào! Tôi là chatbot có thể giải thích cho bạn từng bước một.",
  },
];

const AIController = {
  chatWithAI: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as RequestWithUser).user;
      const message = req.body.message;

      conversation.push({
        role: "user",
        content: message,
      });

      await AIService.chatWithAI(res, conversation);
    } catch (error) {
      next(error);
    }
  },
};

export default AIController;
