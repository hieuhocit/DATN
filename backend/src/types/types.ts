export { UserCreateInput } from '../services/AuthService.js';
export { UserType } from '../models/User.js';

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
