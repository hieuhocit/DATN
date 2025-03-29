import { getRedisClient } from '../../db/redisClient.js';

export const saveAccessAndRefreshTokensToRedis = async (
  email: string,
  accessToken: string,
  refreshToken: string,
  jit: string
) => {
  const redisClient = getRedisClient();

  await redisClient.hSet(`TOKEN_LIST:${email}`, {
    [`${accessToken}:${jit}`]: 0,
    [`${refreshToken}:${jit}`]: 0,
  });
};

export const deleteTokenFromRedis = async (
  email: string,
  token: string,
  jit: string
) => {
  const redisClient = getRedisClient();

  await redisClient.hDel(`TOKEN_LIST:${email}`, `${token}:${jit}`);
};

export const deleteAccessAndRefreshTokensFromRedis = async (
  email: string,
  accessToken: string,
  refreshToken: string,
  jit: string
) => {
  await Promise.all([
    deleteTokenFromRedis(email, accessToken, jit),
    deleteTokenFromRedis(email, refreshToken, jit),
  ]);
};

export const deleteAllTokensFromRedis = async (email: string) => {
  const redisClient = getRedisClient();
  await redisClient.del(`TOKEN_LIST:${email}`);
};

export const checkTokenInRedis = async (
  email: string,
  token: string,
  jit: string
) => {
  const redisClient = getRedisClient();

  return await redisClient.hExists(`TOKEN_LIST:${email}`, `${token}:${jit}`);
};
