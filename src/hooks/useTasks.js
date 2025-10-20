import { useState, useEffect } from 'react';
import { getTasks, saveTask, deleteTask as deleteTaskAPI } from '../utils/api';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      // Ensure all tasks have required fields with defaults
      const tasksWithDefaults = data.map(task => ({
        priority: 'Medium',
        progress: 0,
        date: new Date().toISOString().split('T')[0],
        ...task
      }));
      setTasks(tasksWithDefaults);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    const taskWithDefaults = {
      id: Date.now().toString(),
      status: 'Pending',
      priority: 'Medium',
      progress: 0,
      date: new Date().toISOString().split('T')[0],
      ...taskData
    };
    
    const saved = await saveTask(taskWithDefaults);
    setTasks(prev => [...prev, saved]);
    return saved;
  };

  const updateTask = async (taskData) => {
    const updated = await saveTask(taskData);
    setTasks(prev => prev.map(t => t.id === taskData.id ? updated : t));
    return updated;
  };

  const deleteTask = async (id) => {
    await deleteTaskAPI(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return { 
    tasks, 
    loading, 
    addTask, 
    updateTask, 
    deleteTask,
    refetch: loadTasks
  };
};

export default useTasks;