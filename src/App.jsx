import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import TaskList from './components/TaskList/TaskList.jsx';
import TaskListGrid from './components/TaskListGrid/TaskListGrid.jsx';

function App() {

  return (
    <div className="min-h-screen">
      <TaskListGrid />
    </div>
  );
}

export default App;