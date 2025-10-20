import React, { useState } from 'react';
import { Filter, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, iconType, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  const iconMap = {
    'list': { 
      Icon: Filter, 
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-600',
      glowColor: 'shadow-purple-500/25',
      hoverBgColor: 'rgba(168, 85, 247, 0.08)',
      gradient: 'from-purple-50 to-white',
      accentColor: 'bg-purple-400'
    },
    'check': { 
      Icon: CheckCircle2, 
      bgColor: 'bg-green-500/10',
      iconColor: 'text-green-600',
      glowColor: 'shadow-green-500/25',
      hoverBgColor: 'rgba(34, 197, 94, 0.08)',
      gradient: 'from-green-50 to-white',
      accentColor: 'bg-green-400'
    },
    'clock': { 
      Icon: Clock, 
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-600',
      glowColor: 'shadow-blue-500/25',
      hoverBgColor: 'rgba(59, 130, 246, 0.08)',
      gradient: 'from-blue-50 to-white',
      accentColor: 'bg-blue-400'
    },
    'trending': { 
      Icon: TrendingUp, 
      bgColor: 'bg-pink-300/10',
      iconColor: 'text-pink-400',
      glowColor: 'shadow-pink-300/25',
      hoverBgColor: 'rgba(249, 168, 212, 0.08)',
      gradient: 'from-pink-50 to-white',
      accentColor: 'bg-pink-300'
    }
  };

  const { Icon, bgColor, iconColor, glowColor, hoverBgColor, gradient, accentColor } = iconMap[iconType];

  return (
    <div
      className={`group relative rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200/80 bg-gradient-to-br ${gradient} shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: 0,
        animation: `slideUp 0.8s ease-out ${delay}s forwards`,
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        background: isHovered ? hoverBgColor : ''
      }}
    >
      {/* Corner Accents */}
      <div className={`absolute top-0 right-0 w-2 h-2 sm:w-3 sm:h-3 rounded-bl-full ${accentColor}/20 transition-all duration-300 group-hover:opacity-60`} />
      <div className={`absolute bottom-0 left-0 w-2 h-2 sm:w-3 sm:h-3 rounded-tr-full ${accentColor}/20 transition-all duration-300 group-hover:opacity-60`} />
      
      {/* Side Bars */}
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 sm:h-16 rounded-r-full ${accentColor}/30 transform transition-all duration-500 group-hover:scale-y-125 group-hover:opacity-80`} />
      <div className={`absolute right-0 top-1/4 w-1 h-6 sm:h-8 rounded-l-full ${accentColor}/20 transform transition-all duration-500 group-hover:scale-y-150 group-hover:opacity-60`} />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute top-2 left-4 sm:top-4 sm:left-6 w-6 h-6 sm:w-8 sm:h-8 rounded-2xl border border-gray-300/20 rotate-45 transition-transform duration-500 group-hover:rotate-90" />
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-4 h-4 sm:w-6 sm:h-6 rounded-xl border border-gray-300/15 rotate-12 transition-transform duration-500 group-hover:rotate-45" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3 lg:mb-4 transition-all duration-300 group-hover:text-gray-700 group-hover:tracking-wide">
            {title}
          </p>
          
          <p 
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 transition-all duration-500"
            style={{
              transform: isHovered ? 'scale(1.05) translateX(2px)' : 'scale(1) translateX(0)',
              textShadow: isHovered ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            {value}
          </p>
        </div>
        
        {/* Icon Container */}
        <div className="relative">
          <div 
            className={`absolute inset-0 ${bgColor} rounded-xl sm:rounded-2xl blur-md transition-all duration-500 group-hover:scale-110 sm:group-hover:scale-125 group-hover:opacity-50`}
          />
          <div 
            className={`relative ${bgColor} p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl ${glowColor} shadow-lg border border-white/50 transition-all duration-500 backdrop-blur-sm z-20`}
            style={{
              transform: isHovered ? 'scale(1.2) rotate(8deg)' : 'scale(1) rotate(0deg)',
              boxShadow: isHovered ? `0 6px 24px ${glowColor.replace('shadow-', '').replace('/25', '/40')}` : ''
            }}
          >
            {/* FIXED LINE: Removed duplicate className attribute */}
            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${iconColor}`} />
          </div>
        </div>
      </div>

      {/* Subtle border glow effect */}
      <div 
        className={`absolute inset-0 rounded-xl sm:rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-all duration-500 ${glowColor.replace('shadow', 'border')}`}
        style={{
          transform: isHovered ? 'scale(1.01)' : 'scale(1)'
        }}
      />

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .group:hover {
          backdrop-filter: blur(8px);
        }
      `}</style>
    </div>
  );
};

export default StatCard;