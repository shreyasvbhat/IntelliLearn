import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Medal, 
  Star, 
  TrendingUp,
  Users,
  Target,
  Award,
  Crown,
  Filter
} from 'lucide-react';
import Card from '../../components/UI/Card';

const Leaderboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState('week');
  const [category, setCategory] = useState('overall');

  const leaderboardData = [
    {
      rank: 1,
      name: 'Emma Thompson',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Emma Thompson',
      points: 2450,
      level: 15,
      badges: 12,
      streak: 28,
      change: '+2',
      subject: 'Mathematics'
    },
    {
      rank: 2,
      name: 'Alex Chen',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Alex Chen',
      points: 2380,
      level: 14,
      badges: 10,
      streak: 25,
      change: '0',
      subject: 'Physics'
    },
    {
      rank: 3,
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sarah Johnson',
      points: 2320,
      level: 14,
      badges: 11,
      streak: 22,
      change: '+1',
      subject: 'Chemistry'
    },
    {
      rank: 4,
      name: 'You',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Current User',
      points: 2280,
      level: 13,
      badges: 9,
      streak: 15,
      change: '-1',
      subject: 'English',
      isCurrentUser: true
    },
    {
      rank: 5,
      name: 'Michael Davis',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Michael Davis',
      points: 2150,
      level: 13,
      badges: 8,
      streak: 18,
      change: '+3',
      subject: 'Biology'
    },
    {
      rank: 6,
      name: 'Lisa Wilson',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Lisa Wilson',
      points: 2100,
      level: 12,
      badges: 7,
      streak: 12,
      change: '-2',
      subject: 'History'
    },
    {
      rank: 7,
      name: 'David Brown',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=David Brown',
      points: 2050,
      level: 12,
      badges: 6,
      streak: 20,
      change: '+1',
      subject: 'Geography'
    },
    {
      rank: 8,
      name: 'Jennifer Lee',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Jennifer Lee',
      points: 1980,
      level: 11,
      badges: 5,
      streak: 8,
      change: '0',
      subject: 'Art'
    }
  ];

  const achievements = [
    { title: 'Top Performer', description: 'Ranked #1 this week', icon: '👑', rarity: 'legendary' },
    { title: 'Study Streak', description: '30 days in a row', icon: '🔥', rarity: 'epic' },
    { title: 'Quiz Master', description: '100% on 5 quizzes', icon: '🎯', rarity: 'rare' },
    { title: 'Helper', description: 'Helped 10 classmates', icon: '🤝', rarity: 'common' }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-orange-500" />;
      default: return <span className="text-lg font-bold text-gray-600 dark:text-gray-400">#{rank}</span>;
    }
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-green-500';
    if (change.startsWith('-')) return 'text-red-500';
    return 'text-gray-500';
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      case 'epic': return 'border-purple-400 bg-purple-50 dark:bg-purple-900/20';
      case 'rare': return 'border-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case 'common': return 'border-gray-400 bg-gray-50 dark:bg-gray-900/20';
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
            Leaderboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Compete with your classmates and track your progress</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="semester">This Semester</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="overall">Overall</option>
            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="english">English</option>
            <option value="biology">Biology</option>
          </select>
        </div>
      </motion.div>

      {/* Current User Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Your Ranking</h2>
              <p className="text-blue-100">Keep up the great work!</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">#4</div>
              <div className="flex items-center text-blue-100">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>2,280 points</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">13</div>
              <div className="text-sm text-blue-100">Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">9</div>
              <div className="text-sm text-blue-100">Badges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">15</div>
              <div className="text-sm text-blue-100">Day Streak</div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaderboard */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Top Performers
              </h3>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4 mr-1" />
                <span>156 students</span>
              </div>
            </div>

            <div className="space-y-3">
              {leaderboardData.map((student, index) => (
                <motion.div
                  key={student.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    student.isCurrentUser 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(student.rank)}
                      </div>
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h4 className={`font-semibold ${
                          student.isCurrentUser ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                        }`}>
                          {student.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Level {student.level} • {student.subject}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="font-bold text-gray-900 dark:text-white">{student.points}</div>
                          <div className="text-xs text-gray-500">points</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-gray-900 dark:text-white">{student.badges}</div>
                          <div className="text-xs text-gray-500">badges</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-gray-900 dark:text-white">{student.streak}</div>
                          <div className="text-xs text-gray-500">streak</div>
                        </div>
                        <div className={`text-sm font-medium ${getChangeColor(student.change)}`}>
                          {student.change !== '0' && (student.change.startsWith('+') ? '↗' : '↘')} {student.change}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Award className="w-5 h-5 text-yellow-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Achievements</h3>
            </div>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 border-2 rounded-lg ${getRarityColor(achievement.rarity)}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Weekly Challenge */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Target className="w-5 h-5 text-green-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Challenge</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Complete 20 Practice Problems
              </h4>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-2">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">15/20 completed</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                Reward: 500 bonus points
              </p>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Points this week</span>
                <span className="font-medium text-gray-900 dark:text-white">+180</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Rank change</span>
                <span className="font-medium text-red-500">-1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Best subject</span>
                <span className="font-medium text-gray-900 dark:text-white">English</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Study time</span>
                <span className="font-medium text-gray-900 dark:text-white">12.5h</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;