
import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  profileSummary: {
    type: String,
    trim: true,
    maxlength: 2000 
  },
  skills: [{
    type: String,
    trim: true
  }],
  education: [{
    type: String,
    trim: true
  }],
  experience: {
    type: String,
    trim: true
  },
  resumeFile: {
    filename: String,
    mimetype: String,
    path: String
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for better search performance on common fields like email
resumeSchema.index({ email: 1 });
resumeSchema.index({ userId: 1 });

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;