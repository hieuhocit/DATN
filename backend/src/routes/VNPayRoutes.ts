// Express
import { Router } from "express";

// Auth
import { authMiddleware } from "../middlewares/authMiddleware.js";

// Controllers
import VNPayController from "../controllers/VNPayController.js";

// Create router
const VNPayRoutes = Router();

VNPayRoutes.post(
  "/order/create_payment_url",
  authMiddleware,
  VNPayController.createPaymentUrl
);

VNPayRoutes.get(
  "/order/vnpay_return",
  authMiddleware,
  VNPayController.vnPayReturn
);

export default VNPayRoutes;
