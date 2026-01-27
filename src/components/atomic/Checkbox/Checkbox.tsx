import React from 'react';
import { CheckboxProps } from './Checkbox.types';
import {
  CHECKBOX_CONTAINER_STYLES,
  CHECKBOX_INPUT_STYLES,
  getCheckboxLabelStyles,
  DISABLED_STYLES,
} from './Checkbox.styles';

import { useState } from 'react';
import type { ChangeEventHandler } from 'react';

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  defaultChecked,
  disabled = false,
  onChange,
  className = '',
  ...inputProps
}) => {
  const isControlled = checked !== undefined;
  const [uncontrolledChecked, setUncontrolledChecked] = useState(Boolean(defaultChecked));
  const checkedForStyles = isControlled ? checked : uncontrolledChecked;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isControlled) setUncontrolledChecked(e.target.checked);
    onChange?.(e);
  };

  const labelClass = getCheckboxLabelStyles(Boolean(checkedForStyles));

  return (
    <label className={`${CHECKBOX_CONTAINER_STYLES} ${disabled ? DISABLED_STYLES : ''} ${className}`}>
      <input
        {...inputProps}
        type="checkbox"
        className={CHECKBOX_INPUT_STYLES}
        checked={isControlled ? checked : undefined}
        defaultChecked={!isControlled ? defaultChecked : undefined}
        disabled={disabled}
        onChange={disabled ? undefined : handleChange}
      />
      {label && <span className={labelClass}>{label}</span>}
    </label>
  );
};
