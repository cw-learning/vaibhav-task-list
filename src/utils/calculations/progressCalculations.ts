export interface TaskItem {
  id: string | number;
  completed: boolean;
}

export interface ItemCounts {
  total: number;
  completed: number;
  pending: number;
  percentage: number;
}

/**
 * Calculates item counts and progress percentage
 * @param {TaskItem[]} items - Array of task items
 * @returns {ItemCounts} Object containing total, completed, pending, and percentage
 */
export const calculateItemCounts = (items: TaskItem[] = []): ItemCounts => {
  const total = items.length;
  const completed = items.filter((item) => item.completed).length;
  const pending = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    total,
    completed,
    pending,
    percentage,
  };
};