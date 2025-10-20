import React, { createContext, useContext, useReducer } from 'react';
import useTasks from '../hooks/useTasks';

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SORT':
      return { ...state, sortBy: action.payload.sortBy, sortOrder: action.payload.sortOrder };
    case 'SET_FILTER':
      return { ...state, activeFilter: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    case 'SET_DATE_FILTER':
      return { ...state, dateFilter: action.payload };
    default:
      return state;
  }
};

const initialState = {
  sortBy: 'date',
  sortOrder: 'asc',
  activeFilter: 'All Tasks',
  searchQuery: '',
  viewMode: 'table', 
  dateFilter: 'all' // 'all', 'today', 'tomorrow', 'this-week', 'overdue'
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { tasks, loading, addTask, updateTask, deleteTask } = useTasks();

  const setSort = (sortBy, sortOrder) => {
    dispatch({ type: 'SET_SORT', payload: { sortBy, sortOrder } });
  };

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSearchQuery = (query) => {
    dispatch({ type: 'SET_SEARCH', payload: query });
  };

  const setViewMode = (mode) => {
    dispatch({ type: 'SET_VIEW_MODE', payload: mode });
  };

  const setDateFilter = (dateFilter) => {
    dispatch({ type: 'SET_DATE_FILTER', payload: dateFilter });
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      addTask,
      updateTask,
      deleteTask,
      ...state,
      setSort,
      setFilter,
      setSearchQuery,
      setViewMode,
      setDateFilter
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};