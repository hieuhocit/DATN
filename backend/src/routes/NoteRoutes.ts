// Express
import { Router } from "express";

// Controllers
import NoteController from "../controllers/NoteController.js";

// Auth
import { authMiddleware } from "../middlewares/authMiddleware.js";

// Create router
const NoteRoutes = Router();

// Routes
NoteRoutes.get(
  "/notes",
  authMiddleware,
  NoteController.getAllNotesByCourseIdAndUserId
);

NoteRoutes.post("/notes", authMiddleware, NoteController.createNote);

NoteRoutes.delete(
  "/notes/:id",
  authMiddleware,
  NoteController.deleteNoteByIdAndUserId
);

NoteRoutes.put("/notes/:id", authMiddleware, NoteController.updateNoteById);

export default NoteRoutes;
