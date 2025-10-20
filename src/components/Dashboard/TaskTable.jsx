import React from 'react';
import { CheckCircle2, Clock, AlertCircle, Calendar, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { useTaskContext } from '../../contexts/TaskContext';

const TaskTable = ({ tasks, onEditTask }) => {
  const { deleteTask } = useTaskContext();

  const statusConfig = {
    'Done': { 
      bg: 'bg-emerald-50', 
      text: 'text-emerald-700', 
      border: 'border-emerald-200',
      icon: CheckCircle2 
    },
    'In Progress': { 
      bg: 'bg-blue-50', 
      text: 'text-blue-700', 
      border: 'border-blue-200',
      icon: Clock 
    },
    'Pending': { 
      bg: 'bg-amber-50', 
      text: 'text-amber-700', 
      border: 'border-amber-200',
      icon: AlertCircle 
    }
  };

  const priorityConfig = {
    'High': { 
      bg: 'bg-red-50', 
      text: 'text-red-700', 
      border: 'border-red-200',
      dot: 'bg-red-500'
    },
    'Medium': { 
      bg: 'bg-purple-50', 
      text: 'text-purple-700', 
      border: 'border-purple-200',
      dot: 'bg-purple-500'
    },
    'Low': { 
      bg: 'bg-gray-50', 
      text: 'text-gray-700', 
      border: 'border-gray-200',
      dot: 'bg-gray-500'
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
    }
  };

  // Donut Progress with theme green color
  const DonutProgress = ({ progress, size = 44, strokeWidth = 3 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-100"
          />
          {/* Progress Circle with Theme Green */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-emerald-500 transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-emerald-700 font-montserrat">
            {progress}%
          </span>
        </div>
      </div>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Mobile Task Card Component
  const MobileTaskCard = ({ task }) => {
    const StatusIcon = statusConfig[task.status]?.icon;
    
    return (
      <div className="bg-white rounded-xl border-2 border-gray-100 p-4 mb-4 shadow-sm hover:shadow-md transition-all duration-200">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 font-poppins mb-1">
              {task.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2 font-montserrat">
              {task.description || 'No description'}
            </p>
          </div>
          <div className="flex gap-1 ml-2">
            <button
              onClick={() => onEditTask(task)}
              className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100 transition-all duration-200"
              title="Edit task"
            >
              <Edit2 className="w-4 h-4" strokeWidth={2} />
            </button>
            <button
              onClick={() => handleDelete(task.id)}
              className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-all duration-200"
              title="Delete task"
            >
              <Trash2 className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Status */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium mb-1 font-poppins">Status</span>
            <span className={`inline-flex items-center gap-1.5 ${statusConfig[task.status]?.bg} ${statusConfig[task.status]?.text} border ${statusConfig[task.status]?.border} px-2 py-1 rounded-lg text-xs font-semibold font-montserrat w-fit`}>
              {StatusIcon && <StatusIcon className="w-3 h-3" strokeWidth={2.5} />}
              {task.status}
            </span>
          </div>

          {/* Priority */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium mb-1 font-poppins">Priority</span>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${priorityConfig[task.priority]?.dot}`}></span>
              <span className="text-sm font-medium text-gray-700 font-montserrat">
                {task.priority}
              </span>
            </div>
          </div>

          {/* Due Date */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium mb-1 font-poppins">Due Date</span>
            <div className="flex items-center gap-2 text-sm text-gray-600 font-montserrat">
              <Calendar className="w-4 h-4" strokeWidth={2} />
              <span>{formatDate(task.date)}</span>
            </div>
          </div>

          {/* Progress */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium mb-1 font-poppins">Progress</span>
            <div className="flex items-center">
              {task.progress !== undefined && task.status === 'In Progress' ? (
                <DonutProgress progress={task.progress} size={36} strokeWidth={2.5} />
              ) : (
                <span className="text-sm text-gray-400 font-montserrat">-</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden">
      {/* Desktop Table (hidden on mobile) */}
      <div className="hidden lg:block overflow-auto scrollbar-hide" style={{ maxHeight: '600px' }}>
        <table className="w-full">
          {/* Sticky Header */}
          <thead className="sticky top-0 bg-gray-50 border-b-2 border-gray-100 z-10">
            <tr>
              <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider min-w-[250px] font-poppins">
                Task
              </th>
              <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider min-w-[120px] font-poppins">
                Status
              </th>
              <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider min-w-[100px] font-poppins">
                Priority
              </th>
              <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider min-w-[120px] font-poppins">
                Due Date
              </th>
              <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider min-w-[100px] font-poppins">
                Progress
              </th>
              <th className="px-6 py-5 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider min-w-[120px] font-poppins">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <AlertCircle className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-xl font-medium font-poppins">No tasks found</p>
                    <p className="text-gray-400 text-base mt-2 font-montserrat">Try adjusting your search or filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              tasks.map((task) => {
                const StatusIcon = statusConfig[task.status]?.icon;
                
                return (
                  <tr 
                    key={task.id} 
                    className="group hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-transparent transition-all duration-200"
                  >
                    {/* Task Name & Description */}
                    <td className="px-6 py-5 min-w-[250px]">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#5b31f0] transition-colors duration-200 font-poppins">
                            {task.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-2 line-clamp-1 font-montserrat">
                            {task.description || 'No description'}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5 min-w-[120px]">
                      <span className={`inline-flex items-center gap-1.5 ${statusConfig[task.status]?.bg} ${statusConfig[task.status]?.text} border ${statusConfig[task.status]?.border} px-3 py-2 rounded-lg text-sm font-semibold font-montserrat`}>
                        {StatusIcon && <StatusIcon className="w-4 h-4" strokeWidth={2.5} />}
                        {task.status}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="px-6 py-5 min-w-[100px]">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${priorityConfig[task.priority]?.dot}`}></span>
                        <span className="text-base font-medium text-gray-700 font-montserrat">
                          {task.priority}
                        </span>
                      </div>
                    </td>

                    {/* Due Date */}
                    <td className="px-6 py-5 min-w-[120px]">
                      <div className="flex items-center gap-2 text-base text-gray-600 font-montserrat">
                        <Calendar className="w-5 h-5" strokeWidth={2} />
                        <span>{formatDate(task.date)}</span>
                      </div>
                    </td>

                    {/* Progress - Only Donut Progress */}
                    <td className="px-6 py-5 min-w-[100px]">
                      {task.progress !== undefined && task.status === 'In Progress' ? (
                        <DonutProgress progress={task.progress} />
                      ) : (
                        <span className="text-sm text-gray-400 font-montserrat">-</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5 min-w-[120px]">
                      <div className="flex items-center justify-center gap-3">
                        {/* Edit Button - Blue Theme */}
                        <button
                          onClick={() => onEditTask(task)}
                          className="group/edit p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 hover:scale-110"
                          title="Edit task"
                        >
                          <Edit2 className="w-5 h-5 transition-colors duration-200" strokeWidth={2} />
                        </button>

                        {/* Delete Button - Red Theme */}
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="group/delete p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300 hover:text-red-700 transition-all duration-200 hover:scale-110"
                          title="Delete task"
                        >
                          <Trash2 className="w-5 h-5 transition-colors duration-200" strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards (shown on mobile) */}
      <div className="lg:hidden p-4">
        {tasks.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium font-poppins">No tasks found</p>
            <p className="text-gray-400 text-sm mt-2 font-montserrat">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <MobileTaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>

      {/* Table Footer - Optional: Shows total count */}
      {tasks.length > 0 && (
        <div className="px-4 lg:px-6 py-4 lg:py-5 bg-gray-50 border-t-2 border-gray-100 flex-shrink-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="text-sm lg:text-base text-gray-600 font-montserrat">
              Showing <span className="font-semibold text-gray-900 font-poppins">{tasks.length}</span> task{tasks.length !== 1 ? 's' : ''}
            </p>
            
            {/* Scroll Indicator (only shows when there are many tasks) */}
            {tasks.length > 8 && (
              <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-500 font-montserrat">
                <span className="animate-bounce hidden sm:inline">↓</span>
                <span>{window.innerWidth < 640 ? 'Swipe to see more' : 'Scroll to see more tasks'}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTable;