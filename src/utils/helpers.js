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

export const filterTasks = (tasks, filterStatus, searchQuery) => {
  let result = [...tasks];

  // Filter by status - FIXED: Map "All Tasks" to no status filter
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

  return result;
};