import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
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
    content: {
      type: String,
      required: true,
      trim: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
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

CommentSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
});

CommentSchema.virtual("lesson", {
  ref: "Lesson",
  localField: "lessonId",
  foreignField: "_id",
});

CommentSchema.virtual("children", {
  ref: "Comment",
  localField: "_id",
  foreignField: "parentId",
});

export type CommentType = mongoose.InferSchemaType<typeof CommentSchema>;

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
