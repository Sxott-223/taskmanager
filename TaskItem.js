// TaskItem.js
import React from 'react';

function TaskItem({ task, onClick, onToggleComplete, onDelete, showPriorityOnly, showCompletionDate }) {
  const priorityClass = `task-priority-${task.priority.replace(' ', '-')}`;
  
  return (
    <div className={`task-item ${priorityClass}`} onClick={onClick}>
      <h3>{task.title}</h3>
      
      {!showPriorityOnly && task.description && (
        <p>{task.description}</p>
      )}
      
      <p>Priority: {task.priority}</p>
      
      {showCompletionDate ? (
        <p>Completed: {new Date(task.completedAt).toLocaleDateString()}</p>
      ) : (
        <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      )}
      
      {(onToggleComplete || onDelete) && (
        <div className="task-actions">
          {onToggleComplete && (
            <button 
              style={{ backgroundColor: task.completed ? '#388e3c' : '#f57c00' }}
              onClick={(e) => {
                e.stopPropagation();
                onToggleComplete();
              }}
            >
              {task.completed ? 'Completed' : 'Mark Complete'}
            </button>
          )}
          
          {onDelete && (
            <button 
              style={{ backgroundColor: '#d32f2f' }}
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TaskItem;
