import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
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

CartSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
});

CartSchema.virtual('course', {
  ref: 'Course',
  localField: 'courseId',
  foreignField: '_id',
});

export type CartType = mongoose.InferSchemaType<typeof CartSchema>;

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;
