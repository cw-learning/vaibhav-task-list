import { useState, useMemo } from 'react';
import TaskList from '../TaskList/TaskList.jsx';
import { useTaskLists } from '../../hooks/useTaskLists';

//Ag grid imports
import { AgGridReact } from 'ag-grid-react';
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  ValidationModule,
  PaginationModule,
  themeMaterial,
  AllCommunityModule
} from "ag-grid-community";
import { MasterDetailModule, SetFilterModule  } from "ag-grid-enterprise";

// Register all Community features
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MasterDetailModule,
  PaginationModule,
  AllCommunityModule,
  SetFilterModule,
  ...(!import.meta.env.PROD ? [ValidationModule] : []),
]);
const PAGINATION = true;
const PAGINATION_PAGE_SIZE = 5;
const PAGINATION_PAGE_SIZE_SELECTOR = [5, 10, 20];

export default function TaskListGrid() {
  const { taskLists, setTaskLists, loading, error } = useTaskLists();
  const [newListTitle, setNewListTitle] = useState('');

  const columnDefs = useMemo(() => [
  { field: 'id', cellRenderer: 'agGroupCellRenderer' },
  { field: 'title', flex: 2 },
  { field: 'status', filter: 'agSetColumnFilter' },
  {
    field: 'totalItems',
    valueGetter: ({ data }) => (data?.items?.length ?? 0),
  },
  {
    field: 'pendingItems',
    valueGetter: ({ data }) => (data?.items ?? []).filter((item) => !item.completed).length,
  },
  {
    field: 'completedItems',
    valueGetter: ({ data }) => (data?.items ?? []).filter((item) => item.completed).length,
  },
  {
    field: 'progress',
    valueGetter: ({ data }) => {
      const items = data?.items ?? [];
      const total = items.length;
      const completed = items.filter((item) => item.completed).length;
      if (data?.status === 'completed') return '100%';
      return total === 0 ? '0%' : `${Math.round((completed / total) * 100)}%`;
    },
  },
], []);
  
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);
  
  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        pagination: true,
        paginationAutoPageSize: true,
        columnDefs: [
          { field: "id" },
          { field: "title" },
          { field: "completed", valueGetter: (params) => params.data.completed ? 'Yes' : 'No' },
        ],
        defaultColDef: {
          flex: 1,
        }
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.items);
      },
    };
  }, []);

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

  const pagination = true;
  const paginationPageSize = 5;
  const paginationPageSizeSelector = [5, 10, 20];
  return (
    <div className="bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 max-w-full p-8">
      <div className = 'max-w-7xl mx-auto py-5'>
        <h1 className="text-4xl font-bold mb-8 pb-1 text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">AgGrid Summary Table</h1>
        <div className="ag-theme-material custom-grid overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-xl shadow-indigo-100/60 backdrop-blur">
          <AgGridReact
              theme = {themeMaterial}
              rowData={taskLists}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              masterDetail={true}
              detailCellRendererParams={detailCellRendererParams}
              domLayout='autoHeight'
              pagination={PAGINATION}
              paginationPageSize={PAGINATION_PAGE_SIZE}
              paginationPageSizeSelector={PAGINATION_PAGE_SIZE_SELECTOR}
              animateRows={true}
          />
        </div>
    </div>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Task Lists</h1>

        {/* Add new list */}
        <div className="mb-10 flex gap-3 max-w-xl">
          <input
            type="text"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTaskList()}
            placeholder="Create a new task list..."
            className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white placeholder:text-gray-400"
          />
          <button
            onClick={addTaskList}
            className="px-8 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            Add List
          </button>
        </div>

        {/* Loading and error states */}
        {loading && <p className="text-center text-gray-600 py-20 text-lg font-medium animate-pulse">Loading...</p>}
        {error && <p className="text-center text-red-600 py-20 text-lg font-medium bg-red-50 rounded-xl mx-auto max-w-2xl shadow-sm">{error}</p>}

        {/* Grid of task lists */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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

        {taskLists.length === 0 && !loading && (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg font-medium mb-2">
              No task lists yet. Create one to get started!
            </p>
            <p className="text-gray-400 text-sm">
              ✨ Add your first task list above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}