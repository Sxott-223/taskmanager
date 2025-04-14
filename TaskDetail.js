// TaskDetail.js
import React from 'react';

function TaskDetail({ task, onToggleComplete, onEdit, onDelete, onClose }) {
  const getPriorityNumber = (priority) => {
    const priorityMap = {
      'Critical': 1,
      'Urgent': 2,
      'High Priority': 3,
      'Medium Priority': 4,
      'Low Priority': 5
    };
    return priorityMap[priority] || 5;
  };

  const priorityText = `${getPriorityNumber(task.priority)} - ${task.priority}`;
  const priorityClass = `priority-${getPriorityNumber(task.priority)}`;

  return (
    <div className="task-detail-screen">
      <div className="task-detail-header">
        <h2 id="detailTitle">{task.title}</h2>
        <span className="close-detail" onClick={onClose}>×</span>
      </div>
      
      <div className="task-detail-content">
        <div className="task-detail-section">
          <div className="task-detail-label">Description</div>
          <div className="task-detail-value">
            {task.description || 'No description'}
          </div>
        </div>
        
        <div className="task-detail-section">
          <div className="task-detail-label">Priority</div>
          <div className="task-detail-value">
            <span className={`priority-badge ${priorityClass}`}>
              {priorityText}
            </span>
          </div>
        </div>
        
        <div className="task-detail-section">
          <div className="task-detail-label">Status</div>
          <div className="task-detail-value">
            <span className={`status-badge ${task.completed ? 'status-completed' : 'status-pending'}`}>
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
        </div>
        
        <div className="task-detail-section">
          <div className="task-detail-label">Created Date</div>
          <div className="task-detail-value">
            {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'Not set'}
          </div>
        </div>
        
        <div className="task-detail-section">
          <div className="task-detail-label">Due Date</div>
          <div className="task-detail-value">
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}
          </div>
        </div>
        
        {task.completed && (
          <div className="task-detail-section">
            <div className="task-detail-label">Completion Date</div>
            <div className="task-detail-value">
              {task.completedAt ? new Date(task.completedAt).toLocaleDateString() : 'Not set'}
            </div>
          </div>
        )}
      </div>
      
      <div className="task-detail-actions">
        <button 
          onClick={onToggleComplete}
          style={{ backgroundColor: task.completed ? '#f57c00' : '#4caf50' }}
        >
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button onClick={onEdit}>Edit Task</button>
        <button 
          onClick={onDelete}
          style={{ backgroundColor: '#f44336' }}
        >
          Delete Task
        </button>
      </div>
    </div>
  );
}

export default TaskDetail;
