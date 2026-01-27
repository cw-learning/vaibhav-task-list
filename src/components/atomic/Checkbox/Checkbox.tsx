import React from 'react';
import { CheckboxProps } from './Checkbox.types';
import {
  CHECKBOX_CONTAINER_STYLES,
  CHECKBOX_INPUT_STYLES,
  getCheckboxLabelStyles,
  DISABLED_STYLES,
} from './Checkbox.styles';

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  disabled = false,
  onChange,
  className = '',
  ...props
}) => {
  const containerClass = `${CHECKBOX_CONTAINER_STYLES} ${disabled ? DISABLED_STYLES : ''} ${className}`.trim();
  const labelClass = getCheckboxLabelStyles(Boolean(checked));

  return (
    <label className={containerClass}>
      <input
        {...props}
        type="checkbox"
        className={CHECKBOX_INPUT_STYLES}
        checked={checked}
        disabled={disabled}
        onChange={disabled ? undefined : onChange}
      />
      {label && <span className={labelClass}>{label}</span>}
    </label>
  );
};