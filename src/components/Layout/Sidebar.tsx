import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Users, 
  BarChart3, 
  MessageCircle, 
  Settings, 
  LogOut,
  GraduationCap,
  Calendar,
  Award,
  Bell,
  User,
  FileText,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getMenuItems = () => {
    const commonItems = [
      { to: '/dashboard', icon: Home, label: 'Dashboard' },
      { to: '/profile', icon: User, label: 'Profile' },
      { to: '/messages', icon: MessageCircle, label: 'Messages' },
      { to: '/notifications', icon: Bell, label: 'Notifications' },
      { to: '/settings', icon: Settings, label: 'Settings' }
    ];

    switch (user?.role) {
      case 'student':
        return [
          { to: '/dashboard', icon: Home, label: 'Dashboard' },
          { to: '/courses', icon: BookOpen, label: 'My Courses' },
          { to: '/progress', icon: TrendingUp, label: 'Progress' },
          { to: '/assignments', icon: FileText, label: 'Assignments' },
          { to: '/calendar', icon: Calendar, label: 'Calendar' },
          { to: '/ai-tutor', icon: GraduationCap, label: 'AI Tutor (Ilm)' },
          { to: '/leaderboard', icon: Award, label: 'Leaderboard' },
          ...commonItems.slice(1)
        ];
      
      case 'teacher':
        return [
          { to: '/dashboard', icon: Home, label: 'Dashboard' },
          { to: '/my-classes', icon: Users, label: 'My Classes' },
          { to: '/course-management', icon: BookOpen, label: 'Courses' },
          { to: '/analytics', icon: BarChart3, label: 'Analytics' },
          { to: '/assignments', icon: FileText, label: 'Assignments' },
          { to: '/calendar', icon: Calendar, label: 'Schedule' },
          { to: '/ai-content', icon: GraduationCap, label: 'AI Content' },
          ...commonItems.slice(1)
        ];
      
      case 'parent':
        return [
          { to: '/dashboard', icon: Home, label: 'Dashboard' },
          { to: '/child-progress', icon: TrendingUp, label: 'Child Progress' },
          { to: '/attendance', icon: Calendar, label: 'Attendance' },
          { to: '/reports', icon: FileText, label: 'Reports' },
          { to: '/teacher-communication', icon: MessageCircle, label: 'Teachers' },
          ...commonItems.slice(1)
        ];
      
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <motion.div 
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 bg-white dark:bg-gray-800 shadow-lg h-full flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">IntelliLearn</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;