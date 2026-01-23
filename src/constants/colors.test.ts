// src/constants/colors.test.ts
import { describe, it, expect } from 'vitest';
import { TASK_STATUS, type TaskStatus } from './status';
import { STATUS_COLORS, STATUS_BG_COLORS } from './colors';

describe('status constants', () => {
  it('exposes stable task status values', () => {
    expect(TASK_STATUS).toEqual({
      NOT_STARTED: 'not-started',
      IN_PROGRESS: 'in-progress',
      COMPLETED: 'completed',
    });
  });

  it('provides colors for every task status', () => {
    for (const status of Object.values(TASK_STATUS) as TaskStatus[]) {
      expect(STATUS_COLORS[status]).toBeTruthy();
      expect(STATUS_BG_COLORS[status]).toBeTruthy();
    }
  });
});