import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  Clock, 
  Users, 
  Star,
  Filter,
  Search,
  Calendar,
  Award,
  ChevronRight
} from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const Courses: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const courses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      instructor: 'Dr. Sarah Johnson',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      duration: '12 weeks',
      rating: 4.8,
      students: 156,
      thumbnail: 'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Mathematics',
      difficulty: 'Advanced',
      nextLesson: 'Calculus Integration',
      nextLessonTime: '2024-01-15T10:00'
    },
    {
      id: 2,
      title: 'Physics Fundamentals',
      instructor: 'Prof. Michael Smith',
      progress: 60,
      totalLessons: 20,
      completedLessons: 12,
      duration: '10 weeks',
      rating: 4.6,
      students: 203,
      thumbnail: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Science',
      difficulty: 'Intermediate',
      nextLesson: 'Newton\'s Laws',
      nextLessonTime: '2024-01-15T14:00'
    },
    {
      id: 3,
      title: 'English Literature',
      instructor: 'Mrs. Emily Davis',
      progress: 85,
      totalLessons: 16,
      completedLessons: 14,
      duration: '8 weeks',
      rating: 4.9,
      students: 89,
      thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Literature',
      difficulty: 'Intermediate',
      nextLesson: 'Shakespeare Analysis',
      nextLessonTime: '2024-01-16T09:00'
    },
    {
      id: 4,
      title: 'Computer Science Basics',
      instructor: 'Dr. James Wilson',
      progress: 40,
      totalLessons: 30,
      completedLessons: 12,
      duration: '16 weeks',
      rating: 4.7,
      students: 245,
      thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Technology',
      difficulty: 'Beginner',
      nextLesson: 'Data Structures',
      nextLessonTime: '2024-01-16T11:00'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesFilter = filter === 'all' || course.category.toLowerCase() === filter;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Courses</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Continue your learning journey</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <BookOpen className="w-4 h-4 mr-2" />
            Browse All Courses
          </Button>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Categories</option>
              <option value="mathematics">Mathematics</option>
              <option value="science">Science</option>
              <option value="literature">Literature</option>
              <option value="technology">Technology</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="overflow-hidden">
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="font-medium text-gray-900 dark:text-white">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  by {course.instructor}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-200">Next Lesson</p>
                      <p className="text-xs text-blue-700 dark:text-blue-300">{course.nextLesson}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        {new Date(course.nextLessonTime).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        {new Date(course.nextLessonTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Play className="w-4 h-4 mr-1" />
                    Continue
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">4</h3>
          <p className="text-gray-600 dark:text-gray-400">Active Courses</p>
        </Card>
        <Card className="p-6 text-center">
          <Award className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2</h3>
          <p className="text-gray-600 dark:text-gray-400">Completed Courses</p>
        </Card>
        <Card className="p-6 text-center">
          <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">156</h3>
          <p className="text-gray-600 dark:text-gray-400">Hours Learned</p>
        </Card>
      </div>
    </div>
  );
};

export default Courses;