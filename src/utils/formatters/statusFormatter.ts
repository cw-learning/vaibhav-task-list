import { TASK_STATUS, type TaskStatus } from '@constants/status';

const STATUS_DISPLAY_TEXT = {
  [TASK_STATUS.NOT_STARTED]: 'Not Started',
  [TASK_STATUS.IN_PROGRESS]: 'In Progress',
  [TASK_STATUS.COMPLETED]: 'Completed',
} as const satisfies Record<TaskStatus, string>;

const isTaskStatus = (value: string): value is TaskStatus =>
  Object.prototype.hasOwnProperty.call(STATUS_DISPLAY_TEXT, value);

export const getStatusDisplayText = (status: TaskStatus | string): string => {
  return isTaskStatus(status) ? STATUS_DISPLAY_TEXT[status] : 'Unknown';
};