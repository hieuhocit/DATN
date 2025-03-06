// Express
import { Request, Response, NextFunction } from 'express';

// Server response
import serverResponse from '../utils/helpers/reponses.js';

// Message config
import messages from '../configs/messagesConfig.js';

// Verify token
import { verifyToken, generateToken } from '../utils/helpers/tokens.js';

// JWT
import jwt from 'jsonwebtoken';

export type JwtPayLoadType = {
  email: string;
  role: string;
  registerProvider: 'local' | 'google' | 'facebook';
  iat: number;
  exp: number;
};

export type RequestWithUser = Request & {
  user: Pick<JwtPayLoadType, 'email' | 'role' | 'registerProvider'>;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { acc_t: accessToken, ref_t: refreshToken } = req.cookies;

  try {
    if (!accessToken) {
      throw serverResponse.createError({
        ...messages.UNAUTHORIZED,
        message: 'Access token is required',
      });
    }

    const user = verifyToken(accessToken, 'ACCESS') as JwtPayLoadType;

    (req as RequestWithUser).user = {
      email: user.email,
      role: user.role,
      registerProvider: user.registerProvider,
    };

    res.cookie('acc_t', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      await handleRefreshToken(refreshToken, req as RequestWithUser, res, next);
    } else {
      next(error);
    }
  }
};

const handleRefreshToken = async (
  refreshToken: string,
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!refreshToken) {
      throw serverResponse.createError({
        ...messages.UNAUTHORIZED,
        message: 'Refresh token is required',
      });
    }

    const user = verifyToken(refreshToken, 'REFRESH') as JwtPayLoadType;

    const payload = {
      email: user.email,
      role: user.role,
      registerProvider: user.registerProvider,
    };

    req.user = payload;

    const accessToken = generateToken(payload, 'ACCESS', '15m');

    res.cookie('acc_t', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    next();
  } catch (error) {
    next(error);
  }
};
