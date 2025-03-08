// Mongoose
import mongoose, { InferSchemaType } from 'mongoose';

const RefreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    enum: ['user', 'instructor', 'admin'],
    required: true,
  },
  userRegisterProvider: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

export type RefreshTokenType = InferSchemaType<typeof RefreshTokenSchema>;

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);

export default RefreshToken;
