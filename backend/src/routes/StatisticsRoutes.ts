// Express
import { Router } from "express";

// Controllers
import StatisticsController from "../controllers/StatisticsController.js";

// Auth
import {
  authMiddleware,
  authorizationMiddleware,
} from "../middlewares/authMiddleware.js";

// Create router
const StatisticsRoutes = Router();

// Routes
StatisticsRoutes.get(
  "/statistics",
  authMiddleware,
  authorizationMiddleware(["admin"]),
  StatisticsController.getDashboardStats
);

StatisticsRoutes.get(
  "/statistics/instructor",
  authMiddleware,
  authorizationMiddleware(["admin", "instructor"]),
  StatisticsController.getDashboardStatsForInstructor
);

export default StatisticsRoutes;
