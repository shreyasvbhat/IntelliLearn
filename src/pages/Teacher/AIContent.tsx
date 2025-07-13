import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Settings, Send, FileText, Clock } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import * as API from '../../api/APICalls';
import { useAuth } from '../../contexts/AuthContext';
import 'highlight.js/styles/github-dark.css';

interface GeneratedContentResponse {
  content: {
    content: string;
    status: string;
    timestamp: string;
    metadata: {
      format: string;
      wordCount: number;
      charCount: number;
      sections: number;
    };
  };
  generatedAt: string;
}

const AIContent: React.FC = () => {
  const { user } = useAuth();
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [contentType, setContentType] = useState('lesson');
  const [targetAudience, setTargetAudience] = useState('students');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic) return;

    setLoading(true);
    setError(null);
    try {
      const res = await API.generateContent({
        topic,
        difficulty,
        contentType,
        targetAudience
      });
      console.log('Response received:', res);
      setGeneratedContent(res);
    } catch (error) {
      console.error('Error generating content:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate content');
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

      {loading && (
        <Card className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-center mt-4 text-gray-600 dark:text-gray-400">Generating content...</p>
        </Card>
      )}

      {error && !loading && (
        <Card className="p-6 border-red-200 dark:border-red-800">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        </Card>
      )}

      {generatedContent && !loading && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
            Generated Content
          </h3>
          <div 
            className="prose prose-purple prose-lg max-w-none dark:prose-invert overflow-auto"
            dangerouslySetInnerHTML={{ __html: generatedContent.content.content }}
          />
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              {generatedContent.content.metadata && (
                <>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    <span>Words: {generatedContent.content.metadata.wordCount}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    <span>Sections: {generatedContent.content.metadata.sections}</span>
                  </div>
                </>
              )}
              <div className="flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                <span>Type: {contentType.charAt(0).toUpperCase() + contentType.slice(1)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Generated: {new Date(generatedContent.generatedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AIContent;
