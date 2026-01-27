export const CONTAINER_STYLES = 'w-full';

export const LABEL_CONTAINER_STYLES = 'flex justify-between items-center mb-1';

export const LABEL_TEXT_STYLES = 'text-sm font-medium text-gray-700';

export const PERCENTAGE_STYLES = 'text-sm text-gray-600';

export const BAR_BACKGROUND_STYLES = 'w-full bg-gray-200 rounded-full h-2 overflow-hidden';

export const BAR_FILL_STYLES = 'h-full bg-blue-600 transition-all duration-300 ease-in-out';

export const getProgressPercentage = (value: number, max: number): number => {
  if (max <= 0) return 0;
  const percentage = (value / max) * 100;
  return Math.min(Math.max(percentage, 0), 100);
};