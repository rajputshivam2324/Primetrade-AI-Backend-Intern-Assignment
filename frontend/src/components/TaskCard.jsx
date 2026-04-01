import { HiOutlinePencil, HiOutlineTrash, HiOutlineClock, HiOutlineFlag } from 'react-icons/hi';

const statusColors = {
  pending: '#f59e0b',
  'in-progress': '#3b82f6',
  completed: '#10b981',
};

const priorityColors = {
  low: '#6b7280',
  medium: '#f59e0b',
  high: '#ef4444',
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-actions">
          <button
            className="icon-btn edit"
            onClick={() => onEdit(task)}
            title="Edit task"
            id={`edit-task-${task._id}`}
          >
            <HiOutlinePencil />
          </button>
          <button
            className="icon-btn delete"
            onClick={() => onDelete(task._id)}
            title="Delete task"
            id={`delete-task-${task._id}`}
          >
            <HiOutlineTrash />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <span
          className="task-badge status"
          style={{ backgroundColor: statusColors[task.status] + '20', color: statusColors[task.status] }}
        >
          <HiOutlineClock />
          {task.status}
        </span>
        <span
          className="task-badge priority"
          style={{ backgroundColor: priorityColors[task.priority] + '20', color: priorityColors[task.priority] }}
        >
          <HiOutlineFlag />
          {task.priority}
        </span>
      </div>

      <div className="task-footer">
        <span className="task-date">{formatDate(task.createdAt)}</span>
        {task.user?.name && (
          <span className="task-owner">by {task.user.name}</span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
