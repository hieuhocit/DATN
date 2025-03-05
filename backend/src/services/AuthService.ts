// Models
import User, { UserType } from '../models/User.js';

// Bcrypt
import bcrypt from 'bcryptjs';

// Server response
import serverResponse from '../utils/helpers/reponses.js';

// Messages
import messages from '../configs/messagesConfig.js';

// Tokens
import { generateToken } from '../utils/helpers/tokens.js';

// Types
import { Response } from 'express';

// Services
import GoogleService, { GoogleUserInfo } from './GoogleService.js';
import FacebookService, { FacebookUserInfo } from './FacebookService.js';

export type UserCreateInput = Pick<UserType, 'email' | 'name'> & {
  password: string;
  provider: 'local' | 'google' | 'facebook';
  avatarUrl?: string;
};

export type UserLoginInput = {
  email?: string;
  password?: string;
  googleAccessToken?: string;
  facebookAccessToken?: string;
  provider: 'local' | 'google' | 'facebook';
};

const AuthService = {
  register: async function (data: UserCreateInput) {
    const existedUser = await User.findOne({ email: data.email });

    if (existedUser) {
      const providerMessages = {
        google:
          'Your account is connected to Google. Please log in with Google.',
        facebook:
          'Your account is connected to Facebook. Please log in with Facebook',
        default: 'Account already exists.',
      };

      const provider =
        existedUser.registerProvider as keyof typeof providerMessages;

      const message = providerMessages[provider] || providerMessages.default;

      throw serverResponse.createError({
        ...messages.ALREADY_EXISTS,
        message,
      });
    }

    let passwordHash = '';
    if (data.provider === 'local') {
      passwordHash = bcrypt.hashSync(data.password, 10);
    }

    const newUser = new User({
      email: data.email,
      name: data.name,
      passwordHash,
      registerProvider: data.provider,
      avatarUrl: data?.avatarUrl || '',
    });

    const result = await newUser.save();

    return result;
  },
  login: async function (res: Response, data: UserLoginInput) {
    // Provider messages for authentication errors
    const providerMessages = {
      google: 'Your account is connected to Google. Please log in with Google.',
      facebook:
        'Your account is connected to Facebook. Please log in with Facebook',
    };

    // Helper function to generate and set tokens
    const setAuthTokens = (user: UserType) => {
      const tokenPayload = {
        email: user.email,
        role: user.role,
        registerProvider: user.registerProvider,
      };

      const accessToken = generateToken(
        tokenPayload,
        process.env.ACCESS_TOKEN_SECRET as string,
        '15m'
      );

      const refreshToken = generateToken(
        tokenPayload,
        process.env.REFRESH_TOKEN_SECRET as string,
        '7d'
      );

      res.cookie('acc_t', accessToken, {
        httpOnly: true,
        secure: true,
      });
      res.cookie('ref_t', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: true,
      });
    };

    let user: UserType;

    switch (data.provider) {
      case 'local': {
        const existedUser = await User.findOne({ email: data.email });

        if (!existedUser) {
          throw serverResponse.createError({
            ...messages.NOT_FOUND,
            message: 'Account not found!',
          });
        }

        if (existedUser.registerProvider !== 'local') {
          throw serverResponse.createError({
            ...messages.BAD_REQUEST,
            message:
              providerMessages[
                existedUser.registerProvider as keyof typeof providerMessages
              ] || 'Please log in with your original registration method.',
          });
        }

        const isPasswordMatch = bcrypt.compareSync(
          data.password as string,
          existedUser.passwordHash
        );

        if (!isPasswordMatch) {
          throw serverResponse.createError({
            ...messages.BAD_REQUEST,
            message: 'Password is incorrect!',
          });
        }

        user = existedUser;
        break;
      }

      case 'google':
      case 'facebook': {
        const provider = data.provider;

        const service =
          provider === 'facebook' ? FacebookService : GoogleService;

        const tokenField =
          provider === 'facebook' ? 'facebookAccessToken' : 'googleAccessToken';

        const accessToken = data[tokenField] as string;

        const userInfo = await service.getUserInfo(accessToken);

        // Extract common profile properties
        const email = userInfo.email;
        const name = userInfo.name;

        const avatarUrl =
          provider === 'facebook'
            ? (userInfo.picture as FacebookUserInfo['picture']).data.url
            : (userInfo.picture as GoogleUserInfo['picture']);

        // Find or create user
        let existedUser = await User.findOne({ email });

        if (!existedUser) {
          existedUser = await this.register({
            email,
            name,
            avatarUrl,
            password: '',
            provider: data.provider,
          });
        }

        user = existedUser;
        break;
      }

      default: {
        throw serverResponse.createError({
          ...messages.BAD_REQUEST,
          message: 'Invalid provider specified.',
        });
      }
    }

    if (!user) {
      throw serverResponse.createError({
        ...messages.SERVER_ERROR,
        message: 'Failed to authenticate user.',
      });
    }

    // Generate and set authentication tokens
    setAuthTokens(user);

    return user;
  },
};

export default AuthService;
