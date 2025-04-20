// Express
import { Router } from 'express';

// Controllers
import CourseController from '../controllers/CourseController.js';

// Auth
import {
  authMiddleware,
  authorizationMiddleware,
} from '../middlewares/authMiddleware.js';

// Create router
const CourseRoutes = Router();

// Routes
CourseRoutes.get(
  '/courses',
  authMiddleware,
  authorizationMiddleware(['admin']),
  CourseController.getAllCourses
);

CourseRoutes.post(
  '/courses',
  authMiddleware,
  authorizationMiddleware(['admin']),
  CourseController.createCourse
);

CourseRoutes.get(
  '/courses/:id',
  authMiddleware,
  authorizationMiddleware(['admin']),
  CourseController.getCourseById
);

CourseRoutes.delete(
  '/courses/:id',
  authMiddleware,
  authorizationMiddleware(['admin']),
  CourseController.deleteCourseById
);

CourseRoutes.put(
  '/courses/:id',
  authMiddleware,
  authorizationMiddleware(['admin']),
  CourseController.updateCourseById
);

export default CourseRoutes;
