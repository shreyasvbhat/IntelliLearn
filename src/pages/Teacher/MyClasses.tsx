import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Calendar,
  Clock,
  TrendingUp,
  AlertTriangle,
  MessageCircle,
  Settings,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const MyClasses: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const classes = [
    {
      id: 1,
      name: 'Advanced Mathematics - Grade 12',
      subject: 'Mathematics',
      students: 28,
      schedule: 'Mon, Wed, Fri - 10:00 AM',
      room: 'Room 101',
      averageGrade: 85,
      attendance: 92,
      nextClass: '2024-01-15T10:00',
      recentActivity: 'Assignment submitted by 15 students',
      color: 'blue'
    },
    {
      id: 2,
      name: 'Physics Fundamentals - Grade 11',
      subject: 'Physics',
      students: 24,
      schedule: 'Tue, Thu - 2:00 PM',
      room: 'Lab A',
      averageGrade: 78,
      attendance: 88,
      nextClass: '2024-01-16T14:00',
      recentActivity: 'Lab report due tomorrow',
      color: 'green'
    },
    {
      id: 3,
      name: 'Calculus I - Grade 12',
      subject: 'Mathematics',
      students: 22,
      schedule: 'Mon, Wed - 2:00 PM',
      room: 'Room 205',
      averageGrade: 82,
      attendance: 95,
      nextClass: '2024-01-15T14:00',
      recentActivity: 'Quiz scheduled for next week',
      color: 'purple'
    },
    {
      id: 4,
      name: 'General Physics - Grade 10',
      subject: 'Physics',
      students: 30,
      schedule: 'Tue, Thu, Fri - 11:00 AM',
      room: 'Room 302',
      averageGrade: 75,
      attendance: 85,
      nextClass: '2024-01-16T11:00',
      recentActivity: '3 students need attention',
      color: 'orange'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'assignment', message: '15 students submitted Calculus Assignment', time: '2 hours ago', class: 'Advanced Mathematics' },
    { id: 2, type: 'question', message: 'Sarah asked about Newton\'s Laws', time: '4 hours ago', class: 'Physics Fundamentals' },
    { id: 3, type: 'grade', message: 'Graded 22 quiz submissions', time: '1 day ago', class: 'Calculus I' },
    { id: 4, type: 'attendance', message: 'Attendance marked for morning classes', time: '1 day ago', class: 'General Physics' }
  ];

  const upcomingClasses = classes
    .filter(cls => new Date(cls.nextClass) >= new Date())
    .sort((a, b) => new Date(a.nextClass).getTime() - new Date(b.nextClass).getTime())
    .slice(0, 3);

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedClass === 'all' || cls.subject.toLowerCase() === selectedClass;
    return matchesSearch && matchesFilter;
  });

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 border-blue-200',
      green: 'bg-green-500 border-green-200',
      purple: 'bg-purple-500 border-purple-200',
      orange: 'bg-orange-500 border-orange-200'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500 border-gray-200';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assignment': return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'question': return <MessageCircle className="w-4 h-4 text-green-500" />;
      case 'grade': return <TrendingUp className="w-4 h-4 text-purple-500" />;
      case 'attendance': return <Users className="w-4 h-4 text-orange-500" />;
      default: return <Calendar className="w-4 h-4 text-gray-500" />;
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Classes</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your classes and track student progress</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create New Class
          </Button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">104</h3>
          <p className="text-gray-600 dark:text-gray-400">Total Students</p>
        </Card>
        <Card className="p-6 text-center">
          <BookOpen className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">4</h3>
          <p className="text-gray-600 dark:text-gray-400">Active Classes</p>
        </Card>
        <Card className="p-6 text-center">
          <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">80%</h3>
          <p className="text-gray-600 dark:text-gray-400">Avg. Performance</p>
        </Card>
        <Card className="p-6 text-center">
          <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">7</h3>
          <p className="text-gray-600 dark:text-gray-400">Need Attention</p>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Subjects</option>
              <option value="mathematics">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="biology">Biology</option>
            </select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Classes Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredClasses.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className={`w-4 h-4 rounded-full ${getColorClasses(classItem.color).split(' ')[0]} mb-2`}></div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {classItem.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{classItem.room}</p>
                    </div>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Settings className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Students</span>
                      <span className="font-medium text-gray-900 dark:text-white">{classItem.students}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Avg. Grade</span>
                      <span className="font-medium text-gray-900 dark:text-white">{classItem.averageGrade}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Attendance</span>
                      <span className="font-medium text-gray-900 dark:text-white">{classItem.attendance}%</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{classItem.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Next: {new Date(classItem.nextClass).toLocaleDateString()} at {new Date(classItem.nextClass).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                      {classItem.recentActivity}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Users className="w-4 h-4 mr-1" />
                      View Students
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Classes */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Calendar className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Classes</h3>
            </div>
            <div className="space-y-3">
              {upcomingClasses.map((classItem, index) => (
                <motion.div
                  key={classItem.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {classItem.name.split(' - ')[0]}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {classItem.room}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>
                      {new Date(classItem.nextClass).toLocaleDateString()} at{' '}
                      {new Date(classItem.nextClass).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Recent Activities */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h3>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500 dark:text-gray-500">{activity.class}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Create Assignment
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <MessageCircle className="w-4 h-4 mr-2" />
                Send Announcement
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Class
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyClasses;