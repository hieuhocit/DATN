// Express
import { Request, Response, NextFunction } from 'express';

// Server response
import serverResponse from '../utils/helpers/reponses.js';

// Messages
import messages from '../configs/messagesConfig.js';

// Services
import CloudinaryService from '../services/CloudinaryService.js';

const CloudinaryController = {
  uploadFile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      const { type } = req.body;

      if (!file) {
        throw serverResponse.createError({
          ...messages.VALIDATION_ERROR,
          message: 'Please upload a file!',
        });
      }
      if (
        !type ||
        (type !== 'image' && type !== 'video' && type !== 'subtitles')
      ) {
        throw serverResponse.createError({
          ...messages.VALIDATION_ERROR,
          message:
            'Please provide a valid file type (image, subtitles (VTT), or video)!',
        });
      }

      const uploadResult = await CloudinaryService.uploadFile(file, type);

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: 'File uploaded successfully!',
          },
          uploadResult
        )
      );
    } catch (error) {
      next(error);
    }
  },
};

export default CloudinaryController;
