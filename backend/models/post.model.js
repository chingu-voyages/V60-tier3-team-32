import mongoose from 'mongoose';

const postModel = mongoose.Schema(
  {
    language: {
      type: String,
      required: true,
    },

    fluency_level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },

    prompt: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prompt',
        required: true,
      },
      title: { type: String, required: true },
      description: { type: String },
      language: { type: String, required: true },
    },
    author: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      username: { type: String, required: true },
      profile_image: { type: String },
    },

    content: {
      type: String,
      required: true,
      maxlength: 2000,
    },

    word_count: { type: Number, default: 0 },
    reading_time: { type: Number, default: 1 },

    corrections_count: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ['draft', 'submitted', 'corrected'],
      default: 'draft',
    },

    corrections: [
      {
        corrector: {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
          username: { type: String, required: true },
          profile_image: { type: String },
        },
        corrected_text: { type: String, required: true },
        notes: { type: String },
        created_at: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export default mongoose.model('Post', postModel);
