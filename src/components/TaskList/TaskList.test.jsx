import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';

describe('TaskList', () => {
  const mockTaskList = {
    id: 1,
    title: 'Daily Tasks',
    status: 'in-progress',
    items: [
      { id: 1, title: 'Task 1', completed: true },
      { id: 2, title: 'Task 2', completed: false },
      { id: 3, title: 'Task 3', completed: false },
    ],
  };

  const mockHandlers = {
    onToggleItem: vi.fn(),
    onMarkAsDone: vi.fn(),
    onDelete: vi.fn(),
  };

  it('renders task list title and id', () => {
    render(<TaskList taskList={mockTaskList} {...mockHandlers} />);
    expect(screen.getByText('Daily Tasks')).toBeInTheDocument();
    expect(screen.getByText('#1')).toBeInTheDocument();
  });

  it('displays correct item counts', () => {
    render(<TaskList taskList={mockTaskList} {...mockHandlers} />);
    expect(screen.getByText('1')).toBeInTheDocument(); // completed
    expect(screen.getByText('2')).toBeInTheDocument(); // pending
  });

  it('opens modal when title is clicked', () => {
    render(<TaskList taskList={mockTaskList} {...mockHandlers} />);
    fireEvent.click(screen.getByText('Daily Tasks'));
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('calls onMarkAsDone when button is clicked', () => {
    render(<TaskList taskList={mockTaskList} {...mockHandlers} />);
    fireEvent.click(screen.getByText('Mark as Done'));
    expect(mockHandlers.onMarkAsDone).toHaveBeenCalledWith(1);
  });

  it('displays progress bar with correct width', () => {
    const { container } = render(<TaskList taskList={mockTaskList} {...mockHandlers} />);
    const progressBar = container.querySelector('[style*="width"]');
    expect(progressBar?.style.width).toBe('33.33333333333333%');
  });

  it('shows completed badge for completed lists', () => {
    const completedList = { ...mockTaskList, status: 'completed' };
    render(<TaskList taskList={completedList} {...mockHandlers} />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });
});