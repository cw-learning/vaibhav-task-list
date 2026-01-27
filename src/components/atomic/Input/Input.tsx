import React from 'react';
import { InputProps } from './Input.types';
import {
  CONTAINER_STYLES,
  LABEL_STYLES,
  ERROR_TEXT_STYLES,
  getInputStyles,
} from './Input.styles';

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  id,
  ...props
}) => {
  const inputId = id ?? `input-${label?.replace(/\s+/g, '-').toLowerCase()}`;
  const inputStyles = getInputStyles(Boolean(error));

  return (
    <div className={CONTAINER_STYLES}>
      {label && (
        <label htmlFor={inputId} className={LABEL_STYLES}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${inputStyles} ${className}`.trim()}
        {...props}
      />
      {error && <span className={ERROR_TEXT_STYLES}>{error}</span>}
    </div>
  );
};