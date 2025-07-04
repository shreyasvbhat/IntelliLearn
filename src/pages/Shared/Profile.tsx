import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Shield,
  Bell,
  Moon,
  Sun,
  GraduationCap,
  BookOpen,
  Users
} from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: getBioByRole(),
    dateOfBirth: '1995-06-15',
    emergencyContact: '+1 (555) 987-6543',
    preferences: {
      notifications: true,
      emailUpdates: true,
      darkMode: darkMode
    }
  });

  function getBioByRole() {
    switch (user?.role) {
      case 'student':
        return 'Passionate about learning and education. Always eager to explore new concepts and excel in my studies.';
      case 'teacher':
        return 'Dedicated educator with 8+ years of experience in mathematics and physics. Committed to helping students achieve their full potential.';
      case 'parent':
        return 'Supportive parent actively involved in my child\'s educational journey. Committed to fostering a positive learning environment.';
      default:
        return 'Passionate about learning and education.';
    }
  }

  const handleSave = () => {
    updateUser({
      name: formData.name,
      preferences: {
        ...user?.preferences,
        darkMode: formData.preferences.darkMode
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
          { label: 'Courses Enrolled', value: '6' },
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
          { label: 'Children Monitoring', value: '2' },
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
              {isEditing ? (
                <input
                  type="text"
                  value="STU2024001"
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">STU2024001</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Grade Level
              </label>
              {isEditing ? (
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                  <option value="12">Grade 12</option>
                  <option value="11">Grade 11</option>
                  <option value="10">Grade 10</option>
                </select>
              ) : (
                <p className="text-gray-900 dark:text-white">Grade 12</p>
              )}
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
              {isEditing ? (
                <input
                  type="text"
                  value="TCH2024001"
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">TCH2024001</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Department
              </label>
              {isEditing ? (
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                  <option value="mathematics">Mathematics</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="biology">Biology</option>
                </select>
              ) : (
                <p className="text-gray-900 dark:text-white">Mathematics & Physics</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Qualification
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value="M.Sc. Mathematics, B.Ed."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">M.Sc. Mathematics, B.Ed.</p>
              )}
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
                <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-900 dark:text-white">Alex Johnson - Grade 12</span>
                  <span className="text-sm text-gray-500">STU2024001</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-900 dark:text-white">Emma Johnson - Grade 9</span>
                  <span className="text-sm text-gray-500">STU2024045</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Relationship
              </label>
              {isEditing ? (
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                  <option value="parent">Parent</option>
                  <option value="guardian">Guardian</option>
                  <option value="relative">Relative</option>
                </select>
              ) : (
                <p className="text-gray-900 dark:text-white">Parent</p>
              )}
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
      {/* Header */}
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
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
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
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  Member since {new Date().getFullYear() - 1}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  <p className="text-gray-900 dark:text-white">{formData.email}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-gray-900 dark:text-white">{formData.phone}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-gray-900 dark:text-white">{formData.location}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-gray-900 dark:text-white">
                      {new Date(formData.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Emergency Contact
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-gray-900 dark:text-white">{formData.emergencyContact}</p>
                  </div>
                )}
              </div>

              {/* Role-specific fields */}
              {getRoleSpecificFields()}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
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

          {/* Preferences */}
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user?.role === 'student' && 'Receive notifications about assignments and updates'}
                      {user?.role === 'teacher' && 'Receive notifications about student activities and messages'}
                      {user?.role === 'parent' && 'Receive notifications about your child\'s progress and activities'}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.preferences.notifications}
                    onChange={(e) => setFormData({
                      ...formData,
                      preferences: { ...formData.preferences, notifications: e.target.checked }
                    })}
                    className="sr-only peer"
                    disabled={!isEditing}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Email Updates</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user?.role === 'student' && 'Receive weekly progress reports via email'}
                      {user?.role === 'teacher' && 'Receive class summaries and important updates via email'}
                      {user?.role === 'parent' && 'Receive monthly progress reports and important updates via email'}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.preferences.emailUpdates}
                    onChange={(e) => setFormData({
                      ...formData,
                      preferences: { ...formData.preferences, emailUpdates: e.target.checked }
                    })}
                    className="sr-only peer"
                    disabled={!isEditing}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {darkMode ? <Moon className="w-5 h-5 text-gray-400 mr-3" /> : <Sun className="w-5 h-5 text-gray-400 mr-3" />}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Dark Mode</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Use dark theme for better viewing in low light</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
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

          {/* Account Security */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-5 h-5 text-green-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Account Security</h3>
            </div>
            <div className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Two-Factor Authentication
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Login History
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50">
                Delete Account
              </Button>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Download Data
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Privacy Settings
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Help & Support
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;