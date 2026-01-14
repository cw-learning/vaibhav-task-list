import { useState } from 'react';
import TaskItem from '../TaskItem/TaskItem.jsx';

export default function TaskList({ taskList, onToggleItem, onMarkAsDone, onDelete, onAddItem }) {
  const [showModal, setShowModal] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');

  const completedCount = taskList.items.filter(item => item.completed).length;
  const totalCount = taskList.items.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const pendingCount = totalCount - completedCount;

  const getStatusBadge = () => {
    if (taskList.status === 'completed') {
      return 'bg-green-100 text-green-700';
    } else if (taskList.status === 'in-progress') {
      return 'bg-yellow-100 text-yellow-700';
    }
    return 'bg-gray-100 text-gray-700';
  };

  const getProgressBarColor = () => {
    if (progressPercentage === 100) return 'bg-green-500';
    if (progressPercentage > 50) return 'bg-blue-500';
    return 'bg-blue-500';
  };

  const handleMarkAsDone = () => {
    onMarkAsDone(taskList.id);
  };

  const handleAddItem = () => {
    if (newItemTitle.trim()) {
      onAddItem(taskList.id, newItemTitle);
      setNewItemTitle('');
    }
  };

  return (
    <>
      {/* Card */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-5 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">#{taskList.id}</span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadge()}`}>
            {taskList.status === 'completed' ? 'Completed' : taskList.status === 'in-progress' ? 'In Progress' : 'Not Started'}
          </span>
        </div>

        <h2 
          className="text-lg font-semibold mb-4 cursor-pointer hover:text-blue-600"
          onClick={() => setShowModal(true)}
        >
          {taskList.title}
        </h2>

        {/* Items summary */}
        <div className="text-sm text-gray-600 mb-4">
          Items: <strong>{totalCount}</strong>
          <span className="mx-2 text-gray-400">|</span>
          Done: <strong className="text-green-600">{completedCount}</strong>
          <span className="mx-1 text-gray-400">/</span>
          Pending: <strong className="text-red-500">{pendingCount}</strong>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full ${getProgressBarColor()} rounded-full transition-all`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-2">
          {taskList.status !== 'completed' && (
            <button
              onClick={handleMarkAsDone}
              className="flex-1 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2 transition"
            >
              Mark as Done
            </button>
          )}
          <button
            onClick={() => onDelete(taskList.id)}
            className="text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg px-4 py-2 transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h3 className="text-xl font-semibold">{taskList.title}</h3>
                <p className="text-sm text-gray-500">
                  {taskList.status === 'completed' ? 'Completed' : taskList.status === 'in-progress' ? 'In Progress' : 'Not Started'} · {completedCount} of {totalCount} done
                </p>
              </div>

              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-700 text-3xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Task List */}
            <div className="p-6 space-y-3 overflow-y-auto flex-1">
              {/* Add new item input */}
              <div className="flex gap-2 pb-3 border-b">
                <input
                  type="text"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                  placeholder="Add a new item..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  onClick={handleAddItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
                >
                  Add
                </button>
              </div>

              {/* Items list */}
              {taskList.items.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No items in this list</p>
              ) : (
                taskList.items.map(item => (
                  <TaskItem
                    key={item.id}
                    item={item}
                    onToggle={() => onToggleItem(taskList.id, item.id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}