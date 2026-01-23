import { describe, it, expect } from 'vitest';
import { getStatusDisplayText } from './statusFormatter';
import { TASK_STATUS } from '@constants/status';

describe('getStatusDisplayText', () => {
  it('should return "Not Started" for not-started status', () => {
    expect(getStatusDisplayText(TASK_STATUS.NOT_STARTED)).toBe('Not Started');
  });

  it('should return "In Progress" for in-progress status', () => {
    expect(getStatusDisplayText(TASK_STATUS.IN_PROGRESS)).toBe('In Progress');
  });

  it('should return "Completed" for completed status', () => {
    expect(getStatusDisplayText(TASK_STATUS.COMPLETED)).toBe('Completed');
  });

  it('should return "Unknown" for invalid status', () => {
    expect(getStatusDisplayText('invalid')).toBe('Unknown');
  });
});