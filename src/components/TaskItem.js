// src/components/TaskItem.js
import { useContext, useState } from 'react';
import TaskContext from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const { deleteTask, updateTask } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  });

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task._id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedTask({
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
    });
  };

  const handleChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(task._id, updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'in-progress':
        return 'bg-warning';
      default:
        return 'bg-info';
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        {!isEditing ? (
          <>
            <h5 className="mb-0">{task.title}</h5>
            <div>
              <span className={`badge ${getStatusClass(task.status)} me-2`}>
                {task.status}
              </span>
              <button className="btn btn-sm btn-outline-primary me-2" onClick={handleEdit}>
                Edit
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </>
        ) : (
          <h5 className="mb-0">Edit Task</h5>
        )}
      </div>
      <div className="card-body">
        {!isEditing ? (
          <>
            <p className="card-text">{task.description}</p>
            {task.dueDate && (
              <p className="card-text">
                <small className="text-muted">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </small>
              </p>
            )}
          </>
        ) : (
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
                value={updatedTask.title}
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
                value={updatedTask.description}
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
                value={updatedTask.status}
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
                value={updatedTask.dueDate}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TaskItem;