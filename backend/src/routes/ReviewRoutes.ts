// Express
import { Router } from "express";

// Controllers
import ReviewController from "../controllers/ReviewController.js";

// Auth
import { authMiddleware } from "../middlewares/authMiddleware.js";

// Create router
const ReviewRoutes = Router();

// Routes
ReviewRoutes.get(
  "/reviews",
  authMiddleware,
  ReviewController.getAllReviewsByCourseId
);

ReviewRoutes.post("/reviews", authMiddleware, ReviewController.createReview);

ReviewRoutes.delete(
  "/reviews/:id",
  authMiddleware,
  ReviewController.deleteReviewByIdAndUserId
);

ReviewRoutes.put(
  "/reviews/:id",
  authMiddleware,
  ReviewController.updateReviewByIdAndUserId
);

export default ReviewRoutes;
