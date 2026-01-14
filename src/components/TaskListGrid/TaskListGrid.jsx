import { useState } from 'react';
import TaskList from '../TaskList/TaskList.jsx';

export default function TaskListGrid() {
  const [taskLists, setTaskLists] = useState([
    {
      id: 1,
      title: 'Daily Work Tasks',
      status: 'in-progress',
      items: [
        { id: 1, title: 'Finish UI design', completed: false },
        { id: 2, title: 'Setup project structure', completed: true },
        { id: 3, title: 'Install dependencies', completed: true },
        { id: 4, title: 'Connect API', completed: false },
        { id: 5, title: 'Write tests', completed: false },
        { id: 6, title: 'Deploy to staging', completed: true },
        { id: 7, title: 'Review code', completed: false },
        { id: 8, title: 'Update documentation', completed: false },
      ],
    },
    {
      id: 2,
      title: 'Shopping List',
      status: 'completed',
      items: [
        { id: 1, title: 'Buy groceries', completed: true },
        { id: 2, title: 'Get milk', completed: true },
        { id: 3, title: 'Buy bread', completed: true },
        { id: 4, title: 'Get eggs', completed: true },
        { id: 5, title: 'Buy vegetables', completed: true },
      ],
    },
  ]);

  const [newListTitle, setNewListTitle] = useState('');

  // Helper function to calculate status based on items
  const calculateStatus = (items) => {
    if (items.length === 0) return 'not-started';
    const allCompleted = items.every(item => item.completed);
    return allCompleted ? 'completed' : 'in-progress';
  };

  const addTaskList = () => {
    if (newListTitle.trim()) {
      const newList = {
        id: Date.now(),
        title: newListTitle.trim(),
        status: 'not-started',
        items: [],
      };
      setTaskLists([...taskLists, newList]);
      setNewListTitle('');
    }
  };

  const toggleItem = (listId, itemId) => {
    setTaskLists(taskLists.map(list => {
      if (list.id === listId) {
        const updatedItems = list.items.map(item =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        
        return {
          ...list,
          status: calculateStatus(updatedItems),
          items: updatedItems,
        };
      }
      return list;
    }));
  };

  const markAsDone = (listId) => {
    setTaskLists(taskLists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          status: 'completed',
          items: list.items.map(item => ({ ...item, completed: true })),
        };
      }
      return list;
    }));
  };

  const deleteTaskList = (listId) => {
    setTaskLists(taskLists.filter(list => list.id !== listId));
  };

  const addItem = (listId, itemTitle) => {
    setTaskLists(taskLists.map(list => {
      if (list.id === listId) {
        const newItem = {
          id: Date.now(),
          title: itemTitle.trim(),
          completed: false,
        };
        
        const updatedItems = [...list.items, newItem];
        
        return {
          ...list,
          status: calculateStatus(updatedItems),
          items: updatedItems,
        };
      }
      return list;
    }));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Task Lists</h1>

        {/* Add new list */}
        <div className="mb-6 flex gap-2 max-w-md">
          <input
            type="text"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTaskList()}
            placeholder="Create a new task list..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTaskList}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Add List
          </button>
        </div>

        {/* Grid of task lists */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {taskLists.map(taskList => (
            <TaskList
              key={taskList.id}
              taskList={taskList}
              onToggleItem={toggleItem}
              onMarkAsDone={markAsDone}
              onDelete={deleteTaskList}
              onAddItem={addItem}
            />
          ))}
        </div>

        {taskLists.length === 0 && (
          <p className="text-center text-gray-500 py-16">
            No task lists yet. Create one to get started!
          </p>
        )}
      </div>
    </div>
  );
}