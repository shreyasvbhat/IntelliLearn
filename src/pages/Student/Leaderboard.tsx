import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Star,
  TrendingUp,
  Users,
  Target,
  Award,
  Crown,
  Filter,
  Loader,
} from "lucide-react";
import Card from "../../components/UI/Card";
import { getLeaderboardData } from "../../api/APICalls";
import { useAuth } from "../../contexts/AuthContext";

interface LeaderboardUser {
  _id: string;
  rank: number;
  name: string;
  avatar: string;
  points: number;
  level: number;
  badges: number;
  streak: number;
  change: string;
  subject: string;
  isCurrentUser?: boolean;
}

const Leaderboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState("week");
  const [category, setCategory] = useState("overall");
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user: currentUser } = useAuth();

  // Define a list of possible subjects
  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "English",
    "Biology",
    "History",
    "Geography",
    "Art",
    "Computer Science",
  ];

  // Generate a random change value (-3 to +3)
  const generateChange = (): string => {
    const value = Math.floor(Math.random() * 7) - 3;
    if (value === 0) return "0";
    return value > 0 ? `+${value}` : `${value}`;
  };

  // Generate random attributes for a user
  const generateRandomAttributes = (index: number) => {
    // The higher the index, the lower the points (to make a sensible leaderboard)
    const basePoints = 2500 - index * (50 + Math.floor(Math.random() * 50));

    return {
      points: basePoints,
      level: Math.max(10, 15 - Math.floor(index / 2)),
      badges: Math.max(5, 12 - Math.floor(index / 1.5)),
      streak: Math.floor(Math.random() * 30) + 5,
      change: generateChange(),
      subject: subjects[Math.floor(Math.random() * subjects.length)],
    };
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Fetch users from the API
        const response = await getLeaderboardData();
        const students = response.students || [];

        // Transform students to leaderboard data with type assertion
        const transformedData = students
          .map((student: any, index: number) => ({
            _id: student._id,
            rank: index + 1,
            name: student.name,
            avatar:
              student.avatar ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                student.name
              )}`,
            ...generateRandomAttributes(index),
            // Identify if this is the current logged-in user
            isCurrentUser: currentUser && student._id === currentUser._id,
          }))
          // Sort by points in descending order
          .sort((a: any, b: any) => b.points - a.points)
          // Re-assign ranks after sorting
          .map((user: any, index: number) => ({
            ...user,
            rank: index + 1,
          })) as LeaderboardUser[];

        setLeaderboardData(transformedData);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load leaderboard data. Please try again later.");

        // Fallback to demo data if API fails
        const demoData = Array(8)
          .fill(null)
          .map((_, index) => ({
            _id: `demo-${index}`,
            rank: index + 1,
            name:
              index === 0 && currentUser
                ? currentUser.name
                : `Demo User ${index + 1}`,
            avatar:
              index === 0 && currentUser && currentUser.avatar
                ? currentUser.avatar
                : `https://api.dicebear.com/7.x/initials/svg?seed=Demo User ${
                    index + 1
                  }`,
            ...generateRandomAttributes(index),
            isCurrentUser: index === 0,
          })) as LeaderboardUser[];

        setLeaderboardData(demoData);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [timeframe, category]);

  const achievements = [
    {
      title: "Top Performer",
      description: "Ranked #1 this week",
      icon: "👑",
      rarity: "legendary",
    },
    {
      title: "Study Streak",
      description: "30 days in a row",
      icon: "🔥",
      rarity: "epic",
    },
    {
      title: "Quiz Master",
      description: "100% on 5 quizzes",
      icon: "🎯",
      rarity: "rare",
    },
    {
      title: "Helper",
      description: "Helped 10 classmates",
      icon: "🤝",
      rarity: "common",
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-500" />;
      default:
        return (
          <span className="text-lg font-bold text-gray-600 dark:text-gray-400">
            #{rank}
          </span>
        );
    }
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith("+")) return "text-green-500";
    if (change.startsWith("-")) return "text-red-500";
    return "text-gray-500";
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20";
      case "epic":
        return "border-purple-400 bg-purple-50 dark:bg-purple-900/20";
      case "rare":
        return "border-blue-400 bg-blue-50 dark:bg-blue-900/20";
      case "common":
        return "border-gray-400 bg-gray-50 dark:bg-gray-900/20";
      default:
        return "border-gray-300 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  // Find current user stats
  const currentUserData = leaderboardData.find(
    (user) => user.isCurrentUser
  ) || {
    rank: 0,
    points: 0,
    level: 0,
    badges: 0,
    streak: 0,
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
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Compete with your classmates and track your progress
          </p>
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
              <div className="text-4xl font-bold">#{currentUserData.rank}</div>
              <div className="flex items-center text-blue-100">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>{currentUserData.points} points</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{currentUserData.level}</div>
              <div className="text-sm text-blue-100">Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{currentUserData.badges}</div>
              <div className="text-sm text-blue-100">Badges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{currentUserData.streak}</div>
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
                <span>{leaderboardData.length} students</span>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="flex flex-col items-center space-y-4">
                  <Loader className="w-12 h-12 text-blue-500 animate-spin" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Loading leaderboard data...
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center p-8 text-red-500">
                <p>{error}</p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {leaderboardData.map((student, index) => (
                  <motion.div
                    key={student._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      student.isCurrentUser
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
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
                          <h4
                            className={`font-semibold ${
                              student.isCurrentUser
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-900 dark:text-white"
                            }`}
                          >
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
                            <div className="font-bold text-gray-900 dark:text-white">
                              {student.points}
                            </div>
                            <div className="text-xs text-gray-500">points</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-gray-900 dark:text-white">
                              {student.badges}
                            </div>
                            <div className="text-xs text-gray-500">badges</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-gray-900 dark:text-white">
                              {student.streak}
                            </div>
                            <div className="text-xs text-gray-500">streak</div>
                          </div>
                          <div
                            className={`text-sm font-medium ${getChangeColor(
                              student.change
                            )}`}
                          >
                            {student.change !== "0" &&
                              (student.change.startsWith("+") ? "↗" : "↘")}{" "}
                            {student.change}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Award className="w-5 h-5 text-yellow-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Achievements
              </h3>
            </div>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 border-2 rounded-lg ${getRarityColor(
                    achievement.rarity
                  )}`}
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Weekly Challenge
              </h3>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Complete 20 Practice Problems
              </h4>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-2">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                15/20 completed
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                Reward: 500 bonus points
              </p>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Points this week
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  +180
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Rank change
                </span>
                <span className="font-medium text-red-500">-1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Best subject
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  English
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Study time
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  12.5h
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
