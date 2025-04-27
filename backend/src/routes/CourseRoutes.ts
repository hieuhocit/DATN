// Express
import { Router } from "express";

// Controllers
import CourseController from "../controllers/CourseController.js";

// Auth
import {
  authMiddleware,
  authorizationMiddleware,
} from "../middlewares/authMiddleware.js";

// Create router
const CourseRoutes = Router();

// Routes
CourseRoutes.get("/courses", authMiddleware, CourseController.getAllCourses);

CourseRoutes.get("/courses/popular", CourseController.get20PopularCourses);
CourseRoutes.get("/courses/newest", CourseController.get20NewestCourses);

CourseRoutes.post(
  "/courses",
  authMiddleware,
  authorizationMiddleware(["admin", "instructor"]),
  CourseController.createCourse
);

CourseRoutes.get("/courses/:id", CourseController.getCourseById);

CourseRoutes.delete(
  "/courses/:id",
  authMiddleware,
  authorizationMiddleware(["admin", "instructor"]),
  CourseController.deleteCourseById
);

CourseRoutes.put(
  "/courses/:id",
  authMiddleware,
  authorizationMiddleware(["admin", "instructor"]),
  CourseController.updateCourseById
);

export default CourseRoutes;
