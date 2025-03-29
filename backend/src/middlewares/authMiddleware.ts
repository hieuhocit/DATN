// Express
import { Request, Response, NextFunction } from 'express';

// Server response
import serverResponse from '../utils/helpers/responses.js';

// Message config
import messages from '../configs/messagesConfig.js';

// Verify token
import { verifyToken, generateToken } from '../utils/helpers/tokens.js';

// JWT
import jwt from 'jsonwebtoken';

// Redis
import { getRedisClient } from '../db/redisClient.js';

// UUID
import { v4 as uuidv4 } from 'uuid';

export type JwtPayLoadType = {
  email: string;
  role: 'user' | 'instructor' | 'admin';
  registerProvider: 'local' | 'google' | 'facebook';
  jit: string;
  iat: number;
  exp: number;
};

export type RequestWithUser = Request & {
  user: Pick<JwtPayLoadType, 'email' | 'role' | 'registerProvider' | 'jit'>;
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

    const redisClient = getRedisClient();

    const isAccessTokenInList = await redisClient.hGet(
      `TOKEN_LIST:${user.email}:${user.jit}`,
      `${accessToken}:${user.jit}`
    );

    // Check if the access token does not exist in the TOKEN_LIST (revoked)
    if (!isAccessTokenInList) {
      throw serverResponse.createError({
        ...messages.UNAUTHORIZED,
        message: 'Access token is revoked',
      });
    }

    (req as RequestWithUser).user = {
      email: user.email,
      role: user.role,
      registerProvider: user.registerProvider,
      jit: user.jit,
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
    const decoded = verifyToken(refreshToken, 'REFRESH') as JwtPayLoadType;

    const redisClient = getRedisClient();

    const isRefreshTokenInList = await redisClient.hGet(
      `TOKEN_LIST:${decoded.email}:${decoded.jit}`,
      `${refreshToken}:${decoded.jit}`
    );

    // Check if the refresh token does not exist in the TOKEN_LIST (revoked)
    if (!isRefreshTokenInList) {
      throw serverResponse.createError({
        ...messages.UNAUTHORIZED,
        message: 'Refresh token is revoked',
      });
    }

    const payload = {
      email: decoded.email,
      role: decoded.role,
      jit: uuidv4(),
      registerProvider: decoded.registerProvider,
    };

    const newAccessToken = generateToken(payload, 'ACCESS', '15m');
    const newRefreshToken = generateToken(payload, 'REFRESH', '7d');

    redisClient.del(`TOKEN_BLACK_LIST:${decoded.email}:${decoded.jit}`);

    redisClient.hSet(`TOKEN_LIST:${payload.email}:${payload.jit}`, {
      [`${newAccessToken}:${payload.jit}`]: 0,
      [`${newRefreshToken}:${payload.jit}`]: 0,
    });

    (req as RequestWithUser).user = {
      email: payload.email,
      role: payload.role,
      registerProvider: payload.registerProvider,
      jit: payload.jit,
    };

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
    next(error);
  }
};
