import mongoose from "mongoose";
import Course from "./Course.js";

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
    publicId: {
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

LessonSchema.post("save", async function () {
  await updateCourseDuration(this.courseId);
});

LessonSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await updateCourseDuration(this.courseId);
  }
);

export type LessonType = mongoose.InferSchemaType<typeof LessonSchema>;

const Lesson = mongoose.model("Lesson", LessonSchema);

async function updateCourseDuration(courseId: mongoose.Types.ObjectId) {
  const result = await Lesson.aggregate([
    { $match: { courseId: courseId } },
    { $group: { _id: null, total: { $sum: "$duration" } } },
  ]);
  const total = result.length > 0 ? result[0].total : 0;

  await Course.findByIdAndUpdate(courseId, { duration: total });
}

export default Lesson;
