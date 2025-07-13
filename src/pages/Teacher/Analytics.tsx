import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, BookOpen, Send, FileText, Clock } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import * as API from '../../api/APICalls';
import { useAuth } from '../../contexts/AuthContext';
import 'highlight.js/styles/github-dark.css';

const Analytics: React.FC = () => {
  const { user } = useAuth();
  const [studentData, setStudentData] = useState('');
  const [subject, setSubject] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!studentData || !subject) return;

    setLoading(true);
    try {
      const parsedData = JSON.parse(studentData);
      const res = await API.analyzePerformance({
        studentData: parsedData,
        subject
      });
      setAnalysis(res.analysis);
    } catch (error) {
      console.error('Error analyzing performance:', error);
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
            <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
            Performance Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Analyze and improve student performance using AI</p>
        </div>
      </motion.div>

      <Card className="p-6 space-y-4">
        <textarea
          placeholder="Paste student data (JSON format)"
          value={studentData}
          onChange={(e) => setStudentData(e.target.value)}
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="Subject (e.g., Mathematics)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
        />
        <Button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 w-full"
        >
          <Send className="w-4 h-4 mr-1" />
          {loading ? 'Analyzing...' : 'Analyze Performance'}
        </Button>
      </Card>

      {analysis && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
            Analysis Result
          </h3>
          <article 
            className="
              space-y-6
              [&_.gemini-content]:space-y-6
              [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-green-600 [&_h1]:dark:text-green-400 [&_h1]:mb-6
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-green-600 [&_h2]:dark:text-green-400 [&_h2]:mb-6
              [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-green-600 [&_h3]:dark:text-green-400 [&_h3]:mb-4
              [&_p]:text-gray-700 [&_p]:dark:text-gray-300 [&_p]:leading-relaxed [&_p]:mb-4
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-4 [&_ul]:bg-gray-50 [&_ul]:dark:bg-gray-800 [&_ul]:p-4 [&_ul]:rounded-lg
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-4 [&_ol]:bg-gray-50 [&_ol]:dark:bg-gray-800 [&_ol]:p-4 [&_ol]:rounded-lg
              [&_li]:text-gray-700 [&_li]:dark:text-gray-300 [&_li]:ml-4
              [&_strong]:text-green-600 [&_strong]:dark:text-green-400 [&_strong]:font-semibold
              [&_em]:italic [&_em]:text-gray-600 [&_em]:dark:text-gray-400
              [&_code]:font-mono [&_code]:text-sm [&_code]:bg-gray-100 [&_code]:dark:bg-gray-800 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded
              [&_pre]:bg-gray-900 [&_pre]:dark:bg-gray-950 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4
              [&_blockquote]:border-l-4 [&_blockquote]:border-green-500 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:my-4 [&_blockquote]:bg-green-50 [&_blockquote]:dark:bg-green-900/20
              [&_table]:w-full [&_table]:my-4 [&_table]:border-collapse
              [&_th]:bg-gray-100 [&_th]:dark:bg-gray-800 [&_th]:p-2 [&_th]:text-left [&_th]:border [&_th]:border-gray-300 [&_th]:dark:border-gray-600
              [&_td]:p-2 [&_td]:border [&_td]:border-gray-300 [&_td]:dark:border-gray-600
            "
            dangerouslySetInnerHTML={{ __html: analysis.content }}
          />
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                <span>Words: {analysis.metadata?.wordCount || 0}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                <span>Characters: {analysis.metadata?.charCount || 0}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Generated: {new Date(analysis.timestamp).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Analytics;
