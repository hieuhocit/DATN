// Express
import { Request, Response, NextFunction } from 'express';

// Services
import UserService from '../services/UserService.js';

// Server response
import serverResponse from '../utils/helpers/reponses.js';

// Messages
import messages from '../configs/messagesConfig.js';

// Types
import { RequestWithUser } from '../types/types.js';

const UserController = {
  me: async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as RequestWithUser).user;
    try {
      const data = await UserService.me(user.email);

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: 'Get user successfully!',
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
