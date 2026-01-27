import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('should render progress bar', () => {
    const { container } = render(<ProgressBar value={50} />);
    const progressBar = container.querySelector('[role="progressbar"]');
    expect(progressBar).toBeInTheDocument();
  });

  it('should display correct percentage', () => {
    render(<ProgressBar value={75} max={100} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('should display label', () => {
    render(<ProgressBar value={50} label="Loading" />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should hide percentage when showPercentage is false', () => {
    render(<ProgressBar value={50} showPercentage={false} />);
    expect(screen.queryByText('50%')).not.toBeInTheDocument();
  });

  it('should handle edge cases', () => {
    const { rerender } = render(<ProgressBar value={0} />);
    expect(screen.getByText('0%')).toBeInTheDocument();

    rerender(<ProgressBar value={100} />);
    expect(screen.getByText('100%')).toBeInTheDocument();

    rerender(<ProgressBar value={150} max={100} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('should calculate percentage correctly with custom max', () => {
    render(<ProgressBar value={25} max={50} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('should set correct aria attributes', () => {
    const { container } = render(<ProgressBar value={60} max={100} />);
    const progressBar = container.querySelector('[role="progressbar"]');
    
    expect(progressBar).toHaveAttribute('aria-valuenow', '60');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });
});