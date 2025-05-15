// Models
import Payment, { PaymentDetailsType, PaymentType } from "../models/Payment.js";
import PaymentItem from "../models/PaymentItem.js";
import Enrollment from "../models/Enrollment.js";

// Server response
import serverResponse from "../utils/helpers/responses.js";

// Messages
import messages from "../configs/messagesConfig.js";

// Crypto
import crypto from "crypto";

// Moment
import moment from "moment";

// Config
import { vnPayConfig } from "../configs/vnPayConfig.js";

// Services
import CartService from "./CartService.js";
import CourseService from "./CourseService.js";

// Types
import { CartType } from "../models/Cart.js";
import LessonService from "./LessonService.js";
import LessonProgressService from "./LessonProgressService.js";
import { sendNotificationToInstructor } from "../utils/helpers/notification.js";

type PaymentUrlType = {
  userId: CartType["userId"];
  ipAddr: string;
  bankCode: string;
  locale: string;
};

const VNPayService = {
  createPaymentUrl: async function ({
    userId,
    bankCode,
    ipAddr,
    locale,
  }: PaymentUrlType) {
    const cart = await CartService.getCartByUserId(userId);

    let amount = 0;

    for await (const cartItem of cart) {
      const courseId = cartItem.courseId.toString();
      const course = await CourseService.getCourseById(courseId);
      amount += course.price;
    }
    process.env.TZ = "Asia/Ho_Chi_Minh";

    const date = new Date();
    const createDate = moment(date).format("YYYYMMDDHHmmss");

    const tmnCode = vnPayConfig.vnp_TmnCode;
    const secretKey = vnPayConfig.vnp_HashSecret as string;
    const vnpUrl = vnPayConfig.vnp_Url as string;
    const returnUrl = vnPayConfig.vnp_ReturnUrl;

    const orderId = moment(date).format("DDHHmmss");

    const redirectUrl = new URL(vnpUrl);

    const currCode = "VND";
    const vnp_Params: any = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
    vnp_Params["vnp_OrderType"] = "other";
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    vnp_Params["vnp_BankCode"] = bankCode ?? "VNBANK";

    sortObject(vnp_Params).forEach(([key, value]) => {
      if (!value || value === "" || value === undefined || value === null) {
        return;
      } else {
        redirectUrl.searchParams.append(key, value.toString());
      }
    });

    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac
      .update(Buffer.from(redirectUrl.searchParams.toString(), "utf-8"))
      .digest("hex");

    redirectUrl.searchParams.append("vnp_SecureHash", signed);

    return redirectUrl.href;
  },
  vnPayReturn: async function (
    userId: CartType["userId"],
    vnp_Params: PaymentDetailsType & {
      vnp_SecureHash?: string;
      vnp_SecureHashType?: string;
    }
  ) {
    const secureHash = vnp_Params!["vnp_SecureHash"];

    delete vnp_Params!["vnp_SecureHash"];
    delete vnp_Params!["vnp_SecureHashType"];

    const res_code = vnp_Params["vnp_ResponseCode"];

    const params = new URLSearchParams(
      sortObject(vnp_Params) as [string, string][]
    );

    const secretKey = vnPayConfig.vnp_HashSecret as string;

    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac
      .update(Buffer.from(params.toString(), "utf-8"))
      .digest("hex");

    // Checkout successfully
    if (secureHash === signed && res_code == "00") {
      const paymentData = {
        userId: userId,
        amount: +vnp_Params["vnp_Amount"] / 100,
        transactionId: vnp_Params["vnp_BankTranNo"],
        paymentMethod: "VNPay",
        paymentDetails: {
          vnp_Amount: vnp_Params["vnp_Amount"],
          vnp_BankCode: vnp_Params["vnp_BankCode"],
          vnp_BankTranNo: vnp_Params["vnp_BankTranNo"],
          vnp_CardType: vnp_Params["vnp_CardType"],
          vnp_OrderInfo: vnp_Params["vnp_OrderInfo"],
          vnp_PayDate: vnp_Params["vnp_PayDate"],
          vnp_ResponseCode: vnp_Params["vnp_ResponseCode"],
          vnp_TmnCode: vnp_Params["vnp_TmnCode"],
          vnp_TransactionNo: vnp_Params["vnp_TransactionNo"],
          vnp_TransactionStatus: vnp_Params["vnp_TransactionStatus"],
          vnp_TxnRef: vnp_Params["vnp_TxnRef"],
        },
      };

      const payment = await Payment.create(paymentData);

      const cart = await CartService.getCartByUserId(userId);

      for await (const cartItem of cart) {
        const course = await CourseService.getCourseById(
          cartItem.courseId.toString()
        );

        const lessons = await LessonService.getAllLessonsByCourseId(
          course._id.toString()
        );

        for await (const lesson of lessons) {
          const lessonProgressData = {
            userId: userId,
            lessonId: lesson._id,
          };
          await LessonProgressService.createLessonProgress(lessonProgressData);
        }

        const paymentItemData = {
          paymentId: payment._id,
          courseId: cartItem.courseId,
          price: course.price,
        };

        const enrollmentData = {
          userId: userId,
          courseId: cartItem.courseId,
          paymentId: payment._id,
        };

        await Enrollment.create(enrollmentData);
        await PaymentItem.create(paymentItemData);

        await CartService.deleteCartItemByCourseIdAndUserId(
          course._id.toString(),
          userId
        );

        sendNotificationToInstructor({
          title: "Có học viên mới đăng ký khoá học",
          message: `Có học viên mới đăng ký khoá học ${course.title}`,
          instructorId: course.instructorId.toString(),
          referenceUrl: `/instructor`,
        });
      }

      return true;
    } else {
      return false;
    }
  },
};

function sortObject(obj: any) {
  return Object.entries(obj).sort(([key1], [key2]) =>
    key1.toString().localeCompare(key2.toString())
  );
}

export default VNPayService;
