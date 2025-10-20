import React, { useState, useEffect } from "react";
import { CheckSquare, Bell, Home, BarChart3, Calendar, Settings, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const getActiveTab = () => {
    if (location.pathname === '/analytics') return 'Analytics';
    if (location.pathname === '/calendar') return 'Calendar';
    if (location.pathname === '/settings') return 'Settings';
    if (location.pathname === '/' || location.pathname === '/dashboard') return 'Dashboard';
    return 'Dashboard';
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  useEffect(() => {
    setActiveTab(getActiveTab());
    setIsMobileMenuOpen(false); 
  }, [location.pathname]);

  const navLinks = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
    { name: 'Calendar', icon: Calendar, path: '/calendar' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleNavClick = (name, path) => {
    setActiveTab(name);
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 py-4 lg:py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-r from-[#7148CC] to-[#A213C5] flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={() => handleNavClick('Dashboard', '/dashboard')}
            >
              <CheckSquare className="w-6 h-6 lg:w-7 lg:h-7 text-white" strokeWidth={2.5} />
            </div>
            <div 
              className="cursor-pointer"
              onClick={() => handleNavClick('Dashboard', '/dashboard')}
            >
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 bg-gradient-to-r from-[#7148CC] to-[#A213C5] bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-xs lg:text-sm text-gray-500 hidden sm:block">Organize beautifully</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.name;
              
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.name, link.path)}
                  className={`
                    flex items-center gap-2 text-sm transition-all duration-300 group
                    ${isActive 
                      ? 'font-bold' 
                      : 'text-gray-600 font-medium'
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 transition-colors duration-300 ${
                    isActive 
                      ? 'text-[#7148CC]' 
                      : 'text-gray-600 group-hover:text-[#7148CC]'
                  }`} />
                  <span className={`
                    transition-colors duration-300
                    ${isActive 
                      ? 'text-transparent bg-gradient-to-r from-[#7148CC] to-[#A213C5] bg-clip-text' 
                      : 'text-gray-600 group-hover:text-[#7148CC]'
                    }
                  `}>
                    {link.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            <button 
              className="hidden sm:flex relative w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-[#7148CC]/10 hover:to-[#A213C5]/10 items-center justify-center transition-all duration-200 hover:scale-105 group shadow-sm hover:shadow-md"
            >
              <Bell className="w-4 h-4 lg:w-5 lg:h-5 text-gray-700 group-hover:text-[#7148CC] transition-colors" />
              <span className="absolute -top-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                3
              </span>
            </button>

            <div className="hidden sm:block relative group">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" 
                alt="Profile"
                className="w-10 h-10 lg:w-11 lg:h-11 rounded-full object-cover shadow-md border-2 border-gray-200 cursor-pointer group-hover:border-[#7148CC] group-hover:shadow-lg transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 lg:w-3.5 lg:h-3.5 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full border-2 border-white shadow-md group-hover:scale-110 transition-transform"></div>
            </div>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.name;
                
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.name, link.path)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                      ${isActive 
                        ? 'bg-gradient-to-r from-[#7148CC] to-[#A213C5] text-white shadow-lg' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2} />
                    <span className="font-medium">{link.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <button className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">Notifications</span>
                <span className="w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                  3
                </span>
              </button>
              
              <div className="flex items-center gap-2">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" 
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover shadow-md border-2 border-gray-200"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}