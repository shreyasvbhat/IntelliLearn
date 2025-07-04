import mongoose from 'mongoose';

const { Schema } = mongoose;

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  content: [{ 
    type: new Schema({
      type: { type: String }, // e.g., 'video', 'article', etc.
      value: { type: String },
    }, { _id: false })
  }],
  assignments: [{ 
    type: new Schema({
      title: { type: String },
      description: { type: String },
      dueDate: { type: Date },
    }, { _id: false })
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Automatically update `updatedAt`
courseSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Course = mongoose.model('Course', courseSchema);

