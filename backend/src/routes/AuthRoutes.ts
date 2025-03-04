// Express
import { Router } from 'express';

// Controllers
import AuthController from '../controllers/AuthController.js';

// Validate
import { validateRegister } from '../middlewares/validationMiddleware.js';

// Create router
const AuthRoutes = Router();

// Routes
AuthRoutes.post('/register', validateRegister, AuthController.register);

export default AuthRoutes;
