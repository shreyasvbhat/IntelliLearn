import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, FilePlus, BookOpen, Send } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import * as API from '../../api/APICalls';

const CourseManagement: React.FC = () => {
  const [courseId, setCourseId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    dueDate: '',
    points: ''
  });

  const handleAddStudent = async () => {
    try {
      await API.addStudentToCourse(courseId, studentId);
      alert('Student added!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add student.');
    }
  };

  const handleAddAssignment = async () => {
    try {
      await API.addAssignmentToCourse(courseId, assignmentData);
      alert('Assignment added!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add assignment.');
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <BookOpen className="w-8 h-8 text-blue-500 mr-3" />
            Course Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage students and assignments easily</p>
        </div>
      </motion.div>

      {/* Course ID input */}
      <Card className="p-6">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none"
          />
        </div>
      </Card>

      {/* Add Student */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <UserPlus className="w-5 h-5 text-green-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Student</h3>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none"
          />
          <Button onClick={handleAddStudent} className="bg-green-600 hover:bg-green-700">
            <Send className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
      </Card>

      {/* Add Assignment */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <FilePlus className="w-5 h-5 text-purple-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Assignment</h3>
        </div>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            value={assignmentData.title}
            onChange={(e) => setAssignmentData({ ...assignmentData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none"
          />
          <textarea
            placeholder="Description"
            value={assignmentData.description}
            onChange={(e) => setAssignmentData({ ...assignmentData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none"
          />
          <input
            type="date"
            value={assignmentData.dueDate}
            onChange={(e) => setAssignmentData({ ...assignmentData, dueDate: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none"
          />
          <input
            type="number"
            placeholder="Points"
            value={assignmentData.points}
            onChange={(e) => setAssignmentData({ ...assignmentData, points: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none"
          />
          <Button onClick={handleAddAssignment} className="bg-purple-600 hover:bg-purple-700">
            <Send className="w-4 h-4 mr-1" /> Add Assignment
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CourseManagement;
