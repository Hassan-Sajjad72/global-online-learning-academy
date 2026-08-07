import mongoose from 'mongoose';

const trialRequestSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  parentName: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  subject: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Contacted'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

export const TrialRequest = mongoose.model('TrialRequest', trialRequestSchema);
