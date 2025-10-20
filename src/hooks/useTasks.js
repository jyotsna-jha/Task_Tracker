import { useState, useEffect, useCallback } from 'react';
import { getTasks, saveTask, deleteTask as deleteTaskAPI } from '../utils/tasksAPI';

// Create a simple event system for real-time updates
const taskUpdateEvents = {
  listeners: new Set(),
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  },
  notify() {
    this.listeners.forEach(callback => callback());
  }
};

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const loadTasks = useCallback(async (showLoading = true) => {
    console.log('🔄 useTasks - Loading tasks from API');
    
    if (showLoading) {
      setLoading(true);
    } else {
      setSyncing(true);
    }
    
    try {
      const data = await getTasks();
      console.log('✅ useTasks - Loaded tasks:', data.length);
      
      const tasksWithDefaults = data.map(task => ({
        priority: task.priority || 'Medium',
        progress: task.progress || 0,
        date: task.date || new Date().toISOString().split('T')[0],
        status: task.status || 'Pending',
        ...task
      }));
      
      setTasks(tasksWithDefaults);
    } catch (error) {
      console.error('❌ useTasks - Failed to load tasks:', error);
      setTasks([]);
    } finally {
      if (showLoading) {
        setLoading(false);
      } else {
        setSyncing(false);
      }
      console.log('🏁 useTasks - Loading complete');
    }
  }, []);

  useEffect(() => {
    // Load tasks initially
    loadTasks();

    // Subscribe to task updates
    const unsubscribe = taskUpdateEvents.subscribe(() => {
      console.log('🔄 useTasks - Received update notification, refreshing...');
      loadTasks(false); // Background refresh without loading state
    });

    return unsubscribe;
  }, [loadTasks]);

  const addTask = async (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      status: 'Pending',
      priority: 'Medium',
      progress: 0,
      date: new Date().toISOString().split('T')[0],
      ...taskData
    };
    
    console.log('➕ useTasks - Adding task:', newTask.title);
    
    // OPTIMISTIC UPDATE: Show task immediately
    setTasks(prev => {
      const newTasks = [...prev, newTask];
      console.log('📊 useTasks - Tasks optimistically updated:', newTasks.length);
      return newTasks;
    });
    
    try {
      const saved = await saveTask(newTask);
      console.log('✅ useTasks - Task saved to API:', saved.title);
      
      // Update with server response if needed (though in your case it's localStorage)
      setTasks(prev => prev.map(t => t.id === newTask.id ? saved : t));
      
      // Notify all components to refresh
      taskUpdateEvents.notify();
      return saved;
    } catch (error) {
      console.error('❌ useTasks - Error adding task:', error);
      
      // ROLLBACK: Remove the task if save failed
      setTasks(prev => prev.filter(t => t.id !== newTask.id));
      
      throw error;
    }
  };

  const updateTask = async (taskData) => {
    console.log('✏️ useTasks - Updating task:', taskData.title);
    
    // OPTIMISTIC UPDATE: Show changes immediately
    const previousTasks = tasks;
    setTasks(prev => prev.map(t => t.id === taskData.id ? taskData : t));
    
    try {
      const updated = await saveTask(taskData);
      console.log('✅ useTasks - Task updated in API:', updated.title);
      
      // Notify all components to refresh
      taskUpdateEvents.notify();
      return updated;
    } catch (error) {
      console.error('❌ useTasks - Error updating task:', error);
      
      // ROLLBACK: Revert to previous state
      setTasks(previousTasks);
      
      throw error;
    }
  };

  const deleteTask = async (id) => {
    console.log('🗑️ useTasks - Deleting task ID:', id);
    
    // OPTIMISTIC UPDATE: Remove task immediately
    const taskToDelete = tasks.find(t => t.id === id);
    setTasks(prev => {
      const newTasks = prev.filter(t => t.id !== id);
      console.log('📊 useTasks - Tasks optimistically updated after delete:', newTasks.length);
      return newTasks;
    });
    
    try {
      await deleteTaskAPI(id);
      console.log('✅ useTasks - Task deleted from API');
      
      // Notify all components to refresh
      taskUpdateEvents.notify();
    } catch (error) {
      console.error('❌ useTasks - Error deleting task:', error);
      
      // ROLLBACK: Restore the task if delete failed
      if (taskToDelete) {
        setTasks(prev => [...prev, taskToDelete]);
      }
      
      throw error;
    }
  };

  const refreshAnalytics = async () => {
    await loadTasks(false);
  };

  return { 
    tasks, 
    loading,
    syncing, 
    addTask, 
    updateTask, 
    deleteTask,
    refetch: loadTasks,
    refreshAnalytics 
  };
};

export default useTasks;