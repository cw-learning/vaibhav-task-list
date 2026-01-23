import { TASK_STATUS, TaskStatus } from '@constants/status';

/**
 * Converts task status to human-readable text
 * @param {TaskStatus} status - The task status
 * @returns {string} Display text for the status
 */
export const getStatusDisplayText = (status: TaskStatus): string => {
  const statusMap: Record<TaskStatus, string> = {
    [TASK_STATUS.NOT_STARTED]: 'Not Started',
    [TASK_STATUS.IN_PROGRESS]: 'In Progress',
    [TASK_STATUS.COMPLETED]: 'Completed',
  };

  return statusMap[status] ?? 'Unknown';
};