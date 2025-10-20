import React, { useState } from 'react';
import Header from '../components/Dashboard/Header';
import StatsGrid from '../components/Dashboard/StatsGrid';
import SearchAndFilterBar from '../components/Dashboard/SearchAndFilterBar';
import TaskTable from '../components/Dashboard/TaskTable';
import TaskModal from '../components/Modals/TaskModal';
import Analytics from './Analytics';
import { TaskProvider, useTaskContext } from '../contexts/TaskContext';
import { filterTasks, sortTasks } from '../utils/helpers';

const DashboardContent = () => {
  const {
    tasks,
    loading,
    addTask,
    updateTask,
    activeFilter,
    searchQuery,
    dateFilter,
    sortBy,
    sortOrder,
  } = useTaskContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' or 'analytics'

  const filteredTasks = filterTasks(tasks, activeFilter, searchQuery, dateFilter);
  const sortedTasks = sortTasks(filteredTasks, sortBy, sortOrder);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    if (editingTask) {
      await updateTask({ ...editingTask, ...taskData });
    } else {
      await addTask(taskData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const stats = [
    { 
      title: 'Total Tasks', 
      value: tasks.length.toString(), 
      iconType: 'list' 
    },
    { 
      title: 'Completed', 
      value: tasks.filter(t => t.status === 'Done').length.toString(), 
      iconType: 'check' 
    },
    { 
      title: 'In Progress', 
      value: tasks.filter(t => t.status === 'In Progress').length.toString(), 
      iconType: 'clock' 
    },
    { 
      title: 'Completion Rate', 
      value: tasks.length > 0 
        ? `${Math.round((tasks.filter(t => t.status === 'Done').length / tasks.length) * 100)}%`
        : '0%', 
      iconType: 'trending' 
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7148CC] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full px-4 sm:px-6 lg:px-14 pt-4 sm:pt-6 pb-6 sm:pb-8">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'tasks' ? (
          <>
            <StatsGrid stats={stats} />

            <div className="mt-8 sm:mt-12 lg:mt-20">
              <SearchAndFilterBar onAddTask={handleAddTask} />
            </div>

            <div className='mb-8 sm:mb-12 lg:mb-20'>
              <TaskTable tasks={sortedTasks} onEditTask={handleEditTask} />
            </div>
          </>
        ) : (
          <Analytics />
        )}

        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          task={editingTask}
          onSave={handleSaveTask}
        />
      </div>
    </div>
  );
};

// Wrap with TaskProvider
const Dashboard = () => {
  return (
    <TaskProvider>
      <DashboardContent />
    </TaskProvider>
  );
};

export default Dashboard;