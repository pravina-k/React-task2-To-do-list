// src/App.js

import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isCompleteButtonClicked, setCompleteButtonClicked] = useState(false);
  const addTask = () => {
    if (newTask.trim() !== '') {
      if (editingTaskId !== null) {
        setTasks(tasks.map(task => (task.id === editingTaskId ? { ...task, text: newTask } : task)));
        setEditingTaskId(null);
      } else {
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      }

      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
    setCompleteButtonClicked(true);
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setNewTask(taskToEdit.text);
    setEditingTaskId(taskId);
  };

  return (
    <div className="App">
      <h1>Track   my   Task</h1>
      <div>
        <input
          type="text"
          placeholder="Enter task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button id="addtaskbutton" onClick={addTask}>{editingTaskId !== null ? 'Update Task' : 'Add Task'}</button>
      </div>
      <ul>
      {tasks.map(task => (
  <li key={task.id}>
    <span id="taskname" className={`taskText ${task.completed ? 'completed' : ''}`}>{task.text}</span>
    {/* Add spacing here */}
    <span className="space" />
    {/* Adjust the class "space" in your CSS for desired spacing */}
    <button
            id="completebutton"
            className={`${isCompleteButtonClicked ? 'completedButton' : ''}`}
            onClick={() => toggleComplete(task.id)}
          >
            {task.completed ? '✔ ' : 'Complete'}
          </button>
    <button id="editbutton" onClick={() => editTask(task.id)}>✎ Edit</button>
    <button id="deletebutton" onClick={() => deleteTask(task.id)}>🗑 Delete</button>
  </li>
))}



      </ul>
    </div>
  );
};

export default App;
