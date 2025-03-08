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

// Models
import RefreshToken from '../models/RefreshToken.js';

export type JwtPayLoadType = {
  email: string;
  role: 'user' | 'instructor' | 'admin';
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
    const storedToken = await RefreshToken.findOne({ token: refreshToken });

    if (!storedToken) {
      throw serverResponse.createError({
        ...messages.UNAUTHORIZED,
        message: 'Refresh token is invalid',
      });
    }

    if (storedToken.expiresAt.getTime() < Date.now()) {
      throw serverResponse.createError({
        ...messages.UNAUTHORIZED,
        message: 'Refresh token has expired',
      });
    }

    const payload = {
      email: storedToken.userEmail,
      role: storedToken.userRole,
      registerProvider: storedToken.userRegisterProvider,
    };

    req.user = payload;

    const newAccessToken = generateToken(payload, 'ACCESS', '15m');
    const newRefreshToken = generateToken(payload, 'REFRESH', '7d');

    const session = await RefreshToken.startSession();

    session.startTransaction();

    try {
      await storedToken.deleteOne({ session });
      await RefreshToken.create(
        {
          token: newRefreshToken,
          userEmail: payload.email,
          userRole: payload.role,
          userRegisterProvider: payload.registerProvider,
          expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
        },
        {
          session: session,
        }
      );

      session.commitTransaction();

      res.cookie('acc_t', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
      });

      res.cookie('ref_t', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });

      next();
    } catch (error) {
      await session.abortTransaction();
      throw serverResponse.createError({
        ...messages.SERVER_ERROR,
        message: 'Failed to refresh token',
      });
    } finally {
      session.endSession();
    }
  } catch (error) {
    next(error);
  }
};
