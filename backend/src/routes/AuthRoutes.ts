// Express
import { Router } from 'express';

// Controllers
import AuthController from '../controllers/AuthController.js';

// Validate
import {
  validateRegister,
  validateLogin,
} from '../middlewares/validationMiddleware.js';

// Create router
const AuthRoutes = Router();

// Routes
AuthRoutes.post('/register', validateRegister, AuthController.register);
AuthRoutes.post('/login', validateLogin, AuthController.login);

export default AuthRoutes;
