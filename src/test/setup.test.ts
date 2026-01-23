import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('test setup', () => {
  it('supports RTL rendering and jest-dom matchers', () => {
    render(React.createElement('div', null, 'Hello'));
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});