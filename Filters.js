// Filters.js
import React, { useState } from 'react';

function Filters({ filters, onChange }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handlePriorityChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setLocalFilters({ ...localFilters, priorities: selectedOptions });
  };

  const handleStatusChange = (e) => {
    setLocalFilters({ ...localFilters, status: e.target.value });
  };

  const handleSearchChange = (e) => {
    setLocalFilters({ ...localFilters, searchQuery: e.target.value });
  };

  const applyFilters = () => {
    onChange(localFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      searchQuery: '',
      priorities: [],
      status: 'all'
    };
    setLocalFilters(clearedFilters);
    onChange(clearedFilters);
  };

  return (
    <div className="filter-section">
      <h3>Filter Tasks</h3>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={localFilters.searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="priorityFilter">Priority Level</label>
          <select
            id="priorityFilter"
            multiple
            value={localFilters.priorities}
            onChange={handlePriorityChange}
          >
            <option value="Critical">Critical</option>
            <option value="Urgent">Urgent</option>
            <option value="High Priority">High Priority</option>
            <option value="Medium Priority">Medium Priority</option>
            <option value="Low Priority">Low Priority</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="statusFilter">Status</label>
          <select
            id="statusFilter"
            value={localFilters.status}
            onChange={handleStatusChange}
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed Only</option>
            <option value="incomplete">Incomplete Only</option>
          </select>
        </div>
      </div>
      
      <div className="filter-buttons">
        <button onClick={applyFilters}>Apply Filters</button>
        <button onClick={clearFilters} className="clear-filters">Clear Filters</button>
      </div>
    </div>
  );
}

export default Filters;
