import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle2, Clock, AlertCircle, Menu, X } from 'lucide-react';
import { useTaskContext } from '../contexts/TaskContext';

const Calendar = () => {
  const { tasks } = useTaskContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTaskPanel, setShowTaskPanel] = useState(false);

  // Color scheme matching your design
  const colors = {
    done: '#10B981',
    progress: '#3B82F6',
    pending: '#F59E0B',
    high: '#EF4444',
    medium: '#8B5CF6',
    low: '#6B7280'
  };

  // Get tasks for a specific date
  const getTasksForDate = (date) => {
    return tasks.filter(task => {
      if (!task.date) return false;
      const taskDate = new Date(task.date);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  // Get month and year details
  const getMonthYear = (date) => {
    return {
      month: date.toLocaleString('default', { month: 'long' }),
      year: date.getFullYear()
    };
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Get days in month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get first day of month
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Generate calendar grid
  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const calendar = [];

    // Previous month days
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const prevMonthDays = getDaysInMonth(prevMonth);
    
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevMonthDays - i);
      calendar.push({
        date,
        isCurrentMonth: false,
        tasks: getTasksForDate(date)
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      calendar.push({
        date,
        isCurrentMonth: true,
        tasks: getTasksForDate(date)
      });
    }

    // Next month days
    const totalCells = 42; // 6 weeks
    const nextMonthDays = totalCells - calendar.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
      calendar.push({
        date,
        isCurrentMonth: false,
        tasks: getTasksForDate(date)
      });
    }

    return calendar;
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return colors.high;
      case 'Medium': return colors.medium;
      case 'Low': return colors.low;
      default: return colors.low;
    }
  };

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch (status) {
      case 'Done':
        return { 
          icon: CheckCircle2, 
          color: colors.done,
          bgColor: 'bg-green-100',
          textColor: 'text-green-700'
        };
      case 'In Progress':
        return { 
          icon: Clock, 
          color: colors.progress,
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700'
        };
      case 'Pending':
        return { 
          icon: AlertCircle, 
          color: colors.pending,
          bgColor: 'bg-amber-100',
          textColor: 'text-amber-700'
        };
      default:
        return { 
          icon: AlertCircle, 
          color: colors.pending,
          bgColor: 'bg-amber-100',
          textColor: 'text-amber-700'
        };
    }
  };

  // Handle date click
  const handleDateClick = (date) => {
    setSelectedDate(date);
    // On mobile, show task panel when date is clicked
    if (window.innerWidth < 1024) {
      setShowTaskPanel(true);
    }
  };

  const calendar = generateCalendar();
  const { month, year } = getMonthYear(currentDate);
  const selectedDateTasks = getTasksForDate(selectedDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-6 pb-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#2B069B] via-[#3A01BA] to-[#7148CC] bg-clip-text text-transparent">
              Calendar View
            </h1>
            
            {/* Mobile Task Panel Toggle */}
            <button
              onClick={() => setShowTaskPanel(!showTaskPanel)}
              className="lg:hidden p-2 rounded-lg bg-white border border-gray-200 shadow-sm"
            >
              {showTaskPanel ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
          
          <div className="flex items-center gap-2 bg-white rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-gray-200">
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Selected:</span>
            <span className="text-xs sm:text-sm text-gray-900 font-medium">
              {selectedDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Calendar Section */}
          <div className={`xl:col-span-2 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 ${showTaskPanel ? 'hidden lg:block' : 'block'}`}>
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <button
                onClick={prevMonth}
                className="p-2 rounded-lg sm:rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#7148CC] transition-colors duration-200" />
              </button>
              
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 text-center">
                {month} {year}
              </h2>
              
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg sm:rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#7148CC] transition-colors duration-200" />
              </button>
            </div>

            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2 sm:mb-3">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                <div key={day} className="text-center py-1 sm:py-2">
                  <span className="text-xs font-semibold text-gray-500">{day}</span>
                </div>
              ))}
            </div>

            {/* Calendar Grid - Responsive */}
            <div className="grid grid-cols-7 gap-1">
              {calendar.map((day, index) => {
                const isSelected = day.date.toDateString() === selectedDate.toDateString();
                const isToday = day.date.toDateString() === new Date().toDateString();
                
                return (
                  <div
                    key={index}
                    onClick={() => handleDateClick(day.date)}
                    className={`
                      min-h-[60px] sm:min-h-[70px] lg:min-h-[80px] p-1 rounded-lg border-2 transition-all duration-200 cursor-pointer
                      ${isSelected 
                        ? 'border-[#7148CC] bg-purple-50 shadow-md' 
                        : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                      }
                      ${!day.isCurrentMonth ? 'opacity-30' : ''}
                      ${isToday && !isSelected ? 'border-blue-200 bg-blue-50' : ''}
                    `}
                  >
                    {/* Date Number */}
                    <div className="flex justify-between items-start">
                      <span className={`
                        text-xs font-medium
                        ${isSelected ? 'text-[#7148CC]' : 'text-gray-700'}
                        ${isToday && !isSelected ? 'text-blue-600' : ''}
                        ${!day.isCurrentMonth ? 'text-gray-400' : ''}
                      `}>
                        {day.date.getDate()}
                      </span>
                      
                      {/* Task Count Badge */}
                      {day.tasks.length > 0 && (
                        <span className={`
                          text-[8px] sm:text-[10px] px-1 rounded-full font-medium
                          ${isSelected 
                            ? 'bg-[#7148CC] text-white' 
                            : 'bg-gray-200 text-gray-700'
                          }
                        `}>
                          {day.tasks.length}
                        </span>
                      )}
                    </div>

                    {/* Task Indicators - Simplified for mobile */}
                    <div className="mt-1 space-y-0.5">
                      {day.tasks.slice(0, window.innerWidth < 640 ? 1 : 2).map((task, taskIndex) => (
                        <div
                          key={taskIndex}
                          className="flex items-center gap-0.5 p-0.5 rounded text-[8px] sm:text-[10px]"
                          style={{ 
                            backgroundColor: `${getPriorityColor(task.priority)}15`,
                            borderLeft: `2px solid ${getPriorityColor(task.priority)}`
                          }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: getPriorityColor(task.priority) }}
                          ></div>
                          <span className="truncate font-medium text-gray-700">
                            {task.title.substring(0, window.innerWidth < 640 ? 6 : 8)}{task.title.length > (window.innerWidth < 640 ? 6 : 8) ? '...' : ''}
                          </span>
                        </div>
                      ))}
                      {day.tasks.length > (window.innerWidth < 640 ? 1 : 2) && (
                        <div className="text-[8px] sm:text-[10px] text-gray-500 text-center font-medium">
                          +{day.tasks.length - (window.innerWidth < 640 ? 1 : 2)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Date Tasks Section - Responsive */}
          <div className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 ${
            showTaskPanel ? 'block' : 'hidden lg:block'
          }`}>
            {/* Mobile Header with Close Button */}
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-[#7148CC] to-[#A213C5] rounded-lg sm:rounded-xl p-2 sm:p-3">
                  <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">
                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
              
              {/* Mobile Close Button */}
              <button
                onClick={() => setShowTaskPanel(false)}
                className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {selectedDateTasks.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">No tasks scheduled for this date</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] sm:max-h-[500px] overflow-y-auto">
                {selectedDateTasks.map((task, index) => {
                  const statusInfo = getStatusInfo(task.status);
                  const StatusIcon = statusInfo.icon;
                  
                  return (
                    <div
                      key={index}
                      className="group p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-[#7148CC] hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50 hover:from-purple-50 hover:to-white"
                    >
                      {/* Task Header */}
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <h4 className="font-semibold text-gray-900 group-hover:text-[#7148CC] transition-colors duration-200 line-clamp-2 text-sm sm:text-base">
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
                          <StatusIcon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: statusInfo.color }} />
                          <div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: getPriorityColor(task.priority) }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Description */}
                      {task.description && (
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
                          {task.description}
                        </p>
                      )}
                      
                      {/* Task Meta */}
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                          {task.status}
                        </span>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span className="text-xs text-gray-500 font-medium capitalize">
                            {task.priority}
                          </span>
                          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                          <span className="text-xs text-gray-500">
                            {task.progress || 0}%
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {task.progress !== undefined && task.status === 'In Progress' && (
                        <div className="mt-2 sm:mt-3">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progress</span>
                            <span className="font-semibold">{task.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="h-1.5 rounded-full transition-all duration-1000"
                              style={{
                                width: `${task.progress}%`,
                                backgroundColor: colors.progress
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quick Stats */}
            {selectedDateTasks.length > 0 && (
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 rounded-lg bg-green-50">
                    <p className="text-base sm:text-lg font-bold text-green-600">
                      {selectedDateTasks.filter(t => t.status === 'Done').length}
                    </p>
                    <p className="text-xs text-green-700">Done</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-blue-50">
                    <p className="text-base sm:text-lg font-bold text-blue-600">
                      {selectedDateTasks.filter(t => t.status === 'In Progress').length}
                    </p>
                    <p className="text-xs text-blue-700">In Progress</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-amber-50">
                    <p className="text-base sm:text-lg font-bold text-amber-600">
                      {selectedDateTasks.filter(t => t.status === 'Pending').length}
                    </p>
                    <p className="text-xs text-amber-700">Pending</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Overlay */}
        {showTaskPanel && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setShowTaskPanel(false)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Calendar;