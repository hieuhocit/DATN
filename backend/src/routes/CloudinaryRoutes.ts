// Express
import { Router } from 'express';

// Controllers
import CloudinaryController from '../controllers/CloudinaryController.js';

// Auth
import { authMiddleware } from '../middlewares/authMiddleware.js';

// Multer
import { upload } from '../configs/multerConfig.js';

// Create router
const CloudinaryRoutes = Router();

// Routes
CloudinaryRoutes.post(
  '/upload-file',
  authMiddleware,
  upload.single('file'),
  CloudinaryController.uploadFile
);

export default CloudinaryRoutes;
