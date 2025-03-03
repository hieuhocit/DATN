export { UserType } from '../models/User.js';

export type MessageType = {
  statusCode: number;
  statusText: 'error' | 'success';
  message?: string;
};
