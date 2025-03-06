// Express
import { Router } from 'express';

// Controllers
import UserController from '../controllers/UserController.js';

// Auth
import { authMiddleware } from '../middlewares/authMiddleware.js';

// Create router
const UserRoutes = Router();

// Routes
UserRoutes.get('/me', authMiddleware, UserController.me);

export default UserRoutes;
