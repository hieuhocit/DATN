// Models
import Payment, { PaymentDetailsType, PaymentType } from "../models/Payment.js";

// Server response
import serverResponse from "../utils/helpers/responses.js";

// Messages
import messages from "../configs/messagesConfig.js";

// Services
import UserService from "./UserService.js";
import PaymentItem from "../models/PaymentItem.js";
import Enrollment from "../models/Enrollment.js";

// Types
type UpdatedPaymentInput = Pick<PaymentType, "amount" | "paymentDetails">;

const PaymentService = {
  getAllPayments: async function () {
    try {
      const payments = await Payment.find()
        .populate({
          path: "user",
        })
        .populate({
          path: "paymentItem",
          populate: {
            path: "course",
          },
        })
        .sort({ createdAt: -1 });
      return payments;
    } catch (error) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: "Không tìm thấy danh sách thanh toán",
      });
    }
  },
  deletePaymentById: async function (id: string) {
    try {
      const result = await Payment.findOneAndDelete({
        _id: id,
      });

      await PaymentItem.deleteMany({
        paymentId: id,
      });

      await Enrollment.deleteMany({
        paymentId: id,
      });

      if (!result) {
        throw serverResponse.createError({
          ...messages.NOT_FOUND,
          message: "Không tìm thấy thanh toán",
        });
      }

      return true;
    } catch (error) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: "Không tìm thấy thanh toán",
      });
    }
  },
  updatePaymentById: async function (id: string, data: UpdatedPaymentInput) {
    const existedPayment = await Payment.findOne({
      _id: id,
    });

    if (!existedPayment) {
      throw serverResponse.createError({
        ...messages.NOT_FOUND,
        message: "Không tìm thấy thanh toán",
      });
    }

    Object.assign(existedPayment, data);
    const payment = await existedPayment.save();
    return payment;
  },
};

export default PaymentService;
