// TaskList.js
import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onTaskClick, onToggleComplete, onDelete, showPriorityOnly = false, showCompletionDate = false }) {
  if (tasks.length === 0) {
    return <p>No tasks found</p>;
  }

  return (
    <div>
      <h2>{showPriorityOnly ? 'High Priority Tasks' : showCompletionDate ? 'Completed Tasks' : 'Current Tasks'}</h2>
      <div className="tasks-container">
        {tasks.map(task => (
          <TaskItem 
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)}
            onToggleComplete={onToggleComplete ? () => onToggleComplete(task.id) : null}
            onDelete={onDelete ? () => onDelete(task.id) : null}
            showPriorityOnly={showPriorityOnly}
            showCompletionDate={showCompletionDate}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
