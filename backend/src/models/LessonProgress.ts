import mongoose from "mongoose";

const LessonProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      require: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Number,
      default: 0,
    },
    lastWatchPosition: {
      type: Number,
      default: 0,
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

LessonProgressSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
});

LessonProgressSchema.virtual("lesson", {
  ref: "Lesson",
  localField: "lessonId",
  foreignField: "_id",
});

export type LessonProgressType = mongoose.InferSchemaType<
  typeof LessonProgressSchema
>;

const LessonProgress = mongoose.model("LessonProgress", LessonProgressSchema);

export default LessonProgress;
