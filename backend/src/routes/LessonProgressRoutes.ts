// Express
import { Router } from "express";

// Controllers
import LessonProgressController from "../controllers/LessonProgressController.js";

// Auth
import { authMiddleware } from "../middlewares/authMiddleware.js";

// Create router
const LessonProgressRoutes = Router();

// Routes
LessonProgressRoutes.get(
  "/lesson-progresses",
  authMiddleware,
  LessonProgressController.getAllLessonProgressesByUserId
);

LessonProgressRoutes.post(
  "/lesson-progresses",
  authMiddleware,
  LessonProgressController.createLessonProgress
);

LessonProgressRoutes.get(
  "/lesson-progresses/:id",
  authMiddleware,
  LessonProgressController.getLessonProgressById
);

LessonProgressRoutes.put(
  "/lesson-progresses/:id",
  authMiddleware,
  LessonProgressController.updateLessonProgressById
);

export default LessonProgressRoutes;
