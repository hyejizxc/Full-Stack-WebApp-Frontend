// src/context/TaskContext.js
import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { user } = useContext(AuthContext);

  // API base URL
  const API_URL = 'http://localhost:5000/api/tasks';

  // Get all tasks
  const getTasks = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.get(API_URL, config);
      setTasks(data);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
      setLoading(false);
    }
  };

  // Add task
  const addTask = async (task) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.post(API_URL, task, config);
      setTasks([...tasks, data]);
      return data;
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
      throw error;
    }
  };

  // Update task
  const updateTask = async (id, task) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.put(`${API_URL}/${id}`, task, config);
      setTasks(tasks.map(t => (t._id === id ? data : t)));
      return data;
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
      throw error;
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      await axios.delete(`${API_URL}/${id}`, config);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
      throw error;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        getTasks,
        addTask,
        updateTask,
        deleteTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
