import { describe, it, expect } from 'vitest';
import { calculateItemCounts, TaskItem } from './progressCalculations';

describe('calculateItemCounts', () => {
  it('should return zero counts for empty array', () => {
    const result = calculateItemCounts([]);
    expect(result).toEqual({
      total: 0,
      completed: 0,
      pending: 0,
      percentage: 0,
    });
  });

  it('should calculate counts correctly with mixed items', () => {
    const items: TaskItem[] = [
      { id: 1, completed: true },
      { id: 2, completed: false },
      { id: 3, completed: true },
      { id: 4, completed: false },
    ];

    const result = calculateItemCounts(items);
    expect(result).toEqual({
      total: 4,
      completed: 2,
      pending: 2,
      percentage: 50,
    });
  });

  it('should handle all completed items', () => {
    const items: TaskItem[] = [
      { id: 1, completed: true },
      { id: 2, completed: true },
    ];

    const result = calculateItemCounts(items);
    expect(result).toEqual({
      total: 2,
      completed: 2,
      pending: 0,
      percentage: 100,
    });
  });

  it('should handle all pending items', () => {
    const items: TaskItem[] = [
      { id: 1, completed: false },
      { id: 2, completed: false },
    ];

    const result = calculateItemCounts(items);
    expect(result).toEqual({
      total: 2,
      completed: 0,
      pending: 2,
      percentage: 0,
    });
  });

  it('should handle undefined input', () => {
    const result = calculateItemCounts(undefined);
    expect(result).toEqual({
      total: 0,
      completed: 0,
      pending: 0,
      percentage: 0,
    });
  });
});