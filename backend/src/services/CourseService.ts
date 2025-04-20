// Models
import Course, { CourseType } from '../models/Course.js';

// Slugify
import slugify from 'slugify';

// Server response
import serverResponse from '../utils/helpers/responses.js';

// Messages
import messages from '../configs/messagesConfig.js';

// Mongoose
import mongoose from 'mongoose';

// Types
type CourseCreateInput = Pick<
  CourseType,
  | 'title'
  | 'description'
  | 'price'
  | 'thumbnail'
  | 'instructorId'
  | 'categoryId'
  | 'level'
  | 'duration'
  | 'requirements'
  | 'whatYouWillLearn'
> & {
  discountPrice?: number;
};

const CourseService = {
  getAllCourses: async function () {
    const courses = await Course.find()
      .populate({
        path: 'category instructor',
      })
      .sort({ createdAt: -1 });
    return courses;
  },
  getCourseById: async function (id: string) {
    try {
      const course = await Course.findById(id).populate({
        path: 'category instructor',
      });
      if (!course) {
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: 'Không tìm thấy khoá học',
        });
      }
      return course;
    } catch (error) {
      // Handle error if id is not a valid ObjectId
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: 'Không tìm thấy khoá học',
      });
    }
  },
  createCourse: async function (data: CourseCreateInput) {
    const existedCourse = await Course.findOne({
      title: data.title,
    });

    if (existedCourse) {
      throw serverResponse.createError({
        ...messages.ALREADY_EXISTS,
        message: 'Khoá học đã tồn tại',
      });
    }

    const slug =
      '/' +
      (slugify as any)(data.title, {
        lower: true,
        locale: 'vi',
      });

    const course = await Course.create({ ...data, slug });

    return course;
  },
  deleteCourseById: async function (id: string) {
    try {
      await Course.findByIdAndDelete(id);
      return true;
    } catch (error) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: 'Không tìm thấy khoá học',
      });
    }
  },
  updateCourseById: async function (
    id: string,
    data: CourseCreateInput & { isPublished?: boolean }
  ) {
    const course = await this.getCourseById(id);

    // Kiểm tra course đã tồn tại hay chưa (trừ course hiện tại _id: $ne: id)
    const existedCourse = await Course.findOne({
      title: data.title,
      _id: { $ne: id },
    });

    if (existedCourse) {
      throw serverResponse.createError({
        ...messages.ALREADY_EXISTS,
        message: 'Khoá học đã tồn tại',
      });
    }

    const slug =
      '/' +
      (slugify as any)(data.title, {
        lower: true,
        locale: 'vi',
      });

    course.title = data.title;
    course.description = data.description;
    course.price = data.price;
    if (data.discountPrice !== undefined)
      course.discountPrice = data.discountPrice;
    course.thumbnail = data.thumbnail;
    course.instructorId = data.instructorId;
    course.categoryId = data.categoryId;
    course.level = data.level;
    course.duration = data.duration;
    course.requirements = data.requirements;
    course.whatYouWillLearn = data.whatYouWillLearn;
    course.slug = slug;
    if (data.isPublished !== undefined) course.isPublished = data.isPublished;

    await course.save();

    return course;
  },
};

export default CourseService;
