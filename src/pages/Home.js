// src/pages/Home.js
import { useContext, useEffect } from 'react';
import TaskContext from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import ErrorBoundary from '../components/ErrorBoundary';

const Home = () => {
  const { tasks, loading, getTasks } = useContext(TaskContext);

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">My Tasks</h1>
      <ErrorBoundary>
        <TaskForm />
        
        {tasks.length === 0 ? (
          <div className="alert alert-info" role="alert">
            No tasks found. Add a new task to get started!
          </div>
        ) : (
          <div>
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default Home;
