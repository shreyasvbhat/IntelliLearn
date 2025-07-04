// Course Model
export class Course {
  constructor(data) {
    this.id = data.id || this.generateId();
    this.title = data.title;
    this.description = data.description;
    this.teacherId = data.teacherId;
    this.students = data.students || [];
    this.content = data.content || [];
    this.assignments = data.assignments || [];
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = new Date();
  }

  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
}

// Mock database
export const courses = [];