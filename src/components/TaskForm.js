// src/components/TaskForm.js
import { useState, useContext } from 'react';
import TaskContext from '../context/TaskContext';

const TaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: ''
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask(task);
      setTask({
        title: '',
        description: '',
        status: 'pending',
        dueDate: ''
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="mb-4">
      {!showForm ? (
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Add New Task
        </button>
      ) : (
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Add New Task</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={task.description}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  value={task.status}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="dueDate" className="form-label">
                  Due Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dueDate"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskForm;

