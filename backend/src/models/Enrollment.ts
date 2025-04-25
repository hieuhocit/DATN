import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    completionPercentage: {
      type: Number,
      default: 0,
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
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

EnrollmentSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
});

EnrollmentSchema.virtual("course", {
  ref: "Course",
  localField: "courseId",
  foreignField: "_id",
});

EnrollmentSchema.virtual("payment", {
  ref: "Payment",
  localField: "paymentId",
  foreignField: "_id",
});

export type EnrollmentType = mongoose.InferSchemaType<typeof EnrollmentSchema>;

const Enrollment = mongoose.model("Enrollment", EnrollmentSchema);

export default Enrollment;
