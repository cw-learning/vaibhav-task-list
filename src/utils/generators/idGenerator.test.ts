import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateUniqueId } from './idGenerator';
describe('generateUniqueId', () => {
  let randomUUIDMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    randomUUIDMock = vi.fn();
    vi.stubGlobal('crypto', { randomUUID: randomUUIDMock } as unknown as Crypto);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('returns a string and produces different IDs', () => {
    randomUUIDMock.mockReturnValueOnce('id-1').mockReturnValueOnce('id-2');

    expect(generateUniqueId()).toBe('id-1');
    expect(generateUniqueId()).toBe('id-2');
  });
});