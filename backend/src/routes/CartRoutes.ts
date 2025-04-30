// Express
import { Router } from "express";

// Controllers
import CartController from "../controllers/CartController.js";

// Auth
import { authMiddleware } from "../middlewares/authMiddleware.js";

// Create router
const CartRoutes = Router();

// Routes
CartRoutes.get("/cart", authMiddleware, CartController.getCartByUserId);

CartRoutes.post("/cart", authMiddleware, CartController.createCartItem);

CartRoutes.post(
  "/cart/multiple",
  authMiddleware,
  CartController.addMultipleCoursesToCart
);

CartRoutes.delete(
  "/cart/:courseId",
  authMiddleware,
  CartController.deleteCartItemByCourseIdAndUserId
);

export default CartRoutes;
