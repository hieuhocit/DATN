import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
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

NoteSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
});

NoteSchema.virtual("lesson", {
  ref: "Lesson",
  localField: "lessonId",
  foreignField: "_id",
});

NoteSchema.virtual("course", {
  ref: "Course",
  localField: "courseId",
  foreignField: "_id",
});

export type NoteType = mongoose.InferSchemaType<typeof NoteSchema>;

const Note = mongoose.model("Note", NoteSchema);

export default Note;
