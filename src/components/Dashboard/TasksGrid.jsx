import React from 'react';
import { CheckCircle2, Clock, AlertCircle, Calendar, Edit2, Trash2 } from 'lucide-react';
import { useTaskContext } from '../../contexts/TaskContext';

const TaskGrid = ({ tasks, onEditTask }) => {
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
    'High': { dot: 'bg-red-500' },
    'Medium': { dot: 'bg-purple-500' },
    'Low': { dot: 'bg-gray-500' }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const DonutProgress = ({ progress, size = 44, strokeWidth = 3 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-100"
          />
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
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-emerald-700">
            {progress}%
          </span>
        </div>
      </div>
    );
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 mx-auto">
          <AlertCircle className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 text-lg font-medium">No tasks found</p>
        <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => {
        const StatusIcon = statusConfig[task.status]?.icon;
        
        return (
          <div
            key={task.id}
            className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 p-6 hover:shadow-md transition-all duration-200 group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#5b31f0] transition-colors duration-200 line-clamp-2">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {task.description || 'No description'}
                </p>
              </div>
            </div>

            {/* Status and Priority */}
            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex items-center gap-1.5 ${statusConfig[task.status]?.bg} ${statusConfig[task.status]?.text} border ${statusConfig[task.status]?.border} px-3 py-1.5 rounded-lg text-xs font-semibold`}>
                {StatusIcon && <StatusIcon className="w-3.5 h-3.5" strokeWidth={2.5} />}
                {task.status}
              </span>
              
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${priorityConfig[task.priority]?.dot}`}></span>
                <span className="text-sm font-medium text-gray-700">
                  {task.priority}
                </span>
              </div>
            </div>

            {/* Due Date */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Calendar className="w-4 h-4" strokeWidth={2} />
              <span>{formatDate(task.date)}</span>
            </div>

            {/* Progress */}
            {task.progress !== undefined && task.status === 'In Progress' && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <div className="flex justify-center">
                  <DonutProgress progress={task.progress} size={60} />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => onEditTask(task)}
                className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-all duration-200"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 bg-gray-50 hover:bg-red-50 hover:text-red-600 rounded-lg font-medium transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskGrid;