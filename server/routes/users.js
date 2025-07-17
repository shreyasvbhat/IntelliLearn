import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { User } from "../models/User.js";

const router = express.Router();

// Get user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.toJSON());
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Update user profile
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { name, preferences } = req.body;
    user.name = name || user.name;
    user.preferences = { ...user.preferences, ...preferences };
    user.updatedAt = new Date();

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: user.toJSON(),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// Get students (for teachers)
router.get("/students", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ error: "Access denied" });
    }

    const students = await User.find({ role: "student" });
    res.json(students.map((student) => student.toJSON()));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// Get leaderboard data (accessible to all authenticated users)
router.get("/leaderboard", authenticateToken, async (req, res) => {
  try {
    // Get students with minimal data needed for leaderboard
    const students = await User.find(
      { role: "student" },
      { name: 1, avatar: 1, email: 1 } // Only return necessary fields
    );

    res.json({
      success: true,
      students: students.map((student) => student.toJSON()),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leaderboard data" });
  }
});

export default router;
