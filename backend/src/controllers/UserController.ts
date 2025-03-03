// Express
import { Request, Response, NextFunction } from 'express';

// Services
import UserServices from '../services/UserServices.js';

// Bcrypt
import bcrypt from 'bcryptjs';

// Server response
import serverResponse from '../utils/helpers/reponses.js';

// Messages
import messages from '../configs/messages.js';

const UserController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password, avatarUrl, registerProvider } = req.body;

    try {
      const existedUser = await UserServices.findByEmail(email);

      if (existedUser) {
        const providerMessages = {
          google:
            'Your account is connected to Google. Please log in with Google.',
          facebook:
            'Your account is connected to Facebook. Please log in with Facebook',
          default: 'Account already exists.',
        };

        const message =
          providerMessages[
            existedUser.registerProvider as keyof typeof providerMessages
          ] || providerMessages.default;

        return next(
          serverResponse.createError({
            ...messages.ALREADY_EXISTS,
            message,
          })
        );
      }

      let passwordHash = '';
      if (password) {
        passwordHash = bcrypt.hashSync(password, 10);
      }

      const user = await UserServices.create({
        email,
        name,
        passwordHash,
        avatarUrl: avatarUrl || '',
        registerProvider: registerProvider || 'local',
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
  login: async (req: Request, res: Response) => {},
};

export default UserController;
