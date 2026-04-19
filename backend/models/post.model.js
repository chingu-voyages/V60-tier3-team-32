import mongoose from 'mongoose';

const postModel = mongoose.Schema(
  {
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    language: { type: String, required: true },
    content: { type: String, required: true, maxLength: 300 },
    prompt_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Prompt' },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'corrected'],
      default: 'draft',
    },
    correction_count: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model('Post', postModel);
