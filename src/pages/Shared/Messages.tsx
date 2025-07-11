import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  Search,
  Plus,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Users,
  Star,
  Archive,
  BookOpen,
  GraduationCap,
  UserCheck
} from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useAuth } from '../../contexts/AuthContext';
import * as API from '../../api/APICalls';
const Messages: React.FC = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        if (!user) return;

        let convos: any[] = [];

        if (user.role === 'parent') {
          const parentProfile = await API.getProfile();
          const childrenIds = parentProfile.children || [];

          if (childrenIds.length > 0) {
            const allStudents = await API.getAllStudents();
            const child = allStudents.find((s:any) => s._id === childrenIds[0]);

            if (child && child.enrolledCourses.length > 0) {
              const allCourses = await API.getAllCourses();

              const childCourses = allCourses.filter((course: any) => 
                child.enrolledCourses.includes(course._id)
              );

              // For each course, find teacher
              const teacherConvos = childCourses.map((course:any) => ({
                id: course.teacherId?._id || course.teacherId,
                name: course.teacherId?.name || "Teacher",
                role: 'Teacher',
                avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${course.title}`,
                lastMessage: `Discuss about ${course.title}`,
                timestamp: 'Recently',
                unread: 0,
                online: true,
                type: 'teacher',
              }));

              convos = teacherConvos;
            }
          }
        } else if (user.role === 'student') {
          const studentProfile = await API.getProfile();

          if (studentProfile.enrolledCourses.length > 0) {
            const allCourses = await API.getAllCourses();

            const studentCourses = allCourses.filter((course: { _id: any; }) => 
              studentProfile.enrolledCourses.includes(course._id)
            );

            const teacherConvos = studentCourses.map((course: { teacherId: any; title: any; }) => ({
              id: course.teacherId?._id || course.teacherId,
              name: course.teacherId?.name || "Teacher",
              role: 'Teacher',
              avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${course.title}`,
              lastMessage: `Discuss about ${course.title}`,
              timestamp: 'Recently',
              unread: 0,
              online: true,
              type: 'teacher',
            }));

            convos = teacherConvos;
          }
        } else if (user.role === 'teacher') {
          const teacherProfile = await API.getProfile();
          const allStudents = await API.getAllStudents();
          const allCourses = await API.getAllCourses();

          // Find courses taught by this teacher
          const myCourses = allCourses.filter((course: { teacherId: { _id: any; }; }) => 
            course.teacherId === teacherProfile._id || course.teacherId?._id === teacherProfile._id
          );

          // Find students enrolled in these courses
          const studentConvos = allStudents
            .filter((student: { enrolledCourses: any[]; }) => 
              student.enrolledCourses.some((courseId: any) => myCourses.map((c: { _id: any; }) => c._id).includes(courseId))
            )
            .map((student: { _id: any; name: any; }) => ({
              id: student._id,
              name: student.name,
              role: 'Student',
              avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`,
              lastMessage: `Check recent assignments`,
              timestamp: 'Recently',
              unread: 0,
              online: true,
              type: 'student',
            }));

          convos = studentConvos;
        }

        setConversations(convos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchConversations();
  }, [user]);

  // Optional: Fetch actual messages from backend if you implement (currently placeholder)
  useEffect(() => {
    if (selectedChat) {
      // You can implement API call to get messages by conversation id
      setMessages([]);
    }
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      senderId: 'current',
      senderName: 'You',
      content: newMessage,
      timestamp: new Date(),
      type: 'text',
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'class': return <Users className="w-4 h-4" />;
      case 'group': return <Users className="w-4 h-4" />;
      case 'teacher': return <GraduationCap className="w-4 h-4" />;
      case 'student': return <BookOpen className="w-4 h-4" />;
      case 'parent': return <UserCheck className="w-4 h-4" />;
      case 'faculty': return <Star className="w-4 h-4" />;
      case 'admin': return <Star className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'class': return 'text-blue-500';
      case 'group': return 'text-purple-500';
      case 'teacher': return 'text-green-500';
      case 'student': return 'text-blue-500';
      case 'parent': return 'text-orange-500';
      case 'faculty': return 'text-purple-500';
      case 'admin': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getHeaderTitle = () => {
    switch (user?.role) {
      case 'student': return 'Messages';
      case 'teacher': return 'Class Communications';
      case 'parent': return 'Teacher Communications';
      default: return 'Messages';
    }
  };

  const getHeaderSubtitle = () => {
    switch (user?.role) {
      case 'student': return 'Communicate with teachers and classmates';
      case 'teacher': return 'Manage communications with students and parents';
      case 'parent': return 'Stay connected with your child\'s teachers';
      default: return 'Stay connected';
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{getHeaderTitle()}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{getHeaderSubtitle()}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            {user?.role === 'teacher' ? 'New Announcement' : 'New Message'}
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="p-0 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto h-[500px]">
            {filteredConversations.map((conversation, index) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedChat(conversation.id)}
                className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  selectedChat === conversation.id ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full"
                    />
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900 dark:text-white truncate">
                          {conversation.name}
                        </h4>
                        <div className={getTypeColor(conversation.type)}>
                          {getTypeIcon(conversation.type)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {conversation.timestamp}
                        </span>
                        {conversation.unread > 0 && (
                          <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {conversation.role}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 truncate mt-1">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          {selectedChat ? (
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              {(() => {
                const selectedConversation = conversations.find(conv => conv.id === selectedChat);
                if (!selectedConversation) return null;
                return (
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={selectedConversation.avatar}
                          alt={selectedConversation.name}
                          className="w-10 h-10 rounded-full"
                        />
                        {selectedConversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {selectedConversation.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {selectedConversation.online ? 'Online' : selectedConversation.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {user?.role !== 'parent' && (
                        <>
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            <Video className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          </button>
                        </>
                      )}
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.senderId === 'current' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${
                      message.senderId === 'current'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    } rounded-lg p-3`}>
                      {message.senderId !== 'current' && (
                        <p className="text-xs font-medium mb-1 opacity-70">
                          {message.senderName}
                        </p>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Paperclip className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white pr-10"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                      <Smile className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;