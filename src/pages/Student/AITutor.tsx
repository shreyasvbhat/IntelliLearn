import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Send, 
  Mic, 
  Image, 
  BookOpen,
  TrendingUp,
  Lightbulb,
  Target,
  Clock,
  Star
} from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm Ilm, your AI tutor. I'm here to help you learn and understand any topic. Based on your learning rate of 88%, I'll adapt my explanations to match your level. What would you like to learn about today?",
      timestamp: new Date(Date.now() - 5000),
      subject: null
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('general');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const subjects = [
    { value: 'general', label: 'General', icon: '🎓' },
    { value: 'mathematics', label: 'Mathematics', icon: '📐' },
    { value: 'physics', label: 'Physics', icon: '⚛️' },
    { value: 'chemistry', label: 'Chemistry', icon: '🧪' },
    { value: 'biology', label: 'Biology', icon: '🧬' },
    { value: 'english', label: 'English', icon: '📚' },
    { value: 'history', label: 'History', icon: '🏛️' }
  ];

  const quickQuestions = [
    "Explain photosynthesis in simple terms",
    "Help me solve quadratic equations",
    "What is Newton's first law?",
    "Explain the water cycle",
    "How do I write a good essay?",
    "What is the periodic table?"
  ];

  const learningStats = {
    learningRate: 88,
    questionsAsked: 156,
    topicsLearned: 42,
    studyStreak: 15
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      content: inputMessage,
      timestamp: new Date(),
      subject: selectedSubject
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai' as const,
        content: generateAIResponse(inputMessage, selectedSubject),
        timestamp: new Date(),
        subject: selectedSubject
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (question: string, subject: string) => {
    const responses = {
      mathematics: [
        "Great question! Since your learning rate is 88%, I'll provide a comprehensive explanation. Let me break this down step by step...",
        "Excellent! You're ready for advanced concepts. Here's how we can approach this problem...",
        "Perfect timing for this question! Based on your strong performance, let's dive deeper into this topic..."
      ],
      physics: [
        "Fascinating physics question! Given your high learning rate, I can explain this with some advanced applications...",
        "This is a fundamental concept in physics. Let me explain it in a way that builds on your strong foundation...",
        "Great observation! Your analytical skills are developing well. Here's the detailed explanation..."
      ],
      general: [
        "That's an excellent question! Based on your learning pattern, I'll provide a detailed explanation...",
        "I can see you're thinking critically about this topic. Let me help you understand it better...",
        "Perfect question for your current level! Here's a comprehensive answer..."
      ]
    };

    const subjectResponses = responses[subject as keyof typeof responses] || responses.general;
    return subjectResponses[Math.floor(Math.random() * subjectResponses.length)] + 
           " This connects to several other concepts we've discussed. Would you like me to elaborate on any specific aspect?";
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Brain className="w-8 h-8 text-purple-500 mr-3" />
            Ilm AI Tutor
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Your personalized AI learning companion</p>
        </div>
        <div className="mt-4 md:mt-0">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
          >
            {subjects.map(subject => (
              <option key={subject.value} value={subject.value}>
                {subject.icon} {subject.label}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  } rounded-lg p-4`}>
                    {message.type === 'ai' && (
                      <div className="flex items-center mb-2">
                        <Brain className="w-4 h-4 text-purple-500 mr-2" />
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Ilm</span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-purple-500" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="px-3 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask Ilm anything..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white pr-20"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Mic className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Image className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Learning Stats */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Stats</h3>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {learningStats.learningRate}%
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Learning Rate</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {learningStats.questionsAsked}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Questions Asked</p>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {learningStats.topicsLearned}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Topics Learned</p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-orange-500">
                  {learningStats.studyStreak}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Day Streak</p>
              </div>
            </div>
          </Card>

          {/* Learning Tips */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Tips</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/50 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Your learning rate is high! Try tackling more challenging problems to keep growing.
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Ask follow-up questions to deepen your understanding of complex topics.
                </p>
              </div>
            </div>
          </Card>

          {/* Recent Topics */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Topics</h3>
            </div>
            <div className="space-y-2">
              {['Calculus Integration', 'Photosynthesis', 'Newton\'s Laws', 'Essay Writing'].map((topic, index) => (
                <button
                  key={index}
                  className="w-full text-left p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AITutor;