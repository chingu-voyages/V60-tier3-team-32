import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password_hash: { type: String, required: true },
    photo_url: { type: String },
    bio: { type: String },
    native_language: { type: String, required: true },
    learning_languages: {
      type: [
        {
          language: { type: String, required: true },
          level: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced'],
            required: true,
          },
        },
      ],
    },
    credits: { type: Number, default: 0 },
    refresh_token: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model('User', userSchema);
