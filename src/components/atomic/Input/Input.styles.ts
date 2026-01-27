export const CONTAINER_STYLES = 'flex flex-col gap-1';

export const LABEL_STYLES = 'text-sm font-medium text-gray-700';

export const INPUT_BASE_STYLES = 'px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors';

export const INPUT_NORMAL_STYLES = 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';

export const INPUT_ERROR_STYLES = 'border-red-500 focus:ring-red-500 focus:border-red-500';

export const ERROR_TEXT_STYLES = 'text-sm text-red-600';

export const getInputStyles = (hasError: boolean): string => {
  return `${INPUT_BASE_STYLES} ${hasError ? INPUT_ERROR_STYLES : INPUT_NORMAL_STYLES}`.trim();
};