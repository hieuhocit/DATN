import mongoose, { InferSchemaType } from 'mongoose';

const PasswordResetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

export type PasswordResetType = InferSchemaType<typeof PasswordResetSchema>;

const PasswordReset = mongoose.model('PasswordReset', PasswordResetSchema);

export default PasswordReset;
