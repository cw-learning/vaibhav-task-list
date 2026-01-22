import { describe, it, expect } from 'vitest';

describe('Test Setup', () => {
  it('should pass a basic assertion', () => {
    expect(true).toBe(true);
  });

  it('should perform arithmetic correctly', () => {
    const sum = 2 + 2;
    expect(sum).toBe(4);
  });

  it('should handle string operations', () => {
    const greeting = 'Hello, World!';
    expect(greeting).toContain('World');
    expect(greeting.length).toBeGreaterThan(0);
  });

  it('should work with arrays', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toHaveLength(5);
    expect(numbers).toContain(3);
  });

  it('should work with objects', () => {
    const user = { name: 'John', age: 30 };
    expect(user).toHaveProperty('name');
    expect(user.name).toBe('John');
  });
});
