// Express
import { Router } from "express";

// Controllers
import CommentController from "../controllers/CommentController.js";

// Auth
import { authMiddleware } from "../middlewares/authMiddleware.js";

// Create router
const CommentRoutes = Router();

// Routes
CommentRoutes.get(
  "/comments",
  authMiddleware,
  CommentController.getAllCommentsByLessonId
);

CommentRoutes.post(
  "/comments",
  authMiddleware,
  CommentController.createComment
);

CommentRoutes.delete(
  "/comments/:id",
  authMiddleware,
  CommentController.deleteCommentByIdAndUserId
);

CommentRoutes.put(
  "/comments/:id",
  authMiddleware,
  CommentController.updateCommentByIdAndUserId
);

export default CommentRoutes;
