import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { Course } from '../models/Course.js';

const router = express.Router();

// Get all courses
router.get('/', authenticateToken, async (req, res) => {
  try {
    let userCourses = [];
    
    if (req.user.role === 'teacher') {
      userCourses = await Course.find({ teacherId: req.user.userId });
    } else if (req.user.role === 'student') {
      userCourses = await Course.find({ students: req.user.userId });
    }
    
    res.json(userCourses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Create course (teachers only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ error: 'Only teachers can create courses' });
    }

    const { title, description } = req.body;
    const course = new Course({
      title,
      description,
      teacherId: req.user.userId
    });

    await course.save(); // Assuming you have a method to save the course
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Get course by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Check if user has access to this course
    const hasAccess = 
      req.user.role === 'teacher' && course.teacherId === req.user.userId ||
      req.user.role === 'student' && course.students.includes(req.user.userId);

    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

export default router;