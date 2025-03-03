import { Request, Response, NextFunction } from 'express';
import messages from '../configs/messages.js';

const ErrorHandler = {
  notFoundError: (req: Request, res: Response) => {
    const responseMessage = messages.NOT_FOUND;
    res.status(responseMessage.statusCode).json(responseMessage);
  },
  defaultError: (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const statusText = err.statusText || 'error';
    const message = err.message || 'Internal Server Error!';

    res.status(statusCode).json({
      statusCode: statusCode,
      statusText: statusText,
      message: message,
    });
  },
};

export default ErrorHandler;
