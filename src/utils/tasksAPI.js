const API_DELAY = 300;
const STORAGE_KEY = 'tasks_data';

export const getTasks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem(STORAGE_KEY);
      const tasks = stored ? JSON.parse(stored) : [];
      resolve(tasks);
    }, API_DELAY);
  });
};

export const saveTask = (task) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem(STORAGE_KEY);
      const tasks = stored ? JSON.parse(stored) : [];
      const existingIndex = tasks.findIndex(t => t.id === task.id);

      if (existingIndex >= 0) {
        // Update existing task
        tasks[existingIndex] = task;
      } else {
        // Add new task - use the existing ID if provided, otherwise generate one
        if (!task.id) {
          task.id = Date.now().toString();
        }
        tasks.push(task);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      resolve(task);
    }, API_DELAY);
  });
};

export const deleteTask = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem(STORAGE_KEY);
      const tasks = stored ? JSON.parse(stored) : [];
      const filtered = tasks.filter(t => t.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      resolve(id);
    }, API_DELAY);
  });
};