import mongoose from 'mongoose';

const { Schema } = mongoose;

const preferencesSchema = new Schema({
  darkMode: { type: Boolean, default: false },
  notifications: { type: Boolean, default: true },
}, { _id: false });

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true }, // In real app, hash before save
  role: { type: String, enum: ['student', 'teacher', 'parent'], required: true },
  avatar: { type: String },
  preferences: { type: preferencesSchema, default: () => ({}) },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  // Student fields
  learningRate: { type: Number, default: 50 },
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  achievements: [{ type: String }],
  progress: { type: Schema.Types.Mixed, default: {} },

  // Teacher fields
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }],

  // Parent fields
  children: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

// Automatically update `updatedAt`
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Remove password when converting to JSON
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = mongoose.model('User', userSchema);

