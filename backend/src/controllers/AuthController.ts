// Express
import { Request, Response, NextFunction } from 'express';

// Services
import AuthService from '../services/AuthService.js';

// Server response
import serverResponse from '../utils/helpers/reponses.js';

// Messages
import messages from '../configs/messagesConfig.js';

const AuthController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password, avatarUrl, registerProvider } = req.body;

    try {
      const user = await AuthService.register({
        email,
        name,
        password,
        registerProvider,
        avatarUrl,
      });

      res.status(messages.CREATED.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.CREATED,
            message: 'Register successfully!',
          },
          user
        )
      );
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
