export const CHECKBOX_CONTAINER_STYLES = 'flex items-center gap-3 cursor-pointer group';

export const CHECKBOX_INPUT_STYLES = 'w-4 h-4 accent-blue-600 cursor-pointer rounded border-gray-300 focus:ring-2 focus:ring-blue-500';

export const getCheckboxLabelStyles = (checked: boolean): string => {
  return checked
    ? 'line-through text-gray-400 transition-colors'
    : 'text-gray-800 transition-colors';
};

export const DISABLED_STYLES = 'opacity-50 cursor-not-allowed';