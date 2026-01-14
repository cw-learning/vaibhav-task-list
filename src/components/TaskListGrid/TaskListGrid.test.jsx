import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskListGrid from './TaskListGrid';

describe('TaskListGrid', () => {
  it('renders the task lists heading', () => {
    render(<TaskListGrid />);
    expect(screen.getByText('Task Lists')).toBeInTheDocument();
  });

  it('renders default task lists', () => {
    render(<TaskListGrid />);
    expect(screen.getByText('Daily Work Tasks')).toBeInTheDocument();
    expect(screen.getByText('Shopping List')).toBeInTheDocument();
  });

  it('adds a new task list', () => {
    render(<TaskListGrid />);
    const input = screen.getByPlaceholderText('Create a new task list...');
    
    fireEvent.change(input, { target: { value: 'New List' } });
    fireEvent.click(screen.getByText('Add List'));

    expect(screen.getByText('New List')).toBeInTheDocument();
  });

  it('clears input after adding list', () => {
    render(<TaskListGrid />);
    const input = screen.getByPlaceholderText('Create a new task list...');
    
    fireEvent.change(input, { target: { value: 'New List' } });
    fireEvent.click(screen.getByText('Add List'));

    expect(input).toHaveValue('');
  });

  it('displays grid layout', () => {
    const { container } = render(<TaskListGrid />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
  });
});