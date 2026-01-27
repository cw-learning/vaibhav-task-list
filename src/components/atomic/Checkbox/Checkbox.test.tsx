import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('should render checkbox with label', () => {
    render(<Checkbox label="Test Label" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should handle checked state', () => {
    render(<Checkbox label="Test" checked />);
    const checkbox = screen.getByLabelText('Test') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('should call onChange when clicked', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Test" onChange={handleChange} />);
    
    fireEvent.click(screen.getByLabelText('Test'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Test" onChange={handleChange} disabled />);
    
    fireEvent.click(screen.getByLabelText('Test'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should render without label', () => {
    const { container } = render(<Checkbox checked />);
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
  });

  it('should apply strike-through style when checked', () => {
    render(<Checkbox label="Test" checked />);
    const label = screen.getByText('Test');
    expect(label.className).toContain('line-through');
  });
});