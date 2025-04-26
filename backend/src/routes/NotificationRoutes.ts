// Express
import { Router } from "express";

// Controllers
import NotificationController from "../controllers/NotificationController.js";

// Auth
import { authMiddleware } from "../middlewares/authMiddleware.js";

// Create router
const NotificationRoutes = Router();

// Routes
NotificationRoutes.get(
  "/notifications",
  authMiddleware,
  NotificationController.getAllNotificationsByUserId
);

NotificationRoutes.post(
  "/notifications",
  authMiddleware,
  NotificationController.createNotification
);

NotificationRoutes.delete(
  "/notifications/:id",
  authMiddleware,
  NotificationController.deleteNotificationByIdAndUserId
);

NotificationRoutes.put(
  "/notifications/:id",
  authMiddleware,
  NotificationController.updateNotificationByIdAndUserId
);

export default NotificationRoutes;
