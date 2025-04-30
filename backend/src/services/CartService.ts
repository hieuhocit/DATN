// Models
import Cart, { CartType } from "../models/Cart.js";
import Enrollment from "../models/Enrollment.js";

// Slugify
import slugify from "slugify";

// Server response
import serverResponse from "../utils/helpers/responses.js";

// Messages
import messages from "../configs/messagesConfig.js";
import Review from "../models/Review.js";

// Types
type CreateCartItemInput = Pick<CartType, "userId" | "courseId">;

const CartService = {
  getCartByUserId: async function (userId: CartType["userId"]) {
    let cart = await Cart.find({ userId: userId })
      .populate({
        path: "user course",
      })
      .sort({ createdAt: -1 });

    cart = JSON.parse(JSON.stringify(cart));

    // Tính rating trung bình cho mỗi khóa học
    const courseRatings = await Review.aggregate([
      {
        $group: {
          _id: "$courseId",
          averageRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
    ]);

    // Tính số lượng đăng ký cho mỗi khóa học
    const courseEnrollments = await Enrollment.aggregate([
      {
        $group: {
          _id: "$courseId",
          enrollmentCount: { $sum: 1 },
        },
      },
      { $sort: { enrollmentCount: -1 } },
    ]);

    cart.forEach((element: any) => {
      const course = element.course[0];

      const rating = courseRatings.find(
        (r) => r._id.toString() === course._id.toString()
      );

      const enrollment = courseEnrollments.find((e) => e._id === course._id);

      course.averageRating = rating
        ? parseFloat(rating.averageRating.toFixed(1))
        : 0;
      course.reviewCount = rating ? rating.reviewCount : 0;
      course.enrollmentCount = enrollment ? enrollment.enrollmentCount : 0;
    });

    return cart;
  },
  createCartItem: async function (data: CreateCartItemInput) {
    const existedCartItem = await Cart.findOne({
      userId: data.userId,
      courseId: data.courseId,
    });

    if (existedCartItem) {
      throw serverResponse.createError({
        ...messages.ALREADY_EXISTS,
        message: "Khoá học đã tồn tại trong giỏ hàng",
      });
    }

    const enrolledCourse = await Enrollment.findOne({
      userId: data.userId,
      courseId: data.courseId,
    });

    if (enrolledCourse) {
      throw serverResponse.createError({
        ...messages.ALREADY_EXISTS,
        message: "Bạn đã mua khoá học này rồi",
      });
    }

    const cartItem = await Cart.create(data);

    return cartItem;
  },
  deleteCartItemByCourseIdAndUserId: async function (
    courseId: string,
    userId: CartType["userId"]
  ) {
    try {
      const result = await Cart.findOneAndDelete({
        userId: userId,
        courseId: courseId,
      });

      return !!result;
    } catch (error) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: "Không tìm thấy khoá học trong giỏ hàng",
      });
    }
  },
  addOneItem: async function (data: CreateCartItemInput) {
    const existedCartItem = await Cart.findOne({
      userId: data.userId,
      courseId: data.courseId,
    });

    if (existedCartItem) {
      return null;
    }

    const enrolledCourse = await Enrollment.findOne({
      userId: data.userId,
      courseId: data.courseId,
    });

    if (enrolledCourse) {
      return null;
    }

    const cartItem = await Cart.create(data);

    return cartItem;
  },
  addMultipleCoursesToCart: async function (
    userId: CartType["userId"],
    courseIds: CartType["courseId"][]
  ) {
    let result = [];
    for await (const courseId of courseIds) {
      const cartItem = await this.addOneItem({
        userId,
        courseId,
      });
      if (cartItem) {
        result.push(cartItem);
      }
    }
    return result;
  },
};

export default CartService;
