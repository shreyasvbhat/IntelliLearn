// User Model - In a real app, this would be a database model
export class User {
  constructor(data) {
    this.id = data.id || this.generateId();
    this.email = data.email;
    this.name = data.name;
    this.password = data.password; // In real app, this would be hashed
    this.role = data.role; // 'student', 'teacher', 'parent'
    this.avatar = data.avatar;
    this.preferences = data.preferences || {
      darkMode: false,
      notifications: true
    };
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = new Date();
    
    // Role-specific data
    if (this.role === 'student') {
      this.learningRate = data.learningRate || 50;
      this.enrolledCourses = data.enrolledCourses || [];
      this.achievements = data.achievements || [];
      this.progress = data.progress || {};
    }
    
    if (this.role === 'teacher') {
      this.courses = data.courses || [];
      this.students = data.students || [];
    }
    
    if (this.role === 'parent') {
      this.children = data.children || [];
    }
  }

  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

// Mock database
export const users = [];