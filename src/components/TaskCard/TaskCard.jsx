import { useState } from 'react';

export default function TaskCard({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSave = () => {
    if (editedTitle.trim()) {
      onEdit(task.id, editedTitle);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setIsEditing(false);
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1">
      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="3"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 px-3 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-3 mb-4">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
            />
            <p className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </p>
          </div>
          
          <div className="flex gap-2 pt-3 border-t border-gray-100">
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 font-medium"
              aria-label={`Edit ${task.title}`}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="flex-1 px-3 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 font-medium"
              aria-label={`Delete ${task.title}`}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}