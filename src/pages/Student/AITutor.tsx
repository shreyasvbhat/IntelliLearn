import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain, Send, Mic, Image, BookOpen, TrendingUp, Lightbulb, Clock
} from 'lucide-react';
import parse from 'html-react-parser';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import * as API from '../../api/APICalls';
import { useAuth } from '../../contexts/AuthContext';

const AITutor: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      type: 'ai',
      content: `Hello! I'm Ilm, your AI tutor. I'm here to help you learn and understand any topic. Based on your learning rate of 88%, I'll adapt my explanations to match your level. What would you like to learn about today?`,
      timestamp: new Date(),
      subject: null
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('general');
  const [isTyping, setIsTyping] = useState(false);
  const [learningStats, setLearningStats] = useState({
    learningRate: 88,
    questionsAsked: 0,
    topicsLearned: 0,
    studyStreak: 0
  });
  const [recentTopics, setRecentTopics] = useState<string[]>([]);
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
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      subject: selectedSubject
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await API.chatWithAI(
        inputMessage,
        selectedSubject,
        {
          message: inputMessage,
          subject: selectedSubject,
          context: ''
        }
      );
      console.log('AI Response:', res);

      // Extract and preserve HTML content from the response
      let aiContent = '';
      if (typeof res.response === 'string') {
        // Simple string response - wrap in paragraph tags
        aiContent = `<p>${res.response}</p>`;
      } else if (res.response?.content?.content) {
        // Full HTML content from Gemini
        aiContent = res.response.content.content;
      } else if (typeof res.response?.content === 'string') {
        // Simple content object - wrap in paragraph tags
        aiContent = `<p>${res.response.content}</p>`;
      } else {
        aiContent = '<p>I apologize, but I could not generate a proper response.</p>';
      }

      // Ensure content is wrapped in gemini-content div if it isn't already
      if (!aiContent.includes('class="gemini-content"')) {
        aiContent = `<div class="gemini-content">${aiContent}</div>`;
      }

      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiContent,
        timestamp: new Date(),
        subject: selectedSubject
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);

    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'ai',
        content: 'I apologize, but I encountered an error while processing your request.',
        timestamp: new Date(),
        subject: selectedSubject
      }]);
      setIsTyping(false);
    }
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
                    <div className={`
                      text-sm prose prose-sm max-w-none
                      ${message.type === 'user' ? 'prose-invert' : 'dark:prose-invert'}
                      [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:mb-2
                      [&>p]:my-2 [&>p]:leading-relaxed
                      [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:my-2 [&>ul>li]:mb-1
                      [&>ol]:list-decimal [&>ol]:pl-4 [&>ol]:my-2 [&>ol>li]:mb-1
                      [&_strong]:font-semibold [&_strong]:text-inherit
                      [&_em]:italic [&_em]:text-inherit
                      [&_code]:font-mono [&_code]:text-sm [&_code]:bg-gray-100 [&_code]:dark:bg-gray-800 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded
                      [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-2
                      ${message.type === 'ai' ? '[&_.gemini-content]:space-y-4' : ''}
                    `}>
                      {parse(message.content)}
                    </div>
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
              {recentTopics.length ? recentTopics.map((topic, index) => (
                <button
                  key={index}
                  className="w-full text-left p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {topic}
                </button>
              )) : <p className="text-sm text-gray-500 dark:text-gray-400">No recent topics yet.</p>}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
