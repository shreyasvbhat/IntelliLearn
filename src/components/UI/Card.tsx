import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false, onClick }) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700';
  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';
  
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
      className={`${baseClasses} ${hoverClasses} ${className} transition-all duration-200`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;