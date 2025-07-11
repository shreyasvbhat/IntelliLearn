import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, BookOpen, Send } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import * as API from '../../api/APICalls';
import { useAuth } from '../../contexts/AuthContext';

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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Analysis Result</h3>
          <pre className="text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-300">{JSON.stringify(analysis, null, 2)}</pre>
        </Card>
      )}
    </div>
  );
};

export default Analytics;
