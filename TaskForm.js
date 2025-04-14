// TaskForm.js
import React, { useState, useEffect } from 'react';

function TaskForm({ task, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium Priority');
  const [dueDate, setDueDate] = useState('');
  
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority);
      setDueDate(task.dueDate);
    } else {
      // Set default date to today
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      setDueDate(formattedDate);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }
    
    const taskData = {
      title,
      description,
      priority,
      dueDate
    };
    
    if (task) {
      onSave({ ...task, ...taskData });
    } else {
      onSave(taskData);
    }
  };

  return (
    <div className="add-task-modal">
      <div className="add-task-form-container">
        <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="modalTaskTitle">Title</label>
            <input
              type="text"
              id="modalTaskTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="form-row">
            <label htmlFor="modalTaskDescription">Description</label>
            <textarea
              id="modalTaskDescription"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="form-row">
            <label htmlFor="modalTaskPriority">Priority</label>
            <select
              id="modalTaskPriority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Critical">Critical</option>
              <option value="Urgent">Urgent</option>
              <option value="High Priority">High Priority</option>
              <option value="Medium Priority">Medium Priority</option>
              <option value="Low Priority">Low Priority</option>
            </select>
          </div>
          
          <div className="form-row">
            <label htmlFor="modalTaskDueDate">Due Date</label>
            <input
              type="date"
              id="modalTaskDueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit">
              {task ? 'Update Task' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
