import mongoose, { InferSchemaType } from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      default: null,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'expert', 'all'],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    whatYouWillLearn: {
      type: String,
      required: true,
    },
    isPublished: {
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

CourseSchema.virtual('instructor', {
  ref: 'User',
  localField: 'instructorId',
  foreignField: '_id',
});

CourseSchema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
});

export type CourseType = mongoose.InferSchemaType<typeof CourseSchema>;

const Course = mongoose.model('Course', CourseSchema);

export default Course;
