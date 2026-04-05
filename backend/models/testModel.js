import mongoose from 'mongoose';

const testSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Test', testSchema);