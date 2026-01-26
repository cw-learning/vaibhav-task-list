import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateUniqueId } from './idGenerator';

describe('generateUniqueId – using crypto.randomUUID', () => {
  let randomUUIDMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    randomUUIDMock = vi.fn();
    vi.stubGlobal('crypto', { randomUUID: randomUUIDMock });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('should use crypto.randomUUID when available', () => {
    randomUUIDMock.mockReturnValue('uuid-123');

    const id = generateUniqueId();

    expect(randomUUIDMock).toHaveBeenCalled();
    expect(id).toBe('uuid-123');
  });

  it('should return different IDs on each call', () => {
    randomUUIDMock
      .mockReturnValueOnce('uuid-1')
      .mockReturnValueOnce('uuid-2');

    const id1 = generateUniqueId();
    const id2 = generateUniqueId();

    expect(id1).toBe('uuid-1');
    expect(id2).toBe('uuid-2');
    expect(id1).not.toBe(id2);
  });
});

describe('generateUniqueId – fallback (no crypto.randomUUID)', () => {
  beforeEach(() => {
    vi.stubGlobal('crypto', {}); // crypto.randomUUID unavailable
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('should return a string', () => {
    const id = generateUniqueId();
    expect(typeof id).toBe('string');
  });

  it('should return ID in expected format (timestamp-random)', () => {
    const id = generateUniqueId();

    // base36 timestamp - base36 random string
    expect(id).toMatch(/^[a-z0-9]+-[a-z0-9]+$/);
  });

  it('should not be empty', () => {
    const id = generateUniqueId();
    expect(id).toBeTruthy();
  });

  it('should return different IDs on each call', () => {
    const id1 = generateUniqueId();
    const id2 = generateUniqueId();

    expect(id1).not.toBe(id2);
  });
});
