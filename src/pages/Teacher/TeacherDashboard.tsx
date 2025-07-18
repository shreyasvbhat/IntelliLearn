import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle,
  Calendar,
  MessageCircle,
  FileText,
  Brain
} from 'lucide-react';
import Card from '../../components/UI/Card';
import ProgressChart from '../../components/Charts/ProgressChart';
import * as API from '../../api/APICalls'

const TeacherDashboard: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [classData, setClassData] = useState<any[]>([]);

  const recentActivities = [
    { id: 1, type: 'assignment', title: 'Calculus Assignment Due', time: '2 hours ago' },
    { id: 2, type: 'question', title: 'Student asked about integration', time: '4 hours ago' },
    { id: 3, type: 'content', title: 'New AI content generated', time: '1 day ago' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsRes = await API.getStudents();
        setStudents(studentsRes);
        
        // Generate mock performance data for each student
        const mockPerformanceData = studentsRes.map((student: any, index: number) => {
          // Generate mock test scores between 60-95
          const baseScore = Math.floor(Math.random() * 35) + 60;
          
          return {
            name: student.name || `Student ${index + 1}`,
            progress: baseScore,
            engagement: baseScore + Math.floor(Math.random() * 10), // Slightly higher engagement scores
          };
        });
        
        setClassData(mockPerformanceData);
      } catch (err) {
        console.error('Failed to fetch students data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Good morning, Teacher!</h1>
        <p className="text-green-100">Here's what's happening in your classes today</p>
        <div className="mt-4 flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>{students.length} Active Students</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>6 Active Courses</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Students</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{students.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">2</p>
            </div>
            <BookOpen className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Avg. Performance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">77%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Need Attention</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Performance Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Class Performance Overview
          </h3>
          <ProgressChart data={classData} height={250} />
        </Card>

        {/* Students Needing Attention */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Students Need Attention
              </h3>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-green-50 dark:bg-green-900/30 rounded-full p-4 mb-4">
              <div className="text-green-500 w-12 h-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              All Students Are Doing Well!
            </h4>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm">
              Currently, all students are performing at satisfactory levels. Keep up the great work in maintaining this positive learning environment!
            </p>
          </div>
        </Card>
      </div>

      {/* AI Content & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Content Generation */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-purple-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI Content Assistant
            </h3>
          </div>
          <div className="space-y-3">
            <div className="bg-purple-50 dark:bg-purple-900/50 p-3 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Ilm has generated new content for struggling students in Mathematics.
              </p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700">
                  Review Content
                </button>
                <button className="px-3 py-1 border border-purple-600 text-purple-600 text-xs rounded hover:bg-purple-50">
                  Generate More
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activities
            </h3>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === 'assignment' && <FileText className="w-5 h-5 text-blue-500" />}
                  {activity.type === 'question' && <MessageCircle className="w-5 h-5 text-green-500" />}
                  {activity.type === 'content' && <Brain className="w-5 h-5 text-purple-500" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">{activity.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
