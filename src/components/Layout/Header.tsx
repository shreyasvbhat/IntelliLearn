import React from 'react';
import { Bell, Search, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

interface HeaderProps {
  onMenuClick: () => void;
  showMenuButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, showMenuButton = false }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user } = useAuth();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showMenuButton && (
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          )}
          
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses, students, or content..."
              className="pl-10 pr-4 py-2 w-64 md:w-96 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-600"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;