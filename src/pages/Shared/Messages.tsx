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

const Messages: React.FC = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Role-specific conversations
  const getConversations = () => {
    switch (user?.role) {
      case 'student':
        return [
          {
            id: 1,
            name: 'Dr. Sarah Johnson',
            role: 'Mathematics Teacher',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sarah Johnson',
            lastMessage: 'Great work on your calculus assignment!',
            timestamp: '2 min ago',
            unread: 2,
            online: true,
            type: 'teacher'
          },
          {
            id: 2,
            name: 'Study Group - Physics',
            role: '5 members',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Physics Group',
            lastMessage: 'Alex: Can someone explain Newton\'s third law?',
            timestamp: '15 min ago',
            unread: 0,
            online: false,
            type: 'group'
          },
          {
            id: 3,
            name: 'Prof. Michael Smith',
            role: 'Physics Teacher',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Michael Smith',
            lastMessage: 'Lab report deadline extended to Friday',
            timestamp: '1 hour ago',
            unread: 1,
            online: false,
            type: 'teacher'
          },
          {
            id: 4,
            name: 'Emma Thompson',
            role: 'Classmate',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Emma Thompson',
            lastMessage: 'Thanks for helping with the chemistry homework!',
            timestamp: '2 hours ago',
            unread: 0,
            online: true,
            type: 'student'
          }
        ];

      case 'teacher':
        return [
          {
            id: 1,
            name: 'Mathematics Class - Grade 12',
            role: '28 students',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Math Class',
            lastMessage: 'Assignment reminder sent to all students',
            timestamp: '5 min ago',
            unread: 3,
            online: false,
            type: 'class'
          },
          {
            id: 2,
            name: 'Alex Chen',
            role: 'Student - Grade 12',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Alex Chen',
            lastMessage: 'Could you explain the integration by parts method?',
            timestamp: '20 min ago',
            unread: 1,
            online: true,
            type: 'student'
          },
          {
            id: 3,
            name: 'Mrs. Patricia Wilson',
            role: 'Parent of Emma Wilson',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Patricia Wilson',
            lastMessage: 'Thank you for the progress update on Emma',
            timestamp: '1 hour ago',
            unread: 0,
            online: false,
            type: 'parent'
          },
          {
            id: 4,
            name: 'Physics Department',
            role: 'Faculty Group',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Physics Dept',
            lastMessage: 'New curriculum guidelines available',
            timestamp: '3 hours ago',
            unread: 2,
            online: false,
            type: 'faculty'
          },
          {
            id: 5,
            name: 'Sarah Johnson',
            role: 'Student - Grade 11',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sarah Johnson Student',
            lastMessage: 'I\'m struggling with the physics concepts',
            timestamp: '5 hours ago',
            unread: 0,
            online: true,
            type: 'student'
          }
        ];

      case 'parent':
        return [
          {
            id: 1,
            name: 'Dr. Sarah Johnson',
            role: 'Alex\'s Mathematics Teacher',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sarah Johnson Teacher',
            lastMessage: 'Alex is showing excellent progress in calculus',
            timestamp: '1 hour ago',
            unread: 1,
            online: true,
            type: 'teacher'
          },
          {
            id: 2,
            name: 'Prof. Michael Smith',
            role: 'Alex\'s Physics Teacher',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Michael Smith Teacher',
            lastMessage: 'Please review Alex\'s lab report performance',
            timestamp: '3 hours ago',
            unread: 2,
            online: false,
            type: 'teacher'
          },
          {
            id: 3,
            name: 'School Administration',
            role: 'Lincoln High School',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=School Admin',
            lastMessage: 'Parent-teacher conference scheduled for next week',
            timestamp: '1 day ago',
            unread: 0,
            online: false,
            type: 'admin'
          },
          {
            id: 4,
            name: 'Mrs. Emily Davis',
            role: 'Alex\'s English Teacher',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Emily Davis Teacher',
            lastMessage: 'Alex\'s essay writing has improved significantly',
            timestamp: '2 days ago',
            unread: 0,
            online: true,
            type: 'teacher'
          }
        ];

      default:
        return [];
    }
  };

  // Role-specific messages
  const getMessages = () => {
    switch (user?.role) {
      case 'student':
        return [
          {
            id: 1,
            senderId: 1,
            senderName: 'Dr. Sarah Johnson',
            content: "Hi! I wanted to discuss your recent calculus assignment. You showed excellent understanding of integration techniques.",
            timestamp: new Date(Date.now() - 3600000),
            type: 'text'
          },
          {
            id: 2,
            senderId: 'current',
            senderName: 'You',
            content: "Thank you, Dr. Johnson! I found the substitution method particularly challenging at first.",
            timestamp: new Date(Date.now() - 3500000),
            type: 'text'
          },
          {
            id: 3,
            senderId: 1,
            senderName: 'Dr. Sarah Johnson',
            content: "That's completely normal. Integration by substitution requires practice. Would you like me to provide some additional practice problems?",
            timestamp: new Date(Date.now() - 3400000),
            type: 'text'
          },
          {
            id: 4,
            senderId: 'current',
            senderName: 'You',
            content: "That would be great! I'm particularly struggling with trigonometric substitutions.",
            timestamp: new Date(Date.now() - 3300000),
            type: 'text'
          },
          {
            id: 5,
            senderId: 1,
            senderName: 'Dr. Sarah Johnson',
            content: "Perfect! I'll prepare a set of problems focusing on trigonometric substitutions. I'll send them to you by tomorrow.",
            timestamp: new Date(Date.now() - 120000),
            type: 'text'
          },
          {
            id: 6,
            senderId: 1,
            senderName: 'Dr. Sarah Johnson',
            content: "Great work on your calculus assignment!",
            timestamp: new Date(Date.now() - 60000),
            type: 'text'
          }
        ];

      case 'teacher':
        return [
          {
            id: 1,
            senderId: 'current',
            senderName: 'You',
            content: "Good morning class! Don't forget that your calculus assignment is due this Friday. Please submit it through the portal.",
            timestamp: new Date(Date.now() - 300000),
            type: 'text'
          },
          {
            id: 2,
            senderId: 2,
            senderName: 'Alex Chen',
            content: "Dr. Johnson, I'm having trouble with problem #7. Could you provide some guidance?",
            timestamp: new Date(Date.now() - 240000),
            type: 'text'
          },
          {
            id: 3,
            senderId: 3,
            senderName: 'Emma Wilson',
            content: "Will there be a review session before the test?",
            timestamp: new Date(Date.now() - 180000),
            type: 'text'
          },
          {
            id: 4,
            senderId: 'current',
            senderName: 'You',
            content: "Yes Emma, I'll schedule a review session for Wednesday after school. Alex, I'll send you some additional resources for problem #7.",
            timestamp: new Date(Date.now() - 120000),
            type: 'text'
          },
          {
            id: 5,
            senderId: 4,
            senderName: 'Sarah Kim',
            content: "Thank you! That would be very helpful.",
            timestamp: new Date(Date.now() - 60000),
            type: 'text'
          }
        ];

      case 'parent':
        return [
          {
            id: 1,
            senderId: 1,
            senderName: 'Dr. Sarah Johnson',
            content: "Hello! I wanted to update you on Alex's progress in mathematics. He's been doing exceptionally well this semester.",
            timestamp: new Date(Date.now() - 3600000),
            type: 'text'
          },
          {
            id: 2,
            senderId: 'current',
            senderName: 'You',
            content: "That's wonderful to hear! We've been working with him on his homework at home. Are there any areas where he could improve?",
            timestamp: new Date(Date.now() - 3500000),
            type: 'text'
          },
          {
            id: 3,
            senderId: 1,
            senderName: 'Dr. Sarah Johnson',
            content: "He's particularly strong in algebra and geometry. I'd recommend encouraging him to participate more in class discussions to build confidence.",
            timestamp: new Date(Date.now() - 3400000),
            type: 'text'
          },
          {
            id: 4,
            senderId: 'current',
            senderName: 'You',
            content: "We'll definitely encourage that. Should we consider any advanced math programs for next year?",
            timestamp: new Date(Date.now() - 3300000),
            type: 'text'
          },
          {
            id: 5,
            senderId: 1,
            senderName: 'Dr. Sarah Johnson',
            content: "Absolutely! I think Alex would benefit from the Advanced Placement Calculus program. I can provide more information about the requirements.",
            timestamp: new Date(Date.now() - 120000),
            type: 'text'
          }
        ];

      default:
        return [];
    }
  };

  const conversations = getConversations();
  const messages = getMessages();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setNewMessage('');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

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
          {selectedConversation ? (
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
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