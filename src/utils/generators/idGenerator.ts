export const generateUniqueId = (): string => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  // Fallback: still not cryptographically strong, but lower collision risk than a 1e6 range.
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
};