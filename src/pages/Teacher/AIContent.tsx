import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Settings, Send, FileText } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import * as API from '../../api/APICalls';
import { useAuth } from '../../contexts/AuthContext';

const AIContent: React.FC = () => {
  const { user } = useAuth();
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [contentType, setContentType] = useState('lesson');
  const [targetAudience, setTargetAudience] = useState('students');
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;

    setLoading(true);
    try {
      const res = await API.generateContent({
        topic,
        difficulty,
        contentType,
        targetAudience
      });
      setGeneratedContent(res.content);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Sparkles className="w-8 h-8 text-purple-500 mr-3" />
            AI Content Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Instantly create learning materials using AI</p>
        </div>
      </motion.div>

      <Card className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Topic (e.g., Photosynthesis)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
          />
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="lesson">Lesson</option>
            <option value="quiz">Quiz</option>
            <option value="summary">Summary</option>
          </select>
          <input
            type="text"
            placeholder="Target Audience (e.g., Grade 10 students)"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 w-full"
        >
          <Send className="w-4 h-4 mr-1" />
          {loading ? 'Generating...' : 'Generate Content'}
        </Button>
      </Card>

      {generatedContent && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generated Content</h3>
          <pre className="text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-300">{JSON.stringify(generatedContent, null, 2)}</pre>
        </Card>
      )}
    </div>
  );
};

export default AIContent;
