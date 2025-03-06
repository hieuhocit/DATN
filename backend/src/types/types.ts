export { UserCreateInput, UserLoginInput } from '../services/AuthService.js';
export { UserType } from '../models/User.js';
export {
  RequestWithUser,
  JwtPayLoadType,
} from '../middlewares/authMiddleware.js';
export { PasswordResetType } from '../models/PasswordReset.js';

export type MessageType = {
  statusCode: number;
  statusText: 'error' | 'success';
  message?: string;
};

export type ErrorResponseType = Record<
  string,
  {
    field: string;
    message: string;
  }
>;
