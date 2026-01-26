export const generateUniqueId = (): string => {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).slice(2, 12);
   // Fallback: still not cryptographically strong, but lower collision risk than a 1e6 range.
  return `${timestamp}-${randomString}`;
};