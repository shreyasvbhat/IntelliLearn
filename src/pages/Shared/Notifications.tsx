import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Check, 
  X,
  Filter,
  MoreVertical,
  BookOpen,
  Users,
  Award,
  AlertTriangle,
  MessageCircle,
  Calendar,
  Settings,
  GraduationCap,
  UserCheck,
  FileText,
  TrendingUp
} from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useAuth } from '../../contexts/AuthContext';

const Notifications: React.FC = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');

  // Role-specific notifications
  const getNotifications = () => {
    switch (user?.role) {
      case 'student':
        return [
          {
            id: 1,
            type: 'assignment',
            title: 'New Assignment Posted',
            message: 'Dr. Johnson posted a new calculus assignment due Friday',
            timestamp: new Date(Date.now() - 300000),
            read: false,
            priority: 'high',
            actionUrl: '/assignments'
          },
          {
            id: 2,
            type: 'grade',
            title: 'Assignment Graded',
            message: 'Your physics lab report has been graded: 85/100',
            timestamp: new Date(Date.now() - 1800000),
            read: false,
            priority: 'medium',
            actionUrl: '/assignments'
          },
          {
            id: 3,
            type: 'message',
            title: 'New Message',
            message: 'Emma Thompson sent you a message about the study group',
            timestamp: new Date(Date.now() - 3600000),
            read: true,
            priority: 'low',
            actionUrl: '/messages'
          },
          {
            id: 4,
            type: 'achievement',
            title: 'Badge Earned!',
            message: 'Congratulations! You earned the "Math Wizard" badge',
            timestamp: new Date(Date.now() - 7200000),
            read: true,
            priority: 'medium',
            actionUrl: '/progress'
          },
          {
            id: 5,
            type: 'reminder',
            title: 'Class Reminder',
            message: 'Physics class starts in 30 minutes - Room 302',
            timestamp: new Date(Date.now() - 10800000),
            read: true,
            priority: 'high',
            actionUrl: '/calendar'
          }
        ];

      case 'teacher':
        return [
          {
            id: 1,
            type: 'student_question',
            title: 'Student Question',
            message: 'Alex Chen asked about integration by parts in Mathematics',
            timestamp: new Date(Date.now() - 300000),
            read: false,
            priority: 'high',
            actionUrl: '/messages'
          },
          {
            id: 2,
            type: 'assignment_submission',
            title: 'Assignment Submissions',
            message: '15 students submitted their calculus assignments',
            timestamp: new Date(Date.now() - 1800000),
            read: false,
            priority: 'medium',
            actionUrl: '/assignments'
          },
          {
            id: 3,
            type: 'parent_message',
            title: 'Parent Communication',
            message: 'Mrs. Wilson wants to discuss Emma\'s progress',
            timestamp: new Date(Date.now() - 3600000),
            read: true,
            priority: 'medium',
            actionUrl: '/messages'
          },
          {
            id: 4,
            type: 'low_performance',
            title: 'Student Alert',
            message: '3 students showing declining performance in Physics',
            timestamp: new Date(Date.now() - 7200000),
            read: true,
            priority: 'high',
            actionUrl: '/analytics'
          },
          {
            id: 5,
            type: 'class_reminder',
            title: 'Class Schedule',
            message: 'Advanced Mathematics class in 15 minutes - Room 101',
            timestamp: new Date(Date.now() - 10800000),
            read: true,
            priority: 'medium',
            actionUrl: '/calendar'
          },
          {
            id: 6,
            type: 'ai_content',
            title: 'AI Content Ready',
            message: 'New personalized content generated for struggling students',
            timestamp: new Date(Date.now() - 86400000),
            read: true,
            priority: 'low',
            actionUrl: '/ai-content'
          }
        ];

      case 'parent':
        return [
          {
            id: 1,
            type: 'grade_update',
            title: 'Grade Update',
            message: 'Alex received 92/100 on the English Literature essay',
            timestamp: new Date(Date.now() - 300000),
            read: false,
            priority: 'medium',
            actionUrl: '/child-progress'
          },
          {
            id: 2,
            type: 'teacher_message',
            title: 'Teacher Communication',
            message: 'Dr. Johnson sent an update about Alex\'s math progress',
            timestamp: new Date(Date.now() - 1800000),
            read: false,
            priority: 'high',
            actionUrl: '/messages'
          },
          {
            id: 3,
            type: 'attendance',
            title: 'Attendance Alert',
            message: 'Alex was marked absent from Physics class today',
            timestamp: new Date(Date.now() - 3600000),
            read: true,
            priority: 'high',
            actionUrl: '/attendance'
          },
          {
            id: 4,
            type: 'assignment_due',
            title: 'Assignment Reminder',
            message: 'Chemistry lab report due tomorrow',
            timestamp: new Date(Date.now() - 7200000),
            read: true,
            priority: 'medium',
            actionUrl: '/assignments'
          },
          {
            id: 5,
            type: 'parent_conference',
            title: 'Parent-Teacher Conference',
            message: 'Scheduled meeting with Mrs. Davis on Friday at 3:00 PM',
            timestamp: new Date(Date.now() - 86400000),
            read: true,
            priority: 'high',
            actionUrl: '/calendar'
          },
          {
            id: 6,
            type: 'achievement',
            title: 'Student Achievement',
            message: 'Alex earned the "Science Explorer" badge in Biology',
            timestamp: new Date(Date.now() - 172800000),
            read: true,
            priority: 'low',
            actionUrl: '/child-progress'
          }
        ];

      default:
        return [];
    }
  };

  const [notifications, setNotifications] = useState(getNotifications());

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'assignment':
      case 'assignment_submission':
      case 'assignment_due':
        return <BookOpen className="w-5 h-5 text-blue-500" />;
      case 'grade':
      case 'grade_update':
        return <Award className="w-5 h-5 text-green-500" />;
      case 'message':
      case 'teacher_message':
      case 'parent_message':
        return <MessageCircle className="w-5 h-5 text-purple-500" />;
      case 'achievement':
        return <Award className="w-5 h-5 text-yellow-500" />;
      case 'reminder':
      case 'class_reminder':
        return <Calendar className="w-5 h-5 text-orange-500" />;
      case 'student_question':
        return <Users className="w-5 h-5 text-blue-500" />;
      case 'low_performance':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'ai_content':
        return <GraduationCap className="w-5 h-5 text-purple-500" />;
      case 'attendance':
        return <UserCheck className="w-5 h-5 text-orange-500" />;
      case 'parent_conference':
        return <Users className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hour${Math.floor(diffInSeconds / 3600) > 1 ? 's' : ''} ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} day${Math.floor(diffInSeconds / 86400) > 1 ? 's' : ''} ago`;
    return timestamp.toLocaleDateString();
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  // Role-specific filter tabs
  const getFilterTabs = () => {
    const baseFilters = [
      { value: 'all', label: 'All', count: notifications.length },
      { value: 'unread', label: 'Unread', count: unreadCount }
    ];

    switch (user?.role) {
      case 'student':
        return [
          ...baseFilters,
          { value: 'assignment', label: 'Assignments', count: notifications.filter(n => n.type === 'assignment').length },
          { value: 'grade', label: 'Grades', count: notifications.filter(n => n.type === 'grade').length },
          { value: 'message', label: 'Messages', count: notifications.filter(n => n.type === 'message').length },
          { value: 'reminder', label: 'Reminders', count: notifications.filter(n => n.type === 'reminder').length }
        ];

      case 'teacher':
        return [
          ...baseFilters,
          { value: 'student_question', label: 'Questions', count: notifications.filter(n => n.type === 'student_question').length },
          { value: 'assignment_submission', label: 'Submissions', count: notifications.filter(n => n.type === 'assignment_submission').length },
          { value: 'parent_message', label: 'Parents', count: notifications.filter(n => n.type === 'parent_message').length },
          { value: 'low_performance', label: 'Alerts', count: notifications.filter(n => n.type === 'low_performance').length }
        ];

      case 'parent':
        return [
          ...baseFilters,
          { value: 'grade_update', label: 'Grades', count: notifications.filter(n => n.type === 'grade_update').length },
          { value: 'teacher_message', label: 'Teachers', count: notifications.filter(n => n.type === 'teacher_message').length },
          { value: 'attendance', label: 'Attendance', count: notifications.filter(n => n.type === 'attendance').length },
          { value: 'parent_conference', label: 'Meetings', count: notifications.filter(n => n.type === 'parent_conference').length }
        ];

      default:
        return baseFilters;
    }
  };

  const filterTabs = getFilterTabs();

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
            <Bell className="w-8 h-8 text-blue-500 mr-3" />
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-sm rounded-full px-2 py-1">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Stay updated with your latest activities</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Button 
            onClick={markAllAsRead}
            variant="outline" 
            size="sm"
            disabled={unreadCount === 0}
          >
            <Check className="w-4 h-4 mr-1" />
            Mark All Read
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </Button>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <Card className="p-4">
        <div className="flex items-center space-x-1 overflow-x-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === tab.value
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  filter === tab.value
                    ? 'bg-blue-400 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card className="p-12 text-center">
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No notifications
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {filter === 'unread' ? "You're all caught up!" : "No notifications in this category."}
            </p>
          </Card>
        ) : (
          filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`p-4 border-l-4 ${getPriorityColor(notification.priority)} ${
                !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className={`font-medium ${
                          !notification.read 
                            ? 'text-gray-900 dark:text-white' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className={`text-sm ${
                        !notification.read 
                          ? 'text-gray-700 dark:text-gray-300' 
                          : 'text-gray-600 dark:text-gray-400'
                      } mb-2`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-4">
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {getTimeAgo(notification.timestamp)}
                        </span>
                        {notification.actionUrl && (
                          <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                            View Details
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4 text-gray-500" />
                      </button>
                    )}
                    <div className="relative">
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      title="Delete notification"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredNotifications.length > 0 && (
        <div className="text-center">
          <Button variant="outline">
            Load More Notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default Notifications;