import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Calendar, ChevronDown } from 'lucide-react';
import AnimatedSubmitButton from '../Buttons/AnimatedSubmitButtons';
import { useTaskContext } from '../../contexts/TaskContext';
import useDebounce from '../../hooks/useDebounce';

const SearchAndFilterBar = ({ onAddTask }) => {
  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setFilter,
    dateFilter,
    setDateFilter,
  } = useTaskContext();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const debouncedSearch = useDebounce(localSearch, 300);

  const statusFilters = ['All Tasks', 'Pending', 'In Progress', 'Done'];
  const dateFilters = [
    { value: 'all', label: 'All Dates', icon: '📅' },
    { value: 'today', label: 'Today', icon: '🌞' },
    { value: 'tomorrow', label: 'Tomorrow', icon: '📆' },
    { value: 'this-week', label: 'This Week', icon: '🗓️' },
    { value: 'overdue', label: 'Overdue', icon: '⏰' }
  ];

  // Update global search when debounced value changes
  useEffect(() => {
    if (debouncedSearch !== searchQuery) {
      setSearchQuery(debouncedSearch);
    }
  }, [debouncedSearch, searchQuery, setSearchQuery]);

  // Close mobile filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMobileFilters && !event.target.closest('.mobile-filter-container')) {
        setShowMobileFilters(false);
      }
      if (showDateDropdown && !event.target.closest('.date-dropdown-container')) {
        setShowDateDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMobileFilters, showDateDropdown]);

  const getCurrentDateFilterLabel = () => {
    const currentFilter = dateFilters.find(filter => filter.value === dateFilter);
    return currentFilter ? currentFilter.label : 'All Dates';
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 sm:mb-8">
      {/* Left Side: Search Box */}
      <div className="flex-1 max-w-full sm:max-w-md relative group order-2 sm:order-1">
        <div className="relative flex items-center rounded-full px-4 sm:px-5 py-3 sm:py-4 bg-white shadow-inner w-full group hover:border-2 hover:border-[#7148CC] transition-all duration-200 focus-within:border-2 focus-within:border-[#7148CC]">
          <input
            type="text"
            placeholder="Search tasks..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="outline-none border-none text-sm sm:text-base font-normal w-full pl-2 pr-10 sm:pr-14 placeholder:text-gray-500 group-hover:placeholder:text-[#7148CC]/50 transition-colors duration-200"
          />
          <div className="absolute right-2 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center group-hover:bg-[#7148CC]/10 transition-colors duration-200">
            <Search className="text-[#7148CC] w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" />
          </div>
        </div>
      </div>

      {/* Right Side: Filter and Add Task Button */}
      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 order-1 sm:order-2">
        {/* Mobile Filter Toggle */}
        <div className="sm:hidden mobile-filter-container">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200 text-gray-600 font-semibold text-sm hover:border-[#7148CC] hover:text-[#7148CC] transition-all duration-200"
          >
            <Filter className="w-4 h-4" strokeWidth={2.5} />
            <span>Filter</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showMobileFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Mobile Filter Dropdown */}
          {showMobileFilters && (
            <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 p-4 mobile-filter-container">
              <div className="flex flex-col gap-4">
                {/* Status Filter Section */}
                <div>
                  <div className="flex items-center gap-2 text-gray-600 pb-2 border-b border-gray-100 mb-3">
                    <Filter className="w-4 h-4" strokeWidth={2.5} />
                    <span className="font-semibold text-sm">Status:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {statusFilters.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => {
                          setFilter(filter);
                          setShowMobileFilters(false);
                        }}
                        className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 text-left ${
                          activeFilter === filter
                            ? 'bg-purple-200 text-purple-700 shadow-md transform scale-105 border border-purple-300'
                            : 'bg-transparent text-gray-600 hover:bg-purple-50 hover:text-purple-700 border border-transparent'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Filter Section */}
                <div>
                  <div className="flex items-center gap-2 text-gray-600 pb-2 border-b border-gray-100 mb-3">
                    <Calendar className="w-4 h-4" strokeWidth={2.5} />
                    <span className="font-semibold text-sm">Date:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {dateFilters.map((filter) => (
                      <button
                        key={filter.value}
                        onClick={() => {
                          setDateFilter(filter.value);
                          setShowMobileFilters(false);
                        }}
                        className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 text-left flex items-center gap-2 ${
                          dateFilter === filter.value
                            ? 'bg-purple-200 text-purple-700 shadow-md transform scale-105 border border-purple-300'
                            : 'bg-transparent text-gray-600 hover:bg-purple-50 hover:text-purple-700 border border-transparent'
                        }`}
                      >
                        <span className="text-base">{filter.icon}</span>
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Filter Section */}
        <div className="hidden sm:flex items-center gap-3 bg-white rounded-xl p-2 shadow-sm border border-gray-200">
          {/* Filter Icon and Label */}
          <div className="flex items-center gap-2 text-gray-600 px-3 py-2">
            <Filter className="w-4 h-4" strokeWidth={2.5} />
            <span className="font-semibold text-sm">Filter by:</span>
          </div>
          
          {/* Status Filter Buttons */}
          <div className="flex gap-2 bg-gray-50 rounded-lg p-1">
            {statusFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setFilter(filter)}
                className={`px-3 py-2 rounded-full font-medium text-sm transition-all duration-300 min-w-[80px] lg:min-w-[100px] ${
                  activeFilter === filter
                    ? 'bg-purple-200 text-purple-700 shadow-md transform scale-105 hover:bg-purple-300 hover:text-purple-800 border border-purple-300'
                    : 'bg-transparent text-gray-600 hover:bg-purple-100 hover:text-purple-700 hover:shadow-md border border-transparent'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Date Filter Dropdown for Desktop */}
          <div className="relative date-dropdown-container">
            <button 
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 min-w-[120px] justify-between ${
                dateFilter !== 'all'
                  ? 'bg-purple-200 text-purple-700 shadow-md border border-purple-300 hover:bg-purple-300 hover:text-purple-800'
                  : 'bg-gray-50 text-gray-600 hover:bg-purple-100 hover:text-purple-700 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" strokeWidth={2.5} />
                <span>{getCurrentDateFilterLabel()}</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showDateDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Date Filter Dropdown */}
            {showDateDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 p-3 min-w-[200px] date-dropdown-container">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-gray-600 pb-2 mb-2 border-b border-gray-100">
                    <Calendar className="w-4 h-4" strokeWidth={2.5} />
                    <span className="font-semibold text-sm">Filter by Date</span>
                  </div>
                  {dateFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => {
                        setDateFilter(filter.value);
                        setShowDateDropdown(false);
                      }}
                      className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 text-left flex items-center gap-3 hover:scale-[1.02] ${
                        dateFilter === filter.value
                          ? 'bg-purple-200 text-purple-700 shadow-sm border border-purple-300'
                          : 'bg-transparent text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                      }`}
                    >
                      <span className="text-base">{filter.icon}</span>
                      <span>{filter.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Task Button */}
        <div className="w-28 sm:w-36 -mt-0">
          <AnimatedSubmitButton 
            loading={false} 
            text="Add Task"
            onClick={onAddTask}
            mobileIcon={<Plus className="w-4 h-4" />}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilterBar;