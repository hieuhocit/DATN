// Models
import Enrollment, { EnrollmentType } from "../models/Enrollment.js";

// Server response
import serverResponse from "../utils/helpers/responses.js";

// Messages
import messages from "../configs/messagesConfig.js";

// Services
import UserService from "./UserService.js";

// Types

const EnrollmentService = {
  getEnrollmentsByUserId: async function (userId: string) {
    try {
      const enrollments = await Enrollment.find({
        userId: userId,
      })
        .populate({
          path: "user course payment",
        })
        .sort({ createdAt: -1 });
      return enrollments;
    } catch (error) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: "Không tìm thấy danh sách khoá học đã đăng ký",
      });
    }
  },
};

export default EnrollmentService;
