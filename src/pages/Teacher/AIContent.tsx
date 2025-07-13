import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Settings, Send, FileText, Clock } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import * as API from '../../api/APICalls';
import { useAuth } from '../../contexts/AuthContext';
import 'highlight.js/styles/github-dark.css';

interface GeneratedContent {
  content: string;
  status: string;
  timestamp: string;
  metadata?: {
    format: string;
    wordCount: number;
    charCount: number;
  };
}

const AIContent: React.FC = () => {
  const { user } = useAuth();
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [contentType, setContentType] = useState('lesson');
  const [targetAudience, setTargetAudience] = useState('students');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
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
      console.log('Response received:', res);
      
      if (!res || typeof res !== 'object' || !res.content) {
        throw new Error('Invalid response format');
      }

      // Ensure we have proper content
      if (typeof res.content === 'string') {
        const formattedContent = {
          content: res.content,
          status: res.status || 'success',
          timestamp: res.timestamp || new Date().toISOString(),
          metadata: res.metadata || {
            format: 'markdown',
            wordCount: res.content.split(/\s+/).length,
            charCount: res.content.length
          }
        };
        setGeneratedContent(formattedContent);
      } else {
        throw new Error('Content is not in the expected format');
      }
    } catch (error: any) {
      console.error('Error generating content:', error);
      setGeneratedContent({
        content: `Error: ${error.message || 'Failed to generate content. Please try again.'}`,
        status: 'error',
        timestamp: new Date().toISOString(),
        metadata: {
          format: 'text',
          wordCount: 0,
          charCount: 0
        }
      });
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

      {generatedContent && !loading && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
            Generated Content
          </h3>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {typeof generatedContent.content === 'string' && (
              <article 
                className="
                  space-y-6
                  [&_.gemini-content]:space-y-6
                  [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-purple-600 [&_h1]:dark:text-purple-400 [&_h1]:mb-6
                  [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-purple-600 [&_h2]:dark:text-purple-400 [&_h2]:mb-6
                  [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-purple-600 [&_h3]:dark:text-purple-400 [&_h3]:mb-4
                  [&_p]:text-gray-700 [&_p]:dark:text-gray-300 [&_p]:leading-relaxed [&_p]:mb-4
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-4 [&_ul]:bg-gray-50 [&_ul]:dark:bg-gray-800 [&_ul]:p-4 [&_ul]:rounded-lg
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-4 [&_ol]:bg-gray-50 [&_ol]:dark:bg-gray-800 [&_ol]:p-4 [&_ol]:rounded-lg
                  [&_li]:text-gray-700 [&_li]:dark:text-gray-300 [&_li]:ml-4
                  [&_strong]:text-purple-600 [&_strong]:dark:text-purple-400 [&_strong]:font-semibold
                  [&_em]:italic [&_em]:text-gray-600 [&_em]:dark:text-gray-400
                  [&_code]:font-mono [&_code]:text-sm [&_code]:bg-gray-100 [&_code]:dark:bg-gray-800 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded
                  [&_pre]:bg-gray-900 [&_pre]:dark:bg-gray-950 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4
                  [&_blockquote]:border-l-4 [&_blockquote]:border-purple-500 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:my-4 [&_blockquote]:bg-purple-50 [&_blockquote]:dark:bg-purple-900/20
                  [&_table]:w-full [&_table]:my-4 [&_table]:border-collapse
                  [&_th]:bg-gray-100 [&_th]:dark:bg-gray-800 [&_th]:p-2 [&_th]:text-left [&_th]:border [&_th]:border-gray-300 [&_th]:dark:border-gray-600
                  [&_td]:p-2 [&_td]:border [&_td]:border-gray-300 [&_td]:dark:border-gray-600
                "
                dangerouslySetInnerHTML={{ __html: generatedContent.content }}
              />
            )}
            {!generatedContent.content && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-red-600 dark:text-red-400">No content available</p>
              </div>
            )}
            {generatedContent.status === 'error' && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg mt-4">
                <p className="text-red-600 dark:text-red-400">{generatedContent.content}</p>
              </div>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              {generatedContent.metadata && (
                <>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    <span>Words: {generatedContent.metadata.wordCount || 0}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>Characters: {generatedContent.metadata.charCount || 0}</span>
                  </div>
                </>
              )}
              <div className="flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                <span>Type: {contentType.charAt(0).toUpperCase() + contentType.slice(1)}</span>
              </div>
              {generatedContent.timestamp && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Generated: {new Date(generatedContent.timestamp).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AIContent;
