import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
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
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
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

ReviewSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
});

ReviewSchema.virtual("course", {
  ref: "Course",
  localField: "courseId",
  foreignField: "_id",
});

export type ReviewType = mongoose.InferSchemaType<typeof ReviewSchema>;

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
