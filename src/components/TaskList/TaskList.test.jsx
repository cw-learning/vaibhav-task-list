import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';

describe('TaskList', () => {
  it('renders the task list heading', () => {
    render(<TaskList />);
    expect(screen.getByText('Task List')).toBeInTheDocument();
  });

  it('shows empty state when no tasks', () => {
    render(<TaskList />);
    expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument();
  });

  it('adds a new task when Add button is clicked', () => {
    render(<TaskList />);
    const input = screen.getByPlaceholderText('Add a new task...');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  it('adds task on Enter key press', () => {
    render(<TaskList />);
    const input = screen.getByPlaceholderText('Add a new task...');

    fireEvent.change(input, { target: { value: 'Another Task' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByText('Another Task')).toBeInTheDocument();
  });

  it('clears input after adding task', () => {
    render(<TaskList />);
    const input = screen.getByPlaceholderText('Add a new task...');

    fireEvent.change(input, { target: { value: 'Task' } });
    fireEvent.click(screen.getByText('Add'));

    expect(input.value).toBe('');
  });

  it('does not add empty tasks', () => {
    render(<TaskList />);
    const addButton = screen.getByText('Add');

    fireEvent.click(addButton);

    expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument();
  });

  it('displays task count', () => {
    render(<TaskList />);
    const input = screen.getByPlaceholderText('Add a new task...');

    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(screen.getByText('Add'));

    expect(screen.getByText('0 of 1 completed')).toBeInTheDocument();
  });
});