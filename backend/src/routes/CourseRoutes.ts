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
CourseRoutes.get("/courses/search", CourseController.findCoursesByQuery);
CourseRoutes.get(
  "/courses/categories/:id",
  CourseController.getCoursesByCategoryIds
);

CourseRoutes.get(
  "/courses/instructor",
  authMiddleware,
  authorizationMiddleware(["admin", "instructor"]),
  CourseController.getCoursesByInstructorId
);

CourseRoutes.get("/courses/popular", CourseController.get20PopularCourses);
CourseRoutes.get("/courses/newest", CourseController.get20NewestCourses);
CourseRoutes.get(
  "/courses/recommended",
  authMiddleware,
  CourseController.getRecommendedCourses
);

CourseRoutes.post(
  "/courses",
  authMiddleware,
  authorizationMiddleware(["admin", "instructor"]),
  CourseController.createCourse
);

CourseRoutes.get("/courses/:id", CourseController.getCourseById);
CourseRoutes.get(
  "/learning/:slug",
  authMiddleware,
  CourseController.getCourseBySlug
);

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
