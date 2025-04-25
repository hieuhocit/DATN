import mongoose, { Schema } from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["VNPay"],
      required: true,
    },
    paymentDetails: {
      vnp_Amount: {
        type: String,
        required: true,
      },

      vnp_BankCode: {
        type: String,
        required: true,
      },

      vnp_BankTranNo: {
        type: String,
        required: true,
      },

      vnp_CardType: {
        type: String,
        required: true,
      },

      vnp_OrderInfo: {
        type: String,
        required: true,
      },

      vnp_PayDate: {
        type: String,
        required: true,
      },

      vnp_ResponseCode: {
        type: String,
        required: true,
      },

      vnp_TmnCode: {
        type: String,
        required: true,
      },

      vnp_TransactionNo: {
        type: String,
        required: true,
      },

      vnp_TransactionStatus: {
        type: String,
        required: true,
      },

      vnp_TxnRef: {
        type: String,
        required: true,
      },
    },
  },
  {
    id: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

PaymentSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
});

export type PaymentDetailsType = mongoose.InferSchemaType<
  typeof PaymentSchema
>["paymentDetails"];

export type PaymentType = mongoose.InferSchemaType<typeof PaymentSchema>;

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;
