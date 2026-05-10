import mongoose from 'mongoose';

const promptSchema = mongoose.Schema(
  {
    prompt_key: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    language: { type: String, required: true },
    fluency_level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export default mongoose.model('Prompt', promptSchema);
