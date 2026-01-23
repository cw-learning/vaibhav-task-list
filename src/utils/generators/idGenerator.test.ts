import { describe, it, expect } from 'vitest';
import { generateUniqueId } from './idGenerator';

describe('generateUniqueId', () => {
  it('should generate a unique ID', () => {
    const id1 = generateUniqueId();
    const id2 = generateUniqueId();
    
    expect(id1).toBeTruthy();
    expect(id2).toBeTruthy();
    expect(id1).not.toBe(id2);
  });

  it('should return a string', () => {
    const id = generateUniqueId();
    expect(typeof id).toBe('string');
  });

  it('should contain timestamp and random number', () => {
    const id = generateUniqueId();
    expect(id).toMatch(/^\d+-\d+$/);
  });
});