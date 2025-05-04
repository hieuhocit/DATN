// Express
import { Router } from "express";

// Controllers
import PaymentController from "../controllers/PaymentController.js";

// Auth
import {
  authMiddleware,
  authorizationMiddleware,
} from "../middlewares/authMiddleware.js";

// Create router
const PaymentRoutes = Router();

// Routes
PaymentRoutes.get(
  "/payments",
  authMiddleware,
  authorizationMiddleware(["admin"]),
  PaymentController.getAllPayments
);

PaymentRoutes.delete(
  "/payments/:id",
  authMiddleware,
  PaymentController.deletePaymentById
);

PaymentRoutes.put(
  "/payments/:id",
  authMiddleware,
  PaymentController.updatePaymentById
);

export default PaymentRoutes;
