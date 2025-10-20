import React, { useState, useEffect } from 'react';
import { X, Calendar, Flag, ListTodo, FileText, Target } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, task, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    date: '',
    progress: 0
  });

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'Pending',
        priority: task.priority || 'Medium',
        date: task.date || '',
        progress: task.progress || 0
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'Pending',
        priority: 'Medium',
        date: '',
        progress: 0
      });
    }
  }, [task, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSave(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'progress' ? parseInt(value) : value
    }));
  };

  // Close modal when clicking on backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-md transform transition-all duration-300 scale-100 shadow-xl border border-gray-100 overflow-hidden">
        {/* Header with White Background and Gradient Text */}
        <div className="bg-white p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[#2B069B] via-[#3A01BA] to-[#7148CC] rounded-xl text-white">
                <ListTodo className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-[#2B069B] via-[#3A01BA] to-[#7148CC] bg-clip-text text-transparent">
                  {task ? 'Edit Task' : 'Create New Task'}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {task ? 'Update your task details' : 'Add a new task to your workflow'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110 text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form - More Compact */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText className="w-4 h-4 text-[#7148CC]" />
              Task Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7148CC] focus:border-[#7148CC] transition-all duration-200 placeholder-gray-400 text-sm"
              required
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText className="w-4 h-4 text-[#7148CC]" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add more details about this task..."
              rows="2"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7148CC] focus:border-[#7148CC] transition-all duration-200 resize-none placeholder-gray-400 text-sm"
            />
          </div>

          {/* Status and Priority - Side by Side */}
          <div className="grid grid-cols-2 gap-3">
            {/* Status Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Target className="w-4 h-4 text-[#7148CC]" />
                Status
              </label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7148CC] focus:border-[#7148CC] appearance-none bg-white transition-all duration-200 cursor-pointer text-sm custom-select"
                  style={{ 
                    accentColor: '#7148CC',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none'
                  }}
                >
                  <option value="Pending">🟡 Pending</option>
                  <option value="In Progress">🔵 In Progress</option>
                  <option value="Done">🟢 Done</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                  <div className="w-2 h-2 border-r-2 border-b-2 border-current transform rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Priority Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Flag className="w-4 h-4 text-[#7148CC]" />
                Priority
              </label>
              <div className="relative">
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7148CC] focus:border-[#7148CC] appearance-none bg-white transition-all duration-200 cursor-pointer text-sm"
                  style={{ 
                    accentColor: '#7148CC',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none'
                  }}
                >
                  <option value="Low">🟢 Low</option>
                  <option value="Medium">🟡 Medium</option>
                  <option value="High">🔴 High</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                  <div className="w-2 h-2 border-r-2 border-b-2 border-current transform rotate-45"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Due Date Field - FIXED: Removed duplicate icon */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Calendar className="w-4 h-4 text-[#7148CC]" />
              Due Date
            </label>
            <div className="relative">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7148CC] focus:border-[#7148CC] transition-all duration-200 appearance-none text-sm custom-date pl-3 pr-10"
                style={{ accentColor: '#7148CC' }}
              />
              {/* Calendar icon removed from here since it's already in the label */}
            </div>
          </div>

          {/* Progress - Only show for In Progress tasks */}
          {formData.status === 'In Progress' && (
            <div className="space-y-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <label className="flex items-center justify-between text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#7148CC]" />
                  Progress
                </span>
                <span className="text-[#7148CC] font-bold">{formData.progress}%</span>
              </label>
              <div className="space-y-1">
                <input
                  type="range"
                  name="progress"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={handleChange}
                  className="w-full h-1.5 bg-gray-300 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#7148CC] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md transition-all duration-200"
                  style={{ accentColor: '#7148CC' }}
                />
                <div className="flex justify-between text-xs text-gray-500 px-0.5">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#2B069B] via-[#3A01BA] to-[#7148CC] text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-purple-500/25 text-sm"
            >
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;