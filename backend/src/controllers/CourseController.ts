// Types
import type { NextFunction, Request, Response } from 'express';

// Services
import CourseService from '../services/CourseService.js';

// Messages
import messages from '../configs/messagesConfig.js';

// Server response
import serverResponse from '../utils/helpers/responses.js';

const CourseController = {
  getAllCourses: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await CourseService.getAllCourses();

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: 'Get all courses successfully',
          },
          courses
        )
      );
    } catch (error) {
      next(error);
    }
  },
  getCourseById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const course = await CourseService.getCourseById(id);

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: 'Lấy khoá học thành công',
          },
          course
        )
      );
    } catch (error) {
      next(error);
    }
  },
  createCourse: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        title,
        description,
        price,
        thumbnail,
        instructorId,
        categoryId,
        level,
        duration,
        requirements,
        whatYouWillLearn,
      } = req.body;

      const course = await CourseService.createCourse({
        title,
        description,
        price,
        thumbnail,
        instructorId,
        categoryId,
        level,
        duration,
        requirements,
        whatYouWillLearn,
      });

      res.status(messages.CREATED.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.CREATED,
            message: 'Khoá học đã được tạo thành công',
          },
          course
        )
      );
    } catch (error) {
      next(error);
    }
  },
  deleteCourseById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await CourseService.deleteCourseById(id);

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: 'Khoá học đã được xoá thành công',
          },
          null
        )
      );
    } catch (error) {
      next(error);
    }
  },
  updateCourseById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        price,
        discountPrice,
        thumbnail,
        instructorId,
        categoryId,
        level,
        duration,
        requirements,
        whatYouWillLearn,
        isPublished,
      } = req.body;

      const course = await CourseService.updateCourseById(id, {
        title,
        description,
        price,
        discountPrice,
        thumbnail,
        instructorId,
        categoryId,
        level,
        duration,
        requirements,
        whatYouWillLearn,
        isPublished,
      });

      res.status(messages.OK.statusCode).json(
        serverResponse.createSuccess(
          {
            ...messages.OK,
            message: 'Khoá học đã được cập nhật thành công',
          },
          course
        )
      );
    } catch (error) {
      next(error);
    }
  },
};

export default CourseController;
