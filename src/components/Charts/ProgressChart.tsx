import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProgressChartProps {
  data: Array<{
    name: string;
    progress: number;
    engagement: number;
  }>;
  height?: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data, height = 300 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="name" 
          className="text-gray-600 dark:text-gray-400"
        />
        <YAxis className="text-gray-600 dark:text-gray-400" />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="progress" 
          stroke="#3B82F6" 
          strokeWidth={3}
          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
        />
        <Line 
          type="monotone" 
          dataKey="engagement" 
          stroke="#10B981" 
          strokeWidth={3}
          dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;