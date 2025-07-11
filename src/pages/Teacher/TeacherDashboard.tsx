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
import * as API from '../../api/APICalls' // adjust path if needed

const TeacherDashboard: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [classData, setClassData] = useState<any[]>([]);
  const [strugglingStudents, setStrugglingStudents] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsRes = await API.getStudents();
        const coursesRes = await API.getCourses();

        setStudents(studentsRes);
        setCourses(coursesRes);

        // Example: create fake "class data" stats based on courses
        // const generatedClassData = coursesRes.map((course: any) => ({
        //   name: course.title,
        //   progress: Math.floor(Math.random() * 30) + 70, // 70-100%
        //   engagement: Math.floor(Math.random() * 20) + 75, // 75-95%
        // }));
        // setClassData(generatedClassData);

        // Example: simulate students needing attention
        // const struggling = studentsRes
        //   .filter((_s: any, i: number) => i < 3) // just pick first 3 for demo
        //   .map((s: any) => ({
        //     id: s._id,
        //     name: s.name,
        //     subject: coursesRes[Math.floor(Math.random() * coursesRes.length)]?.title || 'Mathematics',
        //     score: Math.floor(Math.random() * 30) + 45, // 45-75%
        //     trend: Math.random() > 0.5 ? 'down' : 'stable',
        //   }));
        //setStrugglingStudents(struggling);

        // Example: simulate recent activities
        const activities = [
          { id: 1, type: 'assignment', title: 'New Assignment Created', time: '2 hours ago' },
          { id: 2, type: 'question', title: 'Student asked a question', time: '4 hours ago' },
          { id: 3, type: 'content', title: 'AI content generated', time: '1 day ago' },
        ];
        setRecentActivities(activities);

      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
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
            <span>{courses.length} Active Courses</span>
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
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{courses.length}</p>
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
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{strugglingStudents.length}</p>
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
          <div className="space-y-3">
            {strugglingStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{student.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{student.subject}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">{student.score}%</p>
                  <p className="text-xs text-gray-500">
                    {student.trend === 'down' ? '↓ Declining' : '→ Stable'}
                  </p>
                </div>
              </div>
            ))}
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
                Ilm has generated new content for struggling students.
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
