import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera,
  Shield, Bell, Moon, Sun, GraduationCap, BookOpen, Users
} from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import * as API from '../../api/APICalls'

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [childrenData, setChildrenData] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    bio: getBioByRole(),
    dateOfBirth: '',
    emergencyContact: '',
    preferences: {
      notifications: user?.preferences?.notifications ?? true,
      emailUpdates: true,
      darkMode: darkMode,
    }
  });

  function getBioByRole() {
    switch (user?.role) {
      case 'student':
        return 'Passionate about learning and education. Always eager to explore new concepts and excel in my studies.';
      case 'teacher':
        return 'Dedicated educator with experience. Committed to helping students achieve their full potential.';
      case 'parent':
        return 'Supportive parent actively involved in my child\'s educational journey.';
      default:
        return 'Passionate about learning and education.';
    }
  }

  useEffect(() => {
    const fetchChildren = async () => {
      if (user?.role === 'parent' && Array.isArray(user.children) && user.children.length > 0) {
        try {
          const allStudents = await API.getAllStudents();
          const filteredChildren = allStudents.filter((s:any) => Array.isArray(user.children) && user.children.includes(s._id));
          setChildrenData(filteredChildren);
        } catch (error) {
          console.error('Error fetching children:', error);
        }
      }
    };

    fetchChildren();
  }, [user]);

  const handleSave = () => {
    updateUser({
      name: formData.name,
      preferences: {
        ...user?.preferences,
        darkMode: formData.preferences.darkMode,
        notifications: formData.preferences.notifications
      }
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      ...formData,
      name: user?.name || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'student':
        return [
          { label: 'Courses Enrolled', value: user?.enrolledCourses?.length || '0' },
          { label: 'Assignments Completed', value: '42' },
          { label: 'Learning Rate', value: '88%' },
          { label: 'Study Streak', value: '15 days' }
        ];
      case 'teacher':
        return [
          { label: 'Classes Teaching', value: '4' },
          { label: 'Total Students', value: '104' },
          { label: 'Assignments Graded', value: '156' },
          { label: 'Years Experience', value: '8' }
        ];
      case 'parent':
        return [
          { label: 'Children Monitoring', value: Array.isArray(user?.children) ? user.children.length : '0' },
          { label: 'Teacher Meetings', value: '12' },
          { label: 'Reports Downloaded', value: '8' },
          { label: 'Messages Sent', value: '24' }
        ];
      default:
        return [];
    }
  };

  const getRoleSpecificFields = () => {
    switch (user?.role) {
      case 'student':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Student ID
              </label>
              <p className="text-gray-900 dark:text-white">{user?._id}</p>
            </div>
          </>
        );

      case 'teacher':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Employee ID
              </label>
              <p className="text-gray-900 dark:text-white">{user?._id}</p>
            </div>
          </>
        );

      case 'parent':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Children
              </label>
              <div className="space-y-2">
                {childrenData.length > 0 ? (
                  childrenData.map((child) => (
                    <div key={child._id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <span className="text-gray-900 dark:text-white">{child.name}</span>
                      <span className="text-sm text-gray-500">{child._id}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No children linked</p>
                )}
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const currentStats = getStatsForRole();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account settings and preferences</p>
        </div>
        <div className="mt-4 md:mt-0">
          {isEditing ? (
            <div className="flex space-x-2">
              <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-1" />
              Edit Profile
            </Button>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <User className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h3>
            </div>

            <div className="flex items-center space-x-6 mb-6">
              <div className="relative">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-20 h-20 rounded-full border-4 border-gray-200 dark:border-gray-600"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                    <Camera className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.name}</h4>
                <p className="text-gray-600 dark:text-gray-400 capitalize flex items-center">
                  {user?.role === 'student' && <BookOpen className="w-4 h-4 mr-1" />}
                  {user?.role === 'teacher' && <GraduationCap className="w-4 h-4 mr-1" />}
                  {user?.role === 'parent' && <Users className="w-4 h-4 mr-1" />}
                  {user?.role}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{formData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <p className="text-gray-900 dark:text-white">{formData.email}</p>
              </div>

              {getRoleSpecificFields()}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{formData.bio}</p>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-6">
              <Shield className="w-5 h-5 text-green-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preferences</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Push Notifications</h4>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.preferences.notifications}
                  onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, notifications: e.target.checked } })}
                  disabled={!isEditing}
                  className="toggle-checkbox"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {darkMode ? <Moon className="w-5 h-5 text-gray-400 mr-3" /> : <Sun className="w-5 h-5 text-gray-400 mr-3" />}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Dark Mode</h4>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  className="toggle-checkbox"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Statistics</h3>
            <div className="space-y-4">
              {currentStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <span className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{stat.value}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
