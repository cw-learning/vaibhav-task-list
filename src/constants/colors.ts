import { TASK_STATUS, type TaskStatus } from '@constants/status';

export const STATUS_COLORS: Record<TaskStatus, string> = {
  [TASK_STATUS.NOT_STARTED]: '#6B7280',
  [TASK_STATUS.IN_PROGRESS]: '#3B82F6',
  [TASK_STATUS.COMPLETED]: '#10B981',
} as const;

export const STATUS_BG_COLORS: Record<TaskStatus, string> = {
  [TASK_STATUS.NOT_STARTED]: '#F3F4F6',
  [TASK_STATUS.IN_PROGRESS]: '#DBEAFE',
  [TASK_STATUS.COMPLETED]: '#D1FAE5',
} as const;