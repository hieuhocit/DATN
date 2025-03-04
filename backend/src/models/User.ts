import mongoose, { InferSchemaType } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: '',
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'instructor', 'admin'],
      required: true,
      default: 'user',
    },
    registerProvider: {
      type: String,
      enum: ['local', 'google', 'facebook'],
      required: true,
    },
  },
  {
    id: false,
    timestamps: true,
  }
);

type UserType = InferSchemaType<typeof userSchema>;

const User = mongoose.model('User', userSchema);

export { UserType };
export default User;
