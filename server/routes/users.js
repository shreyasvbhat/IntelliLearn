import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { users } from '../models/User.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.toJSON());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, (req, res) => {
  try {
    const userIndex = users.findIndex(u => u.id === req.user.userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { name, preferences } = req.body;
    users[userIndex] = {
      ...users[userIndex],
      name: name || users[userIndex].name,
      preferences: { ...users[userIndex].preferences, ...preferences },
      updatedAt: new Date()
    };

    res.json({
      message: 'Profile updated successfully',
      user: users[userIndex].toJSON()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get students (for teachers)
router.get('/students', authenticateToken, (req, res) => {
  try {
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const students = users.filter(u => u.role === 'student').map(user => user.toJSON());
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

export default router;