import mongoose, { Schema } from "mongoose";

const PaymentItemSchema = new mongoose.Schema(
  {
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    price: {
      type: Number,
      required: true,
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

PaymentItemSchema.virtual("payment", {
  ref: "Payment",
  localField: "paymentId",
  foreignField: "_id",
});

PaymentItemSchema.virtual("course", {
  ref: "Course",
  localField: "courseId",
  foreignField: "_id",
});

export type PaymentItemType = mongoose.InferSchemaType<
  typeof PaymentItemSchema
>;

const PaymentItem = mongoose.model("PaymentItem", PaymentItemSchema);

export default PaymentItem;
