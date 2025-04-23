// Models
import Review, { ReviewType } from "../models/Review.js";

// Server response
import serverResponse from "../utils/helpers/responses.js";

// Messages
import messages from "../configs/messagesConfig.js";
import UserService from "./UserService.js";

// Types
type CreateReviewInput = Pick<
  ReviewType,
  "userId" | "courseId" | "rating" | "comment"
>;

const ReviewService = {
  getAllReviewsByCourseId: async function (courseId: string) {
    try {
      const reviews = await Review.find({
        courseId: courseId,
      })
        .populate({
          path: "user course",
        })
        .sort({ rating: -1 });
      return reviews;
    } catch (error) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: "Không tìm thấy danh sách đánh giá",
      });
    }
  },
  createReview: async function (data: CreateReviewInput) {
    const review = await Review.create(data);
    return review;
  },
  deleteReviewByIdAndUserId: async function (id: string, userId: string) {
    try {
      const existedUser = await UserService.getUserById(userId);

      if (existedUser.role === "admin") {
        const result = await Review.findByIdAndDelete(id);

        if (!result) {
          throw serverResponse.createError({
            ...messages.NOT_FOUND,
            message: "Không tìm thấy đánh giá",
          });
        }

        return true;
      }

      const result = await Review.findOneAndDelete({
        _id: id,
        userId: userId,
      });

      if (!result) {
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "Không tìm thấy đánh giá",
        });
      }

      return true;
    } catch (error) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: "Không tìm thấy đánh giá",
      });
    }
  },
  updateReviewByIdAndUserId: async function (
    id: string,
    data: Pick<CreateReviewInput, "userId" | "rating" | "comment">
  ) {
    const existedReview = await Review.findOne({
      _id: id,
      userId: data.userId,
    });

    if (!existedReview) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: "Không tìm thấy đánh giá",
      });
    }

    Object.assign(existedReview, data);
    const review = await existedReview.save();
    return review;
  },
};

export default ReviewService;
