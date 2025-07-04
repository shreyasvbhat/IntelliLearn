import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Upload,
  Download,
  Eye,
  Filter,
  Search
} from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const Assignments: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const assignments = [
    {
      id: 1,
      title: 'Calculus Integration Problems',
      subject: 'Mathematics',
      dueDate: '2024-01-20T23:59',
      submittedDate: null,
      status: 'pending',
      points: 100,
      description: 'Solve the integration problems from Chapter 12. Show all work and explain your reasoning.',
      attachments: ['calculus_problems.pdf'],
      submissionType: 'file',
      attempts: 0,
      maxAttempts: 3
    },
    {
      id: 2,
      title: 'Physics Lab Report - Pendulum Motion',
      subject: 'Physics',
      dueDate: '2024-01-18T23:59',
      submittedDate: '2024-01-17T14:30',
      status: 'submitted',
      points: 75,
      score: 68,
      description: 'Write a comprehensive lab report on pendulum motion experiment conducted in class.',
      attachments: ['lab_template.docx'],
      submissionType: 'file',
      attempts: 1,
      maxAttempts: 2,
      feedback: 'Good analysis but needs more detailed conclusion.'
    },
    {
      id: 3,
      title: 'Shakespeare Essay - Hamlet Analysis',
      subject: 'English Literature',
      dueDate: '2024-01-15T23:59',
      submittedDate: '2024-01-14T20:15',
      status: 'graded',
      points: 100,
      score: 92,
      description: 'Analyze the character development of Hamlet throughout the play.',
      attachments: ['essay_guidelines.pdf'],
      submissionType: 'text',
      attempts: 1,
      maxAttempts: 1,
      feedback: 'Excellent analysis with strong supporting evidence. Well written!'
    },
    {
      id: 4,
      title: 'Chemistry Quiz - Organic Compounds',
      subject: 'Chemistry',
      dueDate: '2024-01-22T15:00',
      submittedDate: null,
      status: 'upcoming',
      points: 50,
      description: 'Online quiz covering organic compound structures and nomenclature.',
      attachments: ['study_guide.pdf'],
      submissionType: 'quiz',
      attempts: 0,
      maxAttempts: 1
    },
    {
      id: 5,
      title: 'History Research Project',
      subject: 'History',
      dueDate: '2024-01-16T23:59',
      submittedDate: null,
      status: 'overdue',
      points: 150,
      description: 'Research and present on a significant historical event of your choice.',
      attachments: ['project_rubric.pdf'],
      submissionType: 'presentation',
      attempts: 0,
      maxAttempts: 1
    }
  ];

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

  const filteredAssignments = assignments.filter(assignment => {
    const matchesFilter = filter === 'all' || assignment.status === filter;
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2</h3>
          <p className="text-gray-600 dark:text-gray-400">Pending</p>
        </Card>
        <Card className="p-6 text-center">
          <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1</h3>
          <p className="text-gray-600 dark:text-gray-400">Submitted</p>
        </Card>
        <Card className="p-6 text-center">
          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1</h3>
          <p className="text-gray-600 dark:text-gray-400">Graded</p>
        </Card>
        <Card className="p-6 text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1</h3>
          <p className="text-gray-600 dark:text-gray-400">Overdue</p>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search assignments..."
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
        {filteredAssignments.map((assignment, index) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {assignment.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{assignment.subject}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                        {getStatusIcon(assignment.status)}
                        <span className="ml-1 capitalize">{assignment.status}</span>
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{assignment.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Due Date</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(assignment.dueDate).toLocaleDateString()} at{' '}
                        {new Date(assignment.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {assignment.status !== 'graded' && assignment.status !== 'submitted' && (
                        <p className={`text-xs ${getDaysUntilDue(assignment.dueDate) < 0 ? 'text-red-500' : getDaysUntilDue(assignment.dueDate) <= 2 ? 'text-yellow-500' : 'text-gray-500'}`}>
                          {getDaysUntilDue(assignment.dueDate) < 0 
                            ? `${Math.abs(getDaysUntilDue(assignment.dueDate))} days overdue`
                            : getDaysUntilDue(assignment.dueDate) === 0 
                              ? 'Due today'
                              : `${getDaysUntilDue(assignment.dueDate)} days left`
                          }
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Points</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {assignment.score ? `${assignment.score}/${assignment.points}` : assignment.points}
                      </p>
                      {assignment.score && (
                        <p className="text-xs text-gray-500">
                          {Math.round((assignment.score / assignment.points) * 100)}%
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Attempts</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {assignment.attempts}/{assignment.maxAttempts}
                      </p>
                    </div>
                  </div>

                  {assignment.feedback && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-200">Teacher Feedback:</p>
                      <p className="text-sm text-blue-800 dark:text-blue-300 mt-1">{assignment.feedback}</p>
                    </div>
                  )}

                  {assignment.attachments.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attachments:</p>
                      <div className="flex flex-wrap gap-2">
                        {assignment.attachments.map((attachment, idx) => (
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
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Upload className="w-4 h-4 mr-1" />
                      Submit
                    </Button>
                  )}
                  {assignment.status === 'upcoming' && assignment.submissionType === 'quiz' && (
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Eye className="w-4 h-4 mr-1" />
                      Take Quiz
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