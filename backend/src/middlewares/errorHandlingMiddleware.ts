// Express
import { Request, Response, NextFunction } from 'express';

// multer
import multer from 'multer';

// Messages
import messages from '../configs/messagesConfig.js';

const notFoundError = (req: Request, res: Response) => {
  const responseMessage = messages.NOT_FOUND;
  res.status(responseMessage.statusCode).json(responseMessage);
};

const defaultError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({
        statusCode: 400,
        statusText: 'error',
        message: 'File size does not exceed 100MB',
      });
      return;
    } else {
      res.status(400).json({
        statusCode: 400,
        statusText: 'error',
        message: err.message,
      });
      return;
    }
  }

  const statusCode = err.statusCode || 500;
  const statusText = err.statusText || 'error';
  const message = err.message || 'Internal Server Error!';

  res.status(statusCode).json({
    statusCode: statusCode,
    statusText: statusText,
    message: message,
  });
};

export { notFoundError, defaultError };
