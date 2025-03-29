// Purpose: Configures multer for file uploads.
import multer from 'multer';

// Server response
import serverResponse from '../utils/helpers/responses.js';

// Messages
import messages from '../configs/messagesConfig.js';

const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 100, // 100MB
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|mp4|vtt)$/)) {
      return callback(
        serverResponse.createError({
          ...messages.VALIDATION_ERROR,
          message: 'Please upload an image, subtitles (VTT), or video file!',
        })
      );
    }
    callback(null, true);
  },
});

export { upload };
