// Express
import { Router } from "express";

// Controllers
import LessonController from "../controllers/LessonController.js";

// Auth
import {
  authMiddleware,
  authorizationMiddleware,
} from "../middlewares/authMiddleware.js";

// Create router
const LessonRoutes = Router();

// Routes
LessonRoutes.get("/lessons", authMiddleware, LessonController.getAllLessons);

LessonRoutes.post(
  "/lessons",
  authMiddleware,
  authorizationMiddleware(["admin", "instructor"]),
  LessonController.createLesson
);

LessonRoutes.get(
  "/lessons/:id",
  authMiddleware,
  authorizationMiddleware(["admin"]),
  LessonController.getLessonById
);

LessonRoutes.delete(
  "/lessons/:id",
  authMiddleware,
  authorizationMiddleware(["admin", "instructor"]),
  LessonController.deleteLessonById
);

LessonRoutes.put(
  "/lessons/:id",
  authMiddleware,
  authorizationMiddleware(["admin", "instructor"]),
  LessonController.updateLessonById
);

export default LessonRoutes;
