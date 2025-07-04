import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  TrendingUp, 
  Award, 
  Clock, 
  Target,
  Brain,
  MessageCircle,
  Calendar
} from 'lucide-react';
import Card from '../../components/UI/Card';
import ProgressChart from '../../components/Charts/ProgressChart';

const StudentDashboard: React.FC = () => {
  // Mock data
  const progressData = [
    { name: 'Week 1', progress: 65, engagement: 75 },
    { name: 'Week 2', progress: 72, engagement: 80 },
    { name: 'Week 3', progress: 78, engagement: 85 },
    { name: 'Week 4', progress: 85, engagement: 90 },
    { name: 'Week 5', progress: 88, engagement: 88 },
    { name: 'Week 6', progress: 92, engagement: 95 }
  ];

  const recentCourses = [
    { id: 1, title: 'Advanced Mathematics', progress: 75, nextClass: '2024-01-15T10:00' },
    { id: 2, title: 'Physics Fundamentals', progress: 60, nextClass: '2024-01-15T14:00' },
    { id: 3, title: 'English Literature', progress: 85, nextClass: '2024-01-16T09:00' }
  ];

  const achievements = [
    { id: 1, title: 'Math Wizard', description: 'Completed 50 math problems', icon: '🧮' },
    { id: 2, title: 'Quick Learner', description: 'Learning rate above 85', icon: '⚡' },
    { id: 3, title: 'Consistent Student', description: '7 days streak', icon: '🔥' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome back, Student!</h1>
        <p className="text-blue-100">Ready to continue your learning journey?</p>
        <div className="mt-4 flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Learning Rate: 88%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>3 Badges Earned</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">6</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Average Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">73%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Study Hours</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">42h</p>
            </div>
            <Clock className="w-8 h-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Learning Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">88%</p>
            </div>
            <Brain className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Learning Progress
          </h3>
          <ProgressChart data={progressData} height={250} />
        </Card>

        {/* Recent Courses */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Courses
            </h3>
            <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{course.title}</h4>
                  <div className="flex items-center mt-1">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-3">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{course.progress}%</span>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Next: {new Date(course.nextClass).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Tutor & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Tutor Interaction */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-purple-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Ilm AI Tutor
            </h3>
          </div>
          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-900/50 p-3 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                "Based on your recent progress, I recommend focusing on calculus integration problems. 
                Your learning rate of 88% suggests you're ready for more challenging concepts!"
              </p>
            </div>
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>Chat with Ilm</span>
            </button>
          </div>
        </Card>

        {/* Recent Achievements */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Award className="w-6 h-6 text-yellow-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Achievements
              </h3>
            </div>
          </div>
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/50 rounded-lg">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{achievement.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;