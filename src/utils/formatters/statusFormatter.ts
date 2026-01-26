import { type TaskStatus, STATUS_DISPLAY_TEXT } from '@constants/status';

const isTaskStatus = (value: string) =>
  Object.prototype.hasOwnProperty.call(STATUS_DISPLAY_TEXT, value);

export const getStatusDisplayText = (status: TaskStatus): string => {
  return isTaskStatus(status) ? STATUS_DISPLAY_TEXT[status] : 'Unknown';
};