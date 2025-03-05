import jwt, { SignOptions } from 'jsonwebtoken';

export const generateToken = (
  payload: string | Buffer | object,
  secret: jwt.Secret | jwt.PrivateKey,
  expiresIn: SignOptions['expiresIn']
) => {
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn,
  });
};
