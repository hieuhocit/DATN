// Express
import { Router } from "express";

// Controllers
import EnrollmentController from "../controllers/EnrollmentController.js";

// Auth
import { authMiddleware } from "../middlewares/authMiddleware.js";

// Create router
const EnrollmentRoutes = Router();

// Routes
EnrollmentRoutes.get(
  "/enrollments",
  authMiddleware,
  EnrollmentController.getEnrollmentsByUserId
);

export default EnrollmentRoutes;
