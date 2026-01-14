import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';

describe('TaskItem', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    completed: false,
  };

  const mockHandlers = {
    onToggle: vi.fn(),
    onDelete: vi.fn(),
    onEdit: vi.fn(),
  };

  it('renders task title', () => {
    render(<TaskItem task={mockTask} {...mockHandlers} />);
    expect(screen.getByText('Test Task')).toBeDefined();
  });

  it('calls onToggle when checkbox is clicked', () => {
    render(<TaskItem task={mockTask} {...mockHandlers} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockHandlers.onToggle).toHaveBeenCalledWith(1);
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<TaskItem task={mockTask} {...mockHandlers} />);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(1);
  });

  it('enters edit mode when edit button is clicked', () => {
    render(<TaskItem task={mockTask} {...mockHandlers} />);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    expect(screen.getByDisplayValue('Test Task')).toBeDefined();
    expect(screen.getByText('Save')).toBeDefined();
  });

  it('calls onEdit when save is clicked with new title', () => {
    render(<TaskItem task={mockTask} {...mockHandlers} />);
    fireEvent.click(screen.getByText('Edit'));
    const input = screen.getByDisplayValue('Test Task');
    fireEvent.change(input, { target: { value: 'Updated Task' } });
    fireEvent.click(screen.getByText('Save'));
    expect(mockHandlers.onEdit).toHaveBeenCalledWith(1, 'Updated Task');
  });

  it('applies line-through style when task is completed', () => {
    const completedTask = { ...mockTask, completed: true };
    render(<TaskItem task={completedTask} {...mockHandlers} />);
    const title = screen.getByText('Test Task');
    expect(title.className).toContain('line-through');
  });
});