import { MessageType } from '../types/types.js';

type MessageKey =
  | 'SERVER_ERROR'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'NOT_FOUND'
  | 'ALREADY_EXISTS'
  | 'FORBIDDEN'
  | 'VALIDATION_ERROR'
  | 'TOO_MANY_REQUESTS'
  | 'CREATED'
  | 'UPDATED'
  | 'DELETED'
  | 'OK';

const messages: Record<MessageKey, MessageType> = {
  OK: {
    statusCode: 200,
    statusText: 'success',
    message: 'Success!',
  },
  SERVER_ERROR: {
    statusCode: 500,
    statusText: 'error',
    message: 'Internal server error!',
  },
  BAD_REQUEST: {
    statusCode: 400,
    statusText: 'error',
    message: 'Invalid request parameters!',
  },
  UNAUTHORIZED: {
    statusCode: 401,
    statusText: 'error',
    message: 'Authentication failed!',
  },
  NOT_FOUND: {
    statusCode: 404,
    statusText: 'error',
    message: 'Not found!',
  },
  ALREADY_EXISTS: {
    statusCode: 409,
    statusText: 'error',
    message: 'Resource already exists!',
  },
  FORBIDDEN: {
    statusCode: 403,
    statusText: 'error',
    message: 'Access forbidden!',
  },
  VALIDATION_ERROR: {
    statusCode: 422,
    statusText: 'error',
    message: 'Validation failed!',
  },
  TOO_MANY_REQUESTS: {
    statusCode: 429,
    statusText: 'error',
    message: 'Too many requests, please try again later!',
  },
  // SUCCESS
  CREATED: {
    statusCode: 201,
    statusText: 'success',
    message: 'Create new resource successfully!',
  },
  UPDATED: {
    statusCode: 200,
    statusText: 'success',
    message: 'Update resource successfully!',
  },
  DELETED: {
    statusCode: 200,
    statusText: 'success',
    message: 'Delete resource successfully!',
  },
};

export default messages;
