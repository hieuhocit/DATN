// Express
import { Router } from 'express';

// Controllers
import UserController from '../controllers/UserController.js';

// Create router
const UserRoutes = Router();

// Routes
UserRoutes.post('/users', UserController.register);

export default UserRoutes;
