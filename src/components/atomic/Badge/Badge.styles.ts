import { BadgeProps } from './Badge.types';

const BASE_STYLES = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';

const VARIANT_STYLES: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
};

export const getBadgeStyles = (variant: BadgeProps['variant'] = 'default'): string => {
  return `${BASE_STYLES} ${VARIANT_STYLES[variant]}`.trim();
};