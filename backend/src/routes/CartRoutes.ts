// Express
import { Router } from 'express';

// Controllers
import CartController from '../controllers/CartController.js';

// Auth
import {
  authMiddleware,
  authorizationMiddleware,
} from '../middlewares/authMiddleware.js';

// Create router
const CartRoutes = Router();

// Routes
CartRoutes.get(
  '/cart',
  authMiddleware,
  authorizationMiddleware(['admin']),
  CartController.getCartByUserId
);

CartRoutes.post(
  '/cart',
  authMiddleware,
  authorizationMiddleware(['admin']),
  CartController.createCartItem
);

CartRoutes.delete(
  '/cart/:id',
  authMiddleware,
  authorizationMiddleware(['admin']),
  CartController.deleteCartItemById
);

export default CartRoutes;
