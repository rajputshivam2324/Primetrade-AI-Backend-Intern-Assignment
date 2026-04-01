import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import toast from 'react-hot-toast';
import { HiOutlinePlus, HiOutlineFilter, HiOutlineRefresh } from 'react-icons/hi';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filterStatus) params.status = filterStatus;
      if (filterPriority) params.priority = filterPriority;

      const { data } = await API.get('/tasks', { params });
      setTasks(data.data);
    } catch (err) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filterStatus, filterPriority]);

  const handleCreate = async (formData) => {
    try {
      await API.post('/tasks', formData);
      toast.success('Task created!');
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await API.put(`/tasks/${editingTask._id}`, formData);
      toast.success('Task updated!');
      setEditingTask(null);
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await API.delete(`/tasks/${id}`);
      toast.success('Task deleted!');
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="subtitle">
            {isAdmin ? 'Viewing all tasks (Admin)' : 'Your personal tasks'}
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => { setEditingTask(null); setShowForm(true); }}
          id="create-task-btn"
        >
          <HiOutlinePlus /> New Task
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-card pending">
          <span className="stat-number">{stats.pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card in-progress">
          <span className="stat-number">{stats.inProgress}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card completed">
          <span className="stat-number">{stats.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <HiOutlineFilter />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            id="filter-status"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            id="filter-priority"
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button className="btn btn-ghost" onClick={fetchTasks} id="refresh-tasks">
          <HiOutlineRefresh /> Refresh
        </button>
      </div>

      {/* Task List */}
      {loading ? (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <h3>No tasks found</h3>
          <p>Create your first task to get started!</p>
          <button
            className="btn btn-primary"
            onClick={() => { setEditingTask(null); setShowForm(true); }}
          >
            <HiOutlinePlus /> Create Task
          </button>
        </div>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdate : handleCreate}
          onClose={closeForm}
        />
      )}
    </div>
  );
};

export default Dashboard;
