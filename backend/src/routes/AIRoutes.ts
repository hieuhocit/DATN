// Express
import { Router } from "express";

// Auth
import { authMiddleware } from "../middlewares/authMiddleware.js";

// Controllers
import AIController from "../controllers/AIController.js";

// Create router
const AIRoutes = Router();

AIRoutes.post("/chat-with-ai", authMiddleware, AIController.chatWithAI);

export default AIRoutes;
