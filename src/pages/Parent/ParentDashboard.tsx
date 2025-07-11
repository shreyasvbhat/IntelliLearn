import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Clock,
  MessageCircle,
  AlertCircle,
  Calendar,
  Award,
  BookOpen,
  Target,
} from 'lucide-react';
import Card from '../../components/UI/Card';
import ProgressChart from '../../components/Charts/ProgressChart';
import * as API from '../../api/APICalls';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

interface Subject {
  name: string;
  grade: string;
  progress: number;
  teacher: string;
}

interface Activity {
  type: string;
  subject: string;
  description: string;
  score?: number;
  date: string;
}

interface Alert {
  type: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
}

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState<{ name: string; progress: number; engagement: number }[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildData = async () => {
      if (!user || user.role !== 'parent') {
        toast.error('Unauthorized or invalid role');
        return;
      }

      try {
        setLoading(true);

        // Fetch parent profile to get children
        const parentRes = await API.getProfile();
        const childrenIds = parentRes.children || [];

        if (childrenIds.length === 0) {
          toast('No children linked to your account');
          setLoading(false);
          return;
        }

        const childId = childrenIds[0];

        // Reuse existing /api/users/students endpoint
        const allStudents = await API.getStudents();
        const child = allStudents.find((student:any) => student._id === childId);

        if (!child) {
          toast.error('Child not found');
          setLoading(false);
          return;
        }

        

        // Courses
        const enrolledCourseIds = child.enrolledCourses || [];
        let coursesData: any[] = [];

        if (enrolledCourseIds.length > 0) {
          // Get course details for each enrolled course
          const coursePromises = enrolledCourseIds.map((id: string) => API.getCourseById(id));
          coursesData = await Promise.all(coursePromises);
        }

        // Map courses to subjects
        const subjectList: Subject[] = coursesData.map((course) => ({
          name: course.title,
          grade: 'B+', // Example grade or calculate if you have backend logic
          progress: Math.floor(Math.random() * 30) + 70, // Example progress
          teacher: course.teacherId?.name || 'Unknown',
        }));

        // Progress data from child.progress or fallback
        const chartData = [
          { name: 'Jan', progress: 60, engagement: 70 },
          { name: 'Feb', progress: 65, engagement: 75 },
          { name: 'Mar', progress: 70, engagement: 80 },
          { name: 'Apr', progress: 75, engagement: 82 },
          { name: 'May', progress: 80, engagement: 85 },
          { name: 'Jun', progress: 85, engagement: 88 },
        ];

        // Activities from achievements or assignments
        const activityList: Activity[] = (child.achievements || []).map((ach: any, i: any) => ({
          type: 'achievement',
          subject: 'General',
          description: ach,
          date: new Date().toISOString().split('T')[0],
        }));

        // Alerts example: if learning rate low
        const alertList: Alert[] = [];
        if (child.learningRate < 50) {
          alertList.push({ type: 'attention', message: 'Child learning rate is low', priority: 'high' });
        }

        setProgressData(chartData);
        setSubjects(subjectList);
        setActivities(activityList);
        setAlerts(alertList);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch child data');
      } finally {
        setLoading(false);
      }
    };

    fetchChildData();
  }, [user]);

  if (loading) {
    return <div className="text-center py-20 text-gray-500 dark:text-gray-400">Loading child progress...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Your Child's Progress</h1>
        <p className="text-purple-100">Monitoring your child's learning journey</p>
        <div className="mt-4 flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Overall Grade: B+</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>{activities.length} Achievements</span>
          </div>
        </div>
      </motion.div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <Card className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/50">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Attention Required</h3>
          </div>
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <p key={index} className="text-sm text-yellow-700 dark:text-yellow-300">
                • {alert.message}
              </p>
            ))}
          </div>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">82%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Study Hours</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">28h</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Attendance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">94%</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{subjects.length}</p>
            </div>
            <BookOpen className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            6-Month Progress Trend
          </h3>
          <ProgressChart data={progressData} height={250} />
        </Card>

        {/* Subject Performance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Subject Performance
          </h3>
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{subject.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Teacher: {subject.teacher}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                      {subject.grade}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-3">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{subject.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <Calendar className="w-6 h-6 text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activities
          </h3>
        </div>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-shrink-0 mt-1">
                {activity.type === 'assignment' && <BookOpen className="w-4 h-4 text-blue-500" />}
                {activity.type === 'doubt' && <MessageCircle className="w-4 h-4 text-yellow-500" />}
                {activity.type === 'achievement' && <Award className="w-4 h-4 text-green-500" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">{activity.subject}</h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{activity.description}</p>
                {activity.score && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                    Score: {activity.score}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ParentDashboard;
