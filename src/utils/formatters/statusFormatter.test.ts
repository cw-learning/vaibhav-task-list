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

  it('should return "Unknown" for empty string', () => {
    expect(getStatusDisplayText('')).toBe('Unknown');
  });

  it('should return "Unknown" for similar but invalid status', () => {
    expect(getStatusDisplayText('not-started-invalid')).toBe('Unknown');
    expect(getStatusDisplayText('in-progress2')).toBe('Unknown');
    expect(getStatusDisplayText('completed-extra')).toBe('Unknown');
  });
});