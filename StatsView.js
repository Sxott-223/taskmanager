// StatsView.js
import React from 'react';

function StatsView({ tasks }) {
  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  
  // Calculate completion percentage
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Calculate priority distribution
  const priorityCounts = {
    'Critical': 0,
    'Urgent': 0,
    'High Priority': 0,
    'Medium Priority': 0,
    'Low Priority': 0
  };
  
  tasks.forEach(task => {
    priorityCounts[task.priority]++;
  });
  
  // Find the maximum count for scaling
  const maxCount = Math.max(...Object.values(priorityCounts));

  return (
    <div className="stats-container">
      <h2>Task Overview</h2>
      
      <div className="stats-summary">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <div className="stat-value">{totalTasks}</div>
        </div>
        <div className="stat-card">
          <h3>Completed Tasks</h3>
          <div className="stat-value completed-stat">{completedTasks}</div>
        </div>
        <div className="stat-card">
          <h3>Pending Tasks</h3>
          <div className="stat-value pending-stat">{pendingTasks}</div>
        </div>
      </div>
      
      <div className="chart-container">
        <h3>Tasks by Priority</h3>
        <div className="priority-chart">
          <div className="chart-row">
            <label>Critical</label>
            <div className="chart-bar">
              <div 
                className="chart-bar-fill priority-Critical" 
                style={{ width: maxCount > 0 ? `${(priorityCounts['Critical'] / maxCount) * 100}%` : '0%' }}
              >
                {priorityCounts['Critical']}
              </div>
            </div>
          </div>
          <div className="chart-row">
            <label>Urgent</label>
            <div className="chart-bar">
              <div 
                className="chart-bar-fill priority-Urgent" 
                style={{ width: maxCount > 0 ? `${(priorityCounts['Urgent'] / maxCount) * 100}%` : '0%' }}
              >
                {priorityCounts['Urgent']}
              </div>
            </div>
          </div>
          <div className="chart-row">
            <label>High Priority</label>
            <div className="chart-bar">
              <div 
                className="chart-bar-fill priority-High-Priority" 
                style={{ width: maxCount > 0 ? `${(priorityCounts['High Priority'] / maxCount) * 100}%` : '0%' }}
              >
                {priorityCounts['High Priority']}
              </div>
            </div>
          </div>
          <div className="chart-row">
            <label>Medium Priority</label>
            <div className="chart-bar">
              <div 
                className="chart-bar-fill priority-Medium-Priority" 
                style={{ width: maxCount > 0 ? `${(priorityCounts['Medium Priority'] / maxCount) * 100}%` : '0%' }}
              >
                {priorityCounts['Medium Priority']}
              </div>
            </div>
          </div>
          <div className="chart-row">
            <label>Low Priority</label>
            <div className="chart-bar">
              <div 
                className="chart-bar-fill priority-Low-Priority" 
                style={{ width: maxCount > 0 ? `${(priorityCounts['Low Priority'] / maxCount) * 100}%` : '0%' }}
              >
                {priorityCounts['Low Priority']}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="chart-container" style={{ marginTop: '20px' }}>
        <h3>Completion Rate</h3>
        <div className="chart-row">
          <label>Completion %</label>
          <div className="chart-bar">
            <div 
              className="chart-bar-fill priority-Medium-Priority" 
              style={{ width: `${completionPercentage}%` }}
            >
              {completionPercentage}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsView;
