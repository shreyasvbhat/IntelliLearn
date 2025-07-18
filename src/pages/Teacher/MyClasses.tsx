import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, BookOpen, Calendar, Clock, TrendingUp,
  AlertTriangle, MessageCircle, Settings, Plus, Search, Filter, X
} from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import * as API from '../../api/APICalls';
import { useAuth } from '../../contexts/AuthContext';

interface ClassItem {
  _id: string;
  name: string;
  subject: string;
  students: any[];
  schedule: string;
  room: string;
  averageGrade: number;
  attendance: number;
  nextClass: string;
  recentActivity: string;
  color: string;
  description?: string;
  teacherId: string;
}

const MyClasses: React.FC = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<ClassItem[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const getColorForClass = (index: number) => {
    const colors = ['blue', 'green', 'purple', 'orange'];
    return colors[index % colors.length];
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 border-blue-200',
      green: 'bg-green-500 border-green-200',
      purple: 'bg-purple-500 border-purple-200',
      orange: 'bg-orange-500 border-orange-200'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500 border-gray-200';
  };

  const { user } = useAuth();

  const fetchClasses = async () => {
    try {
      const allCourses = await API.getAllCourses();
      const teacherCourses = user
        ? allCourses.filter((course: any) => course.teacherId === user._id)
        : [];
      
      const formattedCourses = teacherCourses.map((course: any, index: number) => ({
        _id: course._id,
        name: course.title || course.name || course.courseName || 'Untitled Course',
        subject: course.subject || 'General',
        students: course.students || [],
        schedule: course.schedule || 'Schedule TBD',
        room: course.room || 'Room TBD',
        averageGrade: course.averageGrade || 0,
        attendance: course.attendance || 0,
        nextClass: course.nextClass || new Date().toISOString(),
        recentActivity: course.recentActivity || 'No recent activity',
        color: getColorForClass(index),
        description: course.description,
        teacherId: course.teacherId
      }));

      setClasses(formattedCourses);
      setFilteredClasses(formattedCourses);

      // Create activities from actual course data
      const activities = formattedCourses.flatMap((course: ClassItem) => {
        const activityTypes = ['assignment', 'question', 'grade', 'attendance'];
        return course.students.slice(0, 1).map((student: any, idx: number) => ({
          id: `${course._id}-${idx}`,
          type: activityTypes[Math.floor(Math.random() * activityTypes.length)],
          message: `Student ${student.name || 'Unknown'} ${
            idx % 2 === 0 ? 'submitted an assignment' : 'asked a question'
          }`,
          time: '1 day ago',
          class: course.name
        }));
      });
      setRecentActivities(activities);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [user]);

  useEffect(() => {
    const filtered = classes.filter(cls => {
      const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cls.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = selectedClass === 'all' || cls.subject.toLowerCase() === selectedClass;
      return matchesSearch && matchesFilter;
    });
    setFilteredClasses(filtered);
  }, [searchTerm, selectedClass, classes]);

  const handleCreateCourse = async () => {
    try {
      if (!newTitle.trim()) {
        alert("Course title is required.");
        return;
      }

      await API.createCourse({
        title: newTitle,
        description: newDescription,
      });

      setShowModal(false);
      setNewTitle('');
      setNewDescription('');
      await fetchClasses();
    } catch (error) {
      console.error('Error creating course:', error);
      alert("Failed to create course. Check console for details.");
    }
  };

  const upcomingClasses = classes
    .filter(cls => new Date(cls.nextClass) >= new Date())
    .sort((a, b) => new Date(a.nextClass).getTime() - new Date(b.nextClass).getTime())
    .slice(0, 3);

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
    <div className="space-y-6 relative">
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
          <Button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create New Class
          </Button>
        </div>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create New Class</h3>
              <button onClick={() => setShowModal(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Course Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white"
              />
              <textarea
                placeholder="Course Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white"
              />
              <Button onClick={handleCreateCourse} className="w-full bg-blue-600 hover:bg-blue-700">
                Create
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {classes.reduce((acc, cls) => acc + (cls.students?.length || 0), 0)}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Total Students</p>
        </Card>
        <Card className="p-6 text-center">
          <BookOpen className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{classes.length}</h3>
          <p className="text-gray-600 dark:text-gray-400">Active Classes</p>
        </Card>
        <Card className="p-6 text-center">
          <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">80%</h3>
          <p className="text-gray-600 dark:text-gray-400">Avg. Performance</p>
        </Card>
        <Card className="p-6 text-center">
          <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">0</h3>
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
                key={classItem._id}
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
                      <span className="font-medium text-gray-900 dark:text-white">{classItem.students.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Avg. Grade</span>
                      <span className="font-medium text-gray-900 dark:text-white">{classItem.averageGrade || 0}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Attendance</span>
                      <span className="font-medium text-gray-900 dark:text-white">{classItem.attendance || 0}%</span>
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
              {upcomingClasses.map((cls, index) => (
                <motion.div
                  key={cls._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {cls.name}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {cls.room || 'Room TBD'}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>
                      {cls.nextClass ? new Date(cls.nextClass).toLocaleDateString() : 'TBD'}
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
