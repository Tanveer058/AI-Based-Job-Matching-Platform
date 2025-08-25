// import mongoose from 'mongoose';


// const resumeSchema = new mongoose.Schema({
//   userId: mongoose.Schema.Types.ObjectId,
//   skills: [String],
//   education: [String],
//   experience: String,
//   resumeFile: {
//     filename: String,
//     mimetype: String,
//     path: String
//   }
// });

// const Resume = mongoose.model('Resume', resumeSchema);
// export default Resume;


import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model. This is good practice.
    required: true
  },
  email: {
    type: String,
    required: true, // Make this required if every resume must be linked to an email
    lowercase: true,
    trim: true
  },
  profileSummary: {
    type: String,
    trim: true,
    maxlength: 2000 // Good to have a limit to prevent abuse
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
  timestamps: true // Adds createdAt and updatedAt automatically. Highly recommended.
});

// Index for better search performance on common fields like email
resumeSchema.index({ email: 1 });
resumeSchema.index({ userId: 1 });

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;