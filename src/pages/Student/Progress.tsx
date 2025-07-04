import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Award, 
  Calendar,
  BookOpen,
  Brain,
  Clock,
  BarChart3,
  Filter
} from 'lucide-react';
import Card from '../../components/UI/Card';
import ProgressChart from '../../components/Charts/ProgressChart';

const Progress: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');

  const progressData = {
    week: [
      { name: 'Mon', progress: 65, engagement: 70 },
      { name: 'Tue', progress: 72, engagement: 75 },
      { name: 'Wed', progress: 78, engagement: 82 },
      { name: 'Thu', progress: 75, engagement: 78 },
      { name: 'Fri', progress: 82, engagement: 85 },
      { name: 'Sat', progress: 88, engagement: 90 },
      { name: 'Sun', progress: 85, engagement: 88 }
    ],
    month: [
      { name: 'Week 1', progress: 65, engagement: 70 },
      { name: 'Week 2', progress: 72, engagement: 75 },
      { name: 'Week 3', progress: 78, engagement: 82 },
      { name: 'Week 4', progress: 85, engagement: 88 }
    ],
    year: [
      { name: 'Jan', progress: 65, engagement: 70 },
      { name: 'Feb', progress: 72, engagement: 75 },
      { name: 'Mar', progress: 78, engagement: 82 },
      { name: 'Apr', progress: 75, engagement: 78 },
      { name: 'May', progress: 82, engagement: 85 },
      { name: 'Jun', progress: 88, engagement: 90 }
    ]
  };

  const subjects = [
    { name: 'Mathematics', progress: 85, grade: 'A-', trend: 'up', color: 'blue' },
    { name: 'Physics', progress: 78, grade: 'B+', trend: 'up', color: 'green' },
    { name: 'Chemistry', progress: 72, grade: 'B', trend: 'down', color: 'yellow' },
    { name: 'English', progress: 92, grade: 'A', trend: 'up', color: 'purple' },
    { name: 'History', progress: 68, grade: 'B-', trend: 'stable', color: 'orange' },
    { name: 'Biology', progress: 80, grade: 'B+', trend: 'up', color: 'pink' }
  ];

  const achievements = [
    { id: 1, title: 'Math Wizard', description: 'Solved 100 math problems', date: '2024-01-10', icon: '🧮', rarity: 'gold' },
    { id: 2, title: 'Speed Reader', description: 'Read 10 books this month', date: '2024-01-08', icon: '📚', rarity: 'silver' },
    { id: 3, title: 'Science Explorer', description: 'Completed all physics labs', date: '2024-01-05', icon: '🔬', rarity: 'bronze' },
    { id: 4, title: 'Consistent Learner', description: '30-day learning streak', date: '2024-01-03', icon: '🔥', rarity: 'gold' }
  ];

  const learningInsights = [
    { title: 'Peak Learning Time', value: '10:00 AM - 12:00 PM', icon: Clock, color: 'blue' },
    { title: 'Strongest Subject', value: 'English Literature', icon: BookOpen, color: 'green' },
    { title: 'Learning Rate', value: '88%', icon: Brain, color: 'purple' },
    { title: 'Weekly Goal', value: '85% Complete', icon: Target, color: 'orange' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      pink: 'bg-pink-500'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'gold': return 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      case 'silver': return 'border-gray-400 bg-gray-50 dark:bg-gray-900/20';
      case 'bronze': return 'border-orange-400 bg-orange-50 dark:bg-orange-900/20';
      default: return 'border-gray-300 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learning Progress</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track your academic journey and achievements</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </motion.div>

      {/* Learning Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {learningInsights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{insight.title}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{insight.value}</p>
                </div>
                <insight.icon className={`w-8 h-8 text-${insight.color}-500`} />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Progress Trend
            </h3>
            <BarChart3 className="w-5 h-5 text-gray-500" />
          </div>
          <ProgressChart data={progressData[timeRange as keyof typeof progressData]} height={300} />
        </Card>

        {/* Subject Performance */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Subject Performance
            </h3>
            <TrendingUp className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getColorClasses(subject.color)}`}></div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{subject.name}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getColorClasses(subject.color)}`}
                          style={{ width: `${subject.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{subject.progress}%</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                    {subject.grade}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{getTrendIcon(subject.trend)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Award className="w-6 h-6 text-yellow-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Achievements</h3>
          </div>
          <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 border-2 rounded-lg ${getRarityColor(achievement.rarity)}`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{achievement.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{achievement.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  {new Date(achievement.date).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Study Streak */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calendar className="w-6 h-6 text-orange-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Study Streak</h3>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-orange-500">15</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Days</p>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 21 }, (_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                i < 15 
                  ? 'bg-orange-500 text-white' 
                  : i < 18 
                    ? 'bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          Keep it up! You're on a great learning streak. Study for 3 more days to reach your monthly goal.
        </p>
      </Card>
    </div>
  );
};

export default Progress;