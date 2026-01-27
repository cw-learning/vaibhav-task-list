import React from 'react';
import { ProgressBarProps } from './ProgressBar.types';
import {
  CONTAINER_STYLES,
  LABEL_CONTAINER_STYLES,
  LABEL_TEXT_STYLES,
  PERCENTAGE_STYLES,
  BAR_BACKGROUND_STYLES,
  BAR_FILL_STYLES,
  getProgressPercentage,
} from './ProgressBar.styles';

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  className = '',
}) => {
  const percentage = getProgressPercentage(value, max);

  return (
    <div className={`${CONTAINER_STYLES} ${className}`.trim()}>
      {(label ?? showPercentage) && (
        <div className={LABEL_CONTAINER_STYLES}>
          {label && <span className={LABEL_TEXT_STYLES}>{label}</span>}
          {showPercentage && (
            <span className={PERCENTAGE_STYLES}>{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className={BAR_BACKGROUND_STYLES}>
        <div
          className={BAR_FILL_STYLES}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};