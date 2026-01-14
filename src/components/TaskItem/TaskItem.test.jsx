import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';

describe('TaskItem', () => {
  const mockItem = {
    id: 1,
    title: 'Test Item',
    completed: false,
  };

  it('renders item title', () => {
    const onToggle = vi.fn();
    render(<TaskItem item={mockItem} onToggle={onToggle} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('calls onToggle when checkbox is clicked', () => {
    const onToggle = vi.fn();
    render(<TaskItem item={mockItem} onToggle={onToggle} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onToggle).toHaveBeenCalledWith(1);
  });

  it('applies line-through when completed', () => {
    const completedItem = { ...mockItem, completed: true };
    const onToggle = vi.fn();
    render(<TaskItem item={completedItem} onToggle={onToggle} />);
    const title = screen.getByText('Test Item');
    expect(title).toHaveClass('line-through');
  });

  it('checkbox is checked when item is completed', () => {
    const completedItem = { ...mockItem, completed: true };
    const onToggle = vi.fn();
    render(<TaskItem item={completedItem} onToggle={onToggle} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});