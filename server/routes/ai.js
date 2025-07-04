import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { GeminiService } from '../services/GeminiService.js';
import { User } from '../models/User.js';

const router = express.Router();

// Chat with Ilm AI
router.post('/chat', authenticateToken, async (req, res) => {
  try {
    const { message, subject, context } = req.body;
    
    // Get user's learning rate and history (in real app, from database)
    const user=req.user;
    const learningRate = await User.findById(user.id).select('learningRate');
    const chatHistory = [];
    
    const response = await GeminiService.generateResponse({
      message,
      subject,
      learningRate,
      chatHistory,
      context
    });

    res.json({
      response,
      learningRate,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('AI Chat error:', error);
    res.status(500).json({ error: 'Failed to process AI request' });
  }
});

// Generate content for teachers
router.post('/generate-content', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ error: 'Only teachers can generate content' });
    }

    const { topic, difficulty, contentType, targetAudience } = req.body;
    
    const content = await GeminiService.generateContent({
      topic,
      difficulty,
      contentType,
      targetAudience
    });

    res.json({
      content,
      generatedAt: new Date()
    });
  } catch (error) {
    console.error('Content generation error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

// Analyze student performance
router.post('/analyze-performance', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ error: 'Only teachers can analyze performance' });
    }

    const { studentData, subject } = req.body;
    
    const analysis = await GeminiService.analyzePerformance({
      studentData,
      subject
    });

    res.json({
      analysis,
      analyzedAt: new Date()
    });
  } catch (error) {
    console.error('Performance analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze performance' });
  }
});

export default router;