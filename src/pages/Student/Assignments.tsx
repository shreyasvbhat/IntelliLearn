import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Clock, CheckCircle, AlertCircle, Calendar, Upload, Download, Eye, Filter, Search
} from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import * as API from '../../api/APICalls';
import { useParams } from 'react-router-dom';

const Assignments: React.FC = () => {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { courseId } = useParams<{ courseId: string }>();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
       // if (!courseId) throw new Error('Course ID is undefined');
        const profile = await API.getProfile();
        console.log(profile.achievements);
        setAssignments(profile.achievements || []);
      } catch (error) {
        console.error('Failed to fetch course assignments:', error);
      }
    };


    fetchAssignments();
    
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'submitted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'graded': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'upcoming': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'submitted': return <Upload className="w-4 h-4" />;
      case 'graded': return <CheckCircle className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      case 'upcoming': return <Calendar className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  // const filteredAssignments = assignments.filter(assignment:any => {
  //   const matchesFilter = filter === 'all' || assignment.status === filter;
  //   const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                         assignment.subject?.toLowerCase().includes(searchTerm.toLowerCase());
  //   return matchesFilter && matchesSearch;
  // });

  const handleSubmit = async (assignmentId: string) => {
    try {
      await API.submitAssignment(courseId, assignmentId);
    } catch (error) {
      console.error('Failed to submit assignment:', error);
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assignments</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your coursework and submissions</p>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
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
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
              <option value="graded">Graded</option>
              <option value="overdue">Overdue</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((assignment, index) => (
          <motion.div
            key={assignment._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{assignment.title}</h3>
                      
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                      {getStatusIcon(assignment.status)}
                      <span className="ml-1 capitalize">{assignment.status}</span>
                    </span>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-4">{assignment.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Due Date</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(assignment.dueDate).toLocaleDateString()} at {new Date(assignment.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {assignment.status !== 'graded' && assignment.status !== 'submitted' && (
                        <p className={`text-xs ${getDaysUntilDue(assignment.dueDate) < 0 ? 'text-red-500' : getDaysUntilDue(assignment.dueDate) <= 2 ? 'text-yellow-500' : 'text-gray-500'}`}>
                          {getDaysUntilDue(assignment.dueDate) < 0
                            ? `${Math.abs(getDaysUntilDue(assignment.dueDate))} days overdue`
                            : getDaysUntilDue(assignment.dueDate) === 0
                              ? 'Due today'
                              : `${getDaysUntilDue(assignment.dueDate)} days left`}
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Points</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        10
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Max Attempts</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {assignment.attempts}
                      </p>
                    </div>
                  </div>

                  {assignment.feedback && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-200">Teacher Feedback:</p>
                      <p className="text-sm text-blue-800 dark:text-blue-300 mt-1">{assignment.feedback}</p>
                    </div>
                  )}

                  {assignment.attachments?.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attachments:</p>
                      <div className="flex flex-wrap gap-2">
                        {assignment.attachments.map((attachment: string, idx: number) => (
                          <button
                            key={idx}
                            className="flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
                          >
                            <Download className="w-3 h-3" />
                            <span>{attachment}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
                  {assignment.status === 'pending' && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => handleSubmit(assignment.assignmentId)}>
                      <Upload className="w-4 h-4 mr-1" />
                      Submit
                    </Button>
                  )}
                  {(assignment.status === 'submitted' || assignment.status === 'graded') && (
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View Submission
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <FileText className="w-4 h-4 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
