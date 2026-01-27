import React from 'react';
import { ButtonProps } from './Button.types';
import { getButtonStyles } from './Button.styles';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  ...props
}) => {
  const buttonStyles = getButtonStyles(variant, size, disabled);

  return (
    <button
      className={`${buttonStyles} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};