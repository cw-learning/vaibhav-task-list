import React, { useId } from 'react';
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
  const reactId = useId();
  const inputId = id ?? reactId;
  const errorId = error ? `${inputId}-error` : undefined;
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
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={errorId}
        className={`${inputStyles} ${className}`.trim()}
        {...props}
      />
      {error && (
        <span id={errorId} className={ERROR_TEXT_STYLES} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};