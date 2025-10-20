import React from 'react';
import { Settings, Bell, Lock, User, Palette, Globe, Zap } from 'lucide-react';

const SettingsPage = () => {
  const settingsSections = [
    {
      icon: User,
      title: 'Profile Settings',
      description: 'Manage your account information',
      color: 'from-purple-100 to-purple-200',
      iconColor: '#7148CC'
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure notification preferences',
      color: 'from-blue-100 to-blue-200',
      iconColor: '#3B82F6'
    },
    {
      icon: Palette,
      title: 'Appearance',
      description: 'Customize your workspace theme',
      color: 'from-pink-100 to-pink-200',
      iconColor: '#EC4899'
    },
    {
      icon: Lock,
      title: 'Privacy & Security',
      description: 'Control your data and security',
      color: 'from-green-100 to-green-200',
      iconColor: '#10B981'
    },
    {
      icon: Globe,
      title: 'Language & Region',
      description: 'Set your language preferences',
      color: 'from-amber-100 to-amber-200',
      iconColor: '#F59E0B'
    },
    {
      icon: Zap,
      title: 'Integrations',
      description: 'Connect with other tools',
      color: 'from-indigo-100 to-indigo-200',
      iconColor: '#6366F1'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Coming Soon Banner */}
        <div className="mb-8 sm:mb-12 text-center py-6 sm:py-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
            <Zap className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#7148CC] animate-pulse" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7148CC]">
              Coming Soon
            </h2>
            <Zap className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#7148CC] animate-pulse" />
          </div>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            We're working hard to bring you powerful customization options
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {settingsSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 cursor-pointer"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div 
                    className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${
                      section.color === 'from-purple-100 to-purple-200' ? 'bg-purple-100' : 
                      section.color === 'from-blue-100 to-blue-200' ? 'bg-blue-100' :
                      section.color === 'from-pink-100 to-pink-200' ? 'bg-pink-100' :
                      section.color === 'from-green-100 to-green-200' ? 'bg-green-100' :
                      section.color === 'from-amber-100 to-amber-200' ? 'bg-amber-100' : 'bg-indigo-100'
                    } group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300 shadow-sm flex-shrink-0`}
                  >
                    <Icon 
                      className="w-5 h-5 sm:w-6 sm:h-6" 
                      style={{ color: section.iconColor }}
                      strokeWidth={2}
                    />
                  </div>
                  <div className="flex-1 min-w-0"> {/* Added min-w-0 for text truncation */}
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 group-hover:text-[#7148CC] transition-colors duration-300 line-clamp-1">
                      {section.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                      {section.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-block bg-white rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 sm:py-4 shadow-md border border-gray-200 max-w-full mx-4">
            <p className="text-sm sm:text-base text-gray-700 font-medium">
              💡 <span className="font-bold text-[#7148CC]">Pro Tip:</span> Stay tuned for exciting updates!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;