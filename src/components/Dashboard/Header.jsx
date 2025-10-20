import React, { useState, useEffect } from 'react';
import { Filter, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Typing effect hook
const useTypingEffect = (text, speed = 100) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return displayText;
};

const Header = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();
  
  const typedTitle = useTypingEffect("Transform Your Productivity Journey", 70);
  const typedDescription = useTypingEffect("Streamline your workflow • Boost productivity • Achieve more", 40);

  return (
    <div className="mb-8 sm:mb-12 lg:mb-20 mt-2 sm:mt-4 lg:mt-5 font-montserrat">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 lg:gap-0">
        {/* Left Section - Title and Description */}
        <div className="w-full lg:w-auto">
          {/* Animated Title */}
          <motion.h1 
            className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#2B069B] via-[#3A01BA] to-[#7148CC] bg-clip-text text-transparent mb-2 min-h-[1.5rem] sm:min-h-[2rem] lg:min-h-[2.5rem]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {typedTitle}
            <motion.span
              className="inline-block w-1 h-4 sm:h-6 lg:h-8 bg-gradient-to-b from-[#2B069B] to-[#7148CC] ml-1"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.h1>

          {/* Animated Description */}
          <motion.p
            className="text-xs sm:text-sm lg:text-base text-gray-500 font-medium min-h-[1.25rem] sm:min-h-[1.5rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {typedDescription}
          </motion.p>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Tasks Button */}
          <motion.button 
            onClick={() => {
              onTabChange('tasks');
              navigate('/dashboard');
            }}
            className={`group relative flex items-center justify-center gap-2 px-4 sm:px-5 lg:px-6 py-2 sm:py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-medium text-xs sm:text-sm lg:text-base w-full sm:w-auto ${
              activeTab === 'tasks'
                ? 'bg-gradient-to-r from-[#2B069B] via-[#3A01BA] to-[#7148CC] text-white shadow-purple-500/30'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#2B069B] hover:text-[#2B069B] shadow-sm hover:shadow-md'
            }`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Filter className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-6 transition-transform duration-300" strokeWidth={2.5} />
            <span>Tasks</span>
          </motion.button>

          {/* Analytics Button */}
          <motion.button 
            onClick={() => {
              onTabChange('analytics');
              navigate('/analytics');
            }}
            className={`group relative flex items-center justify-center gap-2 px-4 sm:px-5 lg:px-6 py-2 sm:py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-medium text-xs sm:text-sm lg:text-base w-full sm:w-auto ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-[#2B069B] via-[#3A01BA] to-[#7148CC] text-white shadow-purple-500/30'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#2B069B] hover:text-[#2B069B] shadow-sm hover:shadow-md'
            }`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
            <span>Analytics</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Header;