import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { Course } from "../models/Course.js";
import { User } from "../models/User.js"; // Assuming you have a User model for student data
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Get all courses
router.get("/", authenticateToken, async (req, res) => {
  try {
    let userCourses = [];

    if (req.user.role === "teacher") {
      userCourses = await Course.find({ teacherId: req.user._id });
    } else if (req.user.role === "student") {
      userCourses = await Course.find({ students: req.user._id });
    }

    res.json(userCourses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// Create course (teachers only)
router.post("/", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ error: "Only teachers can create courses" });
    }

    const { title, description } = req.body;
    const course = new Course({
      title,
      description,
      teacherId: req.user._id,
    });

    await course.save(); // Assuming you have a method to save the course
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: "Failed to create course" });
  }
});

// Get course by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if user has access to this course
    const hasAccess =
      (req.user.role === "teacher" && course.teacherId === req.user._id) ||
      (req.user.role === "student" && course.students.includes(req.user._id));

    if (!hasAccess) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch course" });
  }
});
//submit assignments
router.post(
  "/submit/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const assignmentId=req.params.id;
      const id=req.user._id;
      let user=await User.findOne({_id:id});
      user.achievements.map((e)=>{
        if(e.assignmentId===assignmentId){
          e.status="complete"
          user.learningRate=Math.min(100,user.learningRate+1);
        }
      })

      user.markModified('achievements'); 
      await user.save();
      res.json({ message: "Assignment submitted successfully"});
    } catch (error) {
      console.error("Submit assignment error:", error);
      res.status(500).json({ error: "Failed to submit assignment" });
    }
  }
);

router.post("/:id/add-student", authenticateToken, async (req, res) => {
  try {
    const courseId = req.params.id;
    const { studentId } = req.body;

    // Only teachers can add students
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    if (course.teacherId.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ error: "Only the course teacher can add students" });

    if (!course.students.includes(studentId)) {
      course.students.push(studentId);
      await course.save();
      let x = await User.findById(studentId);
      x.courses.push(courseId);
      await x.save(); // Assuming you have a User model to update the student's courses

      let y = await User.findById(course.teacherId);
      y.students.push(studentId);
      await y.save(); // Update the teacher's students list
    }


    res.json({ message: "Student added successfully", course });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ error: "Failed to add student" });
  }
});

// Add assignment to course
router.post("/:id/add-assignment", authenticateToken, async (req, res) => {
  try {
    const courseId = req.params.id;
    const { title, description, dueDate, points } = req.body;
    const id = uuidv4();

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    if (course.teacherId.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ error: "Only the course teacher can add assignments" });

    const newAssignment = {
      id,
      title,
      description,
      dueDate,
      points,
    };

    course.assignments.push(newAssignment);
    await course.save();

    let x = await User.find({ _id: { $in: course.students } });
    console.log(x);
    let y = await Course.find({_id:courseId});
    if (!y){
      throw new Error("Course invalid");
    }

    x.forEach((student) => {
      student.achievements.push({
        title:title,
        subject:y.subject,
        assignmentId:id,
        description:description,
        dueDate:dueDate,
        status: "pending",
        attempts: 1,
      });
      student.save();
    });

    res.json({ message: "Assignment added successfully", course });
  } catch (error) {
    console.error("Error adding assignment:", error);
    res.status(500).json({ error: "Failed to add assignment" });
  }
});

export default router;
