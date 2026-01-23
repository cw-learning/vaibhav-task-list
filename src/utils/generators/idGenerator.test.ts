import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateUniqueId } from './idGenerator';

describe('generateUniqueId', () => {
  const originalCrypto = globalThis.crypto;

  beforeEach(() => {
    globalThis.crypto = { randomUUID: vi.fn() } as unknown as Crypto;
  });

  afterEach(() => {
    globalThis.crypto = originalCrypto;
    vi.restoreAllMocks();
  });

  it('returns a string and produces different IDs', () => {
    (globalThis.crypto.randomUUID as unknown as ReturnType<typeof vi.fn>)
      .mockReturnValueOnce('id-1')
      .mockReturnValueOnce('id-2');

    expect(generateUniqueId()).toBe('id-1');
    expect(generateUniqueId()).toBe('id-2');
  });
});