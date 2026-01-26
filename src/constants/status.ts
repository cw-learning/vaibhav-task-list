export const TASK_STATUS = {
  NOT_STARTED: 'not-started',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
} as const;

export type TaskStatus = typeof TASK_STATUS[keyof typeof TASK_STATUS];

export const STATUS_DISPLAY_TEXT: Record<TaskStatus, string> = {
  [TASK_STATUS.NOT_STARTED]: 'Not Started',
  [TASK_STATUS.IN_PROGRESS]: 'In Progress',
  [TASK_STATUS.COMPLETED]: 'Completed',
};

export const TASK_STATUS_CONFIG = {
  'not-started': {
    key: 'NOT_STARTED',
    displayText: 'Not Started',
    color: '#6B7280',
    bgColor: '#F3F4F6',
    badgeClass: 'bg-gray-100 text-gray-700',
  },
  'in-progress': {
    key: 'IN_PROGRESS',
    displayText: 'In Progress',
    color: '#3B82F6',
    bgColor: '#DBEAFE',
    badgeClass: 'bg-yellow-100 text-yellow-700',
  },
  'completed': {
    key: 'COMPLETED',
    displayText: 'Completed',
    color: '#10B981',
    bgColor: '#D1FAE5',
    badgeClass: 'bg-green-100 text-green-700',
  },
} as const;

export type TaskStatusConfig = typeof TASK_STATUS_CONFIG[keyof typeof TASK_STATUS_CONFIG];