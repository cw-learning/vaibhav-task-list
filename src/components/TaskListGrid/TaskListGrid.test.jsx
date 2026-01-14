import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskListGrid from './TaskListGrid';

describe('TaskListGrid', () => {
  it('renders the task grid heading', () => {
    render(<TaskListGrid />);
    expect(screen.getByText('Task Grid')).toBeInTheDocument();
  });

  it('shows empty state when no tasks', () => {
    render(<TaskListGrid />);
    expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument();
  });

  it('adds a new task', () => {
    render(<TaskListGrid />);
    const input = screen.getByPlaceholderText('Add a new task...');
    
    fireEvent.change(input, { target: { value: 'Grid Task' } });
    fireEvent.click(screen.getByText('Add'));

    expect(screen.getByText('Grid Task')).toBeInTheDocument();
  });

  it('displays grid layout class', () => {
    render(<TaskListGrid />);
    const input = screen.getByPlaceholderText('Add a new task...');
    
    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(screen.getByText('Add'));

    const grid = screen.getByText('Task 1').closest('.grid');
    expect(grid).toHaveClass('grid');
  });
});