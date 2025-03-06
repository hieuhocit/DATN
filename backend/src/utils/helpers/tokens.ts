import jwt, { SignOptions } from 'jsonwebtoken';

export const generateToken = (
  payload: string | Buffer | object,
  type: 'ACCESS' | 'REFRESH',
  expiresIn: SignOptions['expiresIn']
) => {
  const secret =
    type === 'ACCESS'
      ? (process.env.ACCESS_TOKEN_SECRET as string)
      : (process.env.REFRESH_TOKEN_SECRET as string);

  return jwt.sign(payload, secret, {
    expiresIn: expiresIn,
  });
};

export const verifyToken = (token: string, type: 'ACCESS' | 'REFRESH') => {
  const secret =
    type === 'ACCESS'
      ? (process.env.ACCESS_TOKEN_SECRET as string)
      : (process.env.REFRESH_TOKEN_SECRET as string);

  return jwt.verify(token, secret);
};
