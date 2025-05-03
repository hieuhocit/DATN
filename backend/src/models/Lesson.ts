import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    orderIndex: {
      type: Number,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    isFree: {
      type: Boolean,
      default: false,
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

LessonSchema.virtual("course", {
  ref: "Course",
  localField: "courseId",
  foreignField: "_id",
});

LessonSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "lessonId",
});

LessonSchema.virtual("progress", {
  ref: "LessonProgress",
  localField: "_id",
  foreignField: "lessonId",
});

export type LessonType = mongoose.InferSchemaType<typeof LessonSchema>;

const Lesson = mongoose.model("Lesson", LessonSchema);

export default Lesson;
