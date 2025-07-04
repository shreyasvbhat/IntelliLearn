import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  BookOpen,
  AlertCircle
} from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const events = [
    {
      id: 1,
      title: 'Mathematics Class',
      type: 'class',
      date: '2024-01-15',
      time: '10:00',
      duration: 60,
      location: 'Room 101',
      instructor: 'Dr. Johnson',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Physics Lab',
      type: 'lab',
      date: '2024-01-15',
      time: '14:00',
      duration: 120,
      location: 'Physics Lab A',
      instructor: 'Prof. Smith',
      color: 'green'
    },
    {
      id: 3,
      title: 'Calculus Assignment Due',
      type: 'assignment',
      date: '2024-01-16',
      time: '23:59',
      duration: 0,
      location: 'Online',
      color: 'red'
    },
    {
      id: 4,
      title: 'English Literature Discussion',
      type: 'class',
      date: '2024-01-17',
      time: '09:00',
      duration: 90,
      location: 'Room 205',
      instructor: 'Mrs. Davis',
      color: 'purple'
    },
    {
      id: 5,
      title: 'Chemistry Quiz',
      type: 'exam',
      date: '2024-01-18',
      time: '15:00',
      duration: 45,
      location: 'Room 301',
      instructor: 'Dr. Wilson',
      color: 'orange'
    },
    {
      id: 6,
      title: 'Study Group - Physics',
      type: 'study',
      date: '2024-01-19',
      time: '16:00',
      duration: 120,
      location: 'Library',
      color: 'teal'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'class': return <BookOpen className="w-3 h-3" />;
      case 'lab': return <Users className="w-3 h-3" />;
      case 'assignment': return <AlertCircle className="w-3 h-3" />;
      case 'exam': return <Clock className="w-3 h-3" />;
      case 'study': return <Users className="w-3 h-3" />;
      default: return <CalendarIcon className="w-3 h-3" />;
    }
  };

  const getEventColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      green: 'bg-green-500 text-white',
      red: 'bg-red-500 text-white',
      purple: 'bg-purple-500 text-white',
      orange: 'bg-orange-500 text-white',
      teal: 'bg-teal-500 text-white'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500 text-white';
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border border-gray-200 dark:border-gray-700"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = getEventsForDate(dateString);
      const isToday = new Date().toDateString() === new Date(dateString).toDateString();

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 dark:border-gray-700 p-1 ${
            isToday ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
            {day}
          </div>
          <div className="space-y-1 mt-1">
            {dayEvents.slice(0, 2).map(event => (
              <div
                key={event.id}
                className={`text-xs px-1 py-0.5 rounded truncate ${getEventColor(event.color)}`}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date + 'T' + event.time) >= new Date())
    .sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calendar</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your schedule and upcoming events</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add Event
          </Button>
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
            {['month', 'week', 'day'].map((viewType) => (
              <button
                key={viewType}
                onClick={() => setView(viewType as 'month' | 'week' | 'day')}
                className={`px-3 py-1 text-sm capitalize ${
                  view === viewType
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                } ${viewType === 'month' ? 'rounded-l-lg' : viewType === 'day' ? 'rounded-r-lg' : ''}`}
              >
                {viewType}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Today
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              {/* Day headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div
                  key={day}
                  className="bg-gray-50 dark:bg-gray-800 p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700"
                >
                  {day}
                </div>
              ))}
              {/* Calendar days */}
              {renderCalendarDays()}
            </div>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Events</h3>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className={`w-3 h-3 rounded-full ${getEventColor(event.color).split(' ')[0]}`}></div>
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">{event.title}</h4>
                      </div>
                      <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <CalendarIcon className="w-3 h-3 mr-1" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{event.time}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {getEventTypeIcon(event.type)}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">This Week</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Classes</span>
                <span className="font-medium text-gray-900 dark:text-white">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Assignments Due</span>
                <span className="font-medium text-gray-900 dark:text-white">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Exams</span>
                <span className="font-medium text-gray-900 dark:text-white">1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Study Sessions</span>
                <span className="font-medium text-gray-900 dark:text-white">2</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;