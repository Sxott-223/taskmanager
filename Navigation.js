// Navigation.js
import React from 'react';

function Navigation({ currentView, onViewChange }) {
  const views = [
    { id: 'main', label: 'All Tasks' },
    { id: 'highPriority', label: 'High Priority' },
    { id: 'completed', label: 'Completed' },
    { id: 'stats', label: 'Statistics' }
  ];

  return (
    <div className="nav-buttons">
      {views.map(view => (
        <div
          key={view.id}
          className={`nav-button ${currentView === view.id ? 'active' : ''}`}
          onClick={() => onViewChange(view.id)}
        >
          {view.label}
        </div>
      ))}
    </div>
  );
}

export default Navigation;
