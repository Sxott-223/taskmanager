// App.js
import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskDetail from './TaskDetail';
import StatsView from './StatsView';
import Filters from './Filters';
import Navigation from './Navigation';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [currentView, setCurrentView] = useState('main');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    searchQuery: '',
    priorities: [],
    status: 'all'
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Task CRUD operations
  const addTask = (newTask) => {
    setTasks([...tasks, {
      ...newTask,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString()
    }]);
    setShowModal(false);
    setSelectedTask(null);
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { 
          ...task, 
          completed: !task.completed,
          completedAt: !task.completed ? new Date().toISOString() : null
        };
      }
      return task;
    }));
  };

  const deleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask(null);
      }
    }
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setShowModal(false);
    setSelectedTask(null);
  };

  const getFilteredTasks = () => {
  let filteredTasks = [...tasks];
  const { searchQuery, priorities, status } = filters;

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredTasks = filteredTasks.filter(task => (
      task.title.toLowerCase().includes(query) || 
      (task.description && task.description.toLowerCase().includes(query))
    ));
  }

  // Apply priority filter
  if (priorities.length > 0) {
    filteredTasks = filteredTasks.filter(task => (
      priorities.includes(task.priority)
    ));
  }

  // Apply status filter
  if (status === 'completed') {
    filteredTasks = filteredTasks.filter(task => task.completed);
  } else if (status === 'incomplete') {
    filteredTasks = filteredTasks.filter(task => !task.completed);
  }

  return filteredTasks;
};

  // Get high priority tasks (Critical, Urgent, High Priority)
  const getHighPriorityTasks = () => {
    return tasks.filter(task => 
      ['Critical', 'Urgent', 'High Priority'].includes(task.priority) && !task.completed
    );
  };

  // Get completed tasks
  const getCompletedTasks = () => {
    return tasks.filter(task => task.completed);
  };

  // Handle view changes
  const handleViewChange = (view) => {
    setCurrentView(view);
    setSelectedTask(null);
  };

  // Open task detail
  const openTaskDetail = (task) => {
    setSelectedTask(task);
  };

  // Close task detail
  const closeTaskDetail = () => {
    setSelectedTask(null);
  };

  // Open edit modal
  const openEditModal = () => {
    setShowModal(true);
  };

  return (
    <div className="app-container">
      <header className="header">
        <button 
          className="add-task-btn-header" 
          onClick={() => setShowModal(true)}
        >
          +
        </button>
        <h1>Scottie's Landscaping Co. Task Manager</h1>
        <button style={{backgroundColor: 'lightblue'}}>
        <h3>User Manual</h3>
        </button>
      </header>

      <Navigation 
        currentView={currentView} 
        onViewChange={handleViewChange} 
      />

      {showModal && (
        <TaskForm 
          task={selectedTask}
          onSave={selectedTask ? updateTask : addTask}
          onCancel={() => {
            setShowModal(false);
            setSelectedTask(null);
          }}
        />
      )}

      {selectedTask && (
        <TaskDetail 
          task={selectedTask}
          onToggleComplete={() => {
            toggleTaskComplete(selectedTask.id);
            closeTaskDetail();
          }}
          onEdit={openEditModal}
          onDelete={() => {
            deleteTask(selectedTask.id);
            closeTaskDetail();
          }}
          onClose={closeTaskDetail}
        />
      )}

      <div className="screen-container">
        {currentView === 'main' && (
          <div className="screen active">
            <Filters 
              filters={filters}
              onChange={setFilters}
            />
            <TaskList 
              tasks={getFilteredTasks()}
              onTaskClick={openTaskDetail}
              onToggleComplete={toggleTaskComplete}
              onDelete={deleteTask}
            />
          </div>
        )}

        {currentView === 'highPriority' && (
          <div className="screen active">
            <TaskList 
              tasks={getHighPriorityTasks()}
              onTaskClick={openTaskDetail}
              onToggleComplete={toggleTaskComplete}
              onDelete={deleteTask}
              showPriorityOnly={true}
            />
          </div>
        )}

        {currentView === 'completed' && (
          <div className="screen active">
            <TaskList 
              tasks={getCompletedTasks()}
              onTaskClick={openTaskDetail}
              showCompletionDate={true}
            />
          </div>
        )}

        {currentView === 'stats' && (
          <div className="screen active">
            <StatsView tasks={tasks} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
