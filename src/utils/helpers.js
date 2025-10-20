export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

export const isOverdue = (dueDate, status) => {
  if (!dueDate || status === 'Done') return false;
  return new Date(dueDate) < new Date() && status !== 'Done';
};

export const sortTasks = (tasks, sortBy, sortOrder) => {
  const sorted = [...tasks];
  
  sorted.sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = a.date ? new Date(a.date) : new Date(0);
      const dateB = b.date ? new Date(b.date) : new Date(0);
      const comparison = dateA - dateB;
      return sortOrder === 'asc' ? comparison : -comparison;
    } else {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? comparison : -comparison;
    }
  });

  return sorted;
};

export const filterTasks = (tasks, filterStatus, searchQuery, dateFilter) => {
  let result = [...tasks];

  // Filter by status
  if (filterStatus !== 'All Tasks') {
    result = result.filter(t => t.status === filterStatus);
  }

  // Filter by search
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    result = result.filter(t => 
      t.title.toLowerCase().includes(query) ||
      (t.description && t.description.toLowerCase().includes(query))
    );
  }

  // Filter by date
  if (dateFilter && dateFilter !== 'all') {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const endOfWeek = new Date(today);
    endOfWeek.setDate(endOfWeek.getDate() + (7 - today.getDay()));

    result = result.filter(task => {
      if (!task.date) return false;
      
      const taskDate = new Date(task.date);
      taskDate.setHours(0, 0, 0, 0);

      switch (dateFilter) {
        case 'today':
          return taskDate.getTime() === today.getTime();
        
        case 'tomorrow':
          return taskDate.getTime() === tomorrow.getTime();
        
        case 'this-week':
          return taskDate >= today && taskDate <= endOfWeek;
        
        case 'overdue':
          return taskDate < today && task.status !== 'Done';
        
        default:
          return true;
      }
    });
  }

  return result;
};

// Helper function to get date filter display name
export const getDateFilterDisplayName = (dateFilter) => {
  const filterNames = {
    'all': 'All Dates',
    'today': 'Today',
    'tomorrow': 'Tomorrow',
    'this-week': 'This Week',
    'overdue': 'Overdue'
  };
  return filterNames[dateFilter] || 'All Dates';
};