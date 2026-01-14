import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from '../TaskCard/TaskCard.jsx';

describe('TaskCard', () => {
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
    render(<TaskCard task={mockTask} {...mockHandlers} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('calls onToggle when checkbox is clicked', () => {
    render(<TaskCard task={mockTask} {...mockHandlers} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockHandlers.onToggle).toHaveBeenCalledWith(1);
  });

  it('enters edit mode with textarea', () => {
    render(<TaskCard task={mockTask} {...mockHandlers} />);
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
  });

  it('saves edited task', () => {
    render(<TaskCard task={mockTask} {...mockHandlers} />);
    fireEvent.click(screen.getByText('Edit'));
    const textarea = screen.getByDisplayValue('Test Task');
    fireEvent.change(textarea, { target: { value: 'Updated' } });
    fireEvent.click(screen.getByText('Save'));
    expect(mockHandlers.onEdit).toHaveBeenCalledWith(1, 'Updated');
  });
});