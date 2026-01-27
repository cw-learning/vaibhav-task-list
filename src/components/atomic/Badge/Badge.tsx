import React from 'react';
import { BadgeProps } from './Badge.types';
import { getBadgeStyles } from './Badge.styles';

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const badgeStyles = getBadgeStyles(variant);

  return (
    <span className={`${badgeStyles} ${className}`.trim()}>
      {children}
    </span>
  );
};