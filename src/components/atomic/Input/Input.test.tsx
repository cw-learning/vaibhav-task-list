import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('should render input with label', () => {
    render(<Input label="Username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('should display error message', () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('should handle value changes', () => {
    const handleChange = vi.fn();
    render(<Input label="Name" onChange={handleChange} />);
    
    const input = screen.getByLabelText('Name');
    fireEvent.change(input, { target: { value: 'John' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should render without label', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<Input label="Test" className="custom-input" />);
    const input = screen.getByLabelText('Test');
    expect(input.className).toContain('custom-input');
  });

  it('should apply error styles when error is present', () => {
    render(<Input label="Email" error="Required" />);
    const input = screen.getByLabelText('Email');
    expect(input.className).toContain('border-red-500');
  });
});