import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  MessageCircle, 
  AlertCircle,
  Calendar,
  Award,
  BookOpen,
  Target
} from 'lucide-react';
import Card from '../../components/UI/Card';
import ProgressChart from '../../components/Charts/ProgressChart';

const ParentDashboard: React.FC = () => {
  const childProgressData = [
    { name: 'Jan', progress: 65, engagement: 70 },
    { name: 'Feb', progress: 72, engagement: 75 },
    { name: 'Mar', progress: 78, engagement: 82 },
    { name: 'Apr', progress: 75, engagement: 78 },
    { name: 'May', progress: 82, engagement: 85 },
    { name: 'Jun', progress: 88, engagement: 90 }
  ];

  const subjects = [
    { name: 'Mathematics', grade: 'A-', progress: 85, teacher: 'Ms. Johnson' },
    { name: 'Science', grade: 'B+', progress: 78, teacher: 'Mr. Smith' },
    { name: 'English', grade: 'A', progress: 92, teacher: 'Mrs. Davis' },
    { name: 'History', grade: 'B', progress: 75, teacher: 'Mr. Wilson' }
  ];

  const recentActivities = [
    { type: 'assignment', subject: 'Math', description: 'Completed Algebra Quiz', score: 85, date: '2024-01-10' },
    { type: 'doubt', subject: 'Science', description: 'Asked about photosynthesis', date: '2024-01-09' },
    { type: 'achievement', subject: 'English', description: 'Earned "Grammar Master" badge', date: '2024-01-08' }
  ];

  const alerts = [
    { type: 'attention', message: 'Attention level dropped in Math class', priority: 'high' },
    { type: 'assignment', message: 'Science assignment due tomorrow', priority: 'medium' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Your Child's Progress</h1>
        <p className="text-purple-100">Monitoring Alex's learning journey</p>
        <div className="mt-4 flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Overall Grade: B+</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>5 Badges This Month</span>
          </div>
        </div>
      </motion.div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <Card className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/50">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Attention Required</h3>
          </div>
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <p key={index} className="text-sm text-yellow-700 dark:text-yellow-300">
                • {alert.message}
              </p>
            ))}
          </div>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">82%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Study Hours</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">28h</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Attendance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">94%</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">6</p>
            </div>
            <BookOpen className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            6-Month Progress Trend
          </h3>
          <ProgressChart data={childProgressData} height={250} />
        </Card>

        {/* Subject Performance */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Subject Performance
            </h3>
          </div>
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{subject.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Teacher: {subject.teacher}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                      {subject.grade}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-3">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{subject.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activities & Communication */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activities
            </h3>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {activity.type === 'assignment' && <BookOpen className="w-4 h-4 text-blue-500" />}
                  {activity.type === 'doubt' && <MessageCircle className="w-4 h-4 text-yellow-500" />}
                  {activity.type === 'achievement' && <Award className="w-4 h-4 text-green-500" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">{activity.subject}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{activity.description}</p>
                  {activity.score && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                      Score: {activity.score}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Teacher Communication */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <MessageCircle className="w-6 h-6 text-green-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Teacher Communication
              </h3>
            </div>
            <button className="text-green-600 dark:text-green-400 text-sm hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 dark:bg-green-900/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">Ms. Johnson (Math)</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">2 days ago</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                "Alex is showing great improvement in algebra. Keep up the practice!"
              </p>
            </div>
            
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-green-600 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/50 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>Message Teachers</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ParentDashboard;