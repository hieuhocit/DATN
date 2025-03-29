// Express
import { Router } from 'express';

// Controllers
import AuthController from '../controllers/AuthController.js';

// Validate
import {
  validateRegister,
  validateLogin,
  validateResetPassword,
  validateChangePassword,
} from '../middlewares/validationMiddleware.js';

// Auth
import { authMiddleware } from '../middlewares/authMiddleware.js';

// Rate limit
import limiter from '../middlewares/rateLimiter.js';

// Create router
const AuthRoutes = Router();

// Routes
AuthRoutes.post('/register', validateRegister, AuthController.register);
AuthRoutes.post('/login', limiter, validateLogin, AuthController.login);
AuthRoutes.post('/logout', authMiddleware, AuthController.logout);

// Verify token
AuthRoutes.post('/verify-token', authMiddleware, AuthController.verifyToken);

// Password
AuthRoutes.post('/forgot-password', limiter, AuthController.forgotPassword);
AuthRoutes.post('/verify-reset-code', AuthController.verifyResetCode);
AuthRoutes.post(
  '/reset-password',
  validateResetPassword,
  AuthController.resetPassword
);
AuthRoutes.post(
  '/change-password',
  authMiddleware,
  validateChangePassword,
  AuthController.changePassword
);

export default AuthRoutes;
