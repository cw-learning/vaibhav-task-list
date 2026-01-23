/**
 * Generates a unique ID using timestamp and random number
 * @returns {string} Unique identifier
 */
export const generateUniqueId = (): string => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000000);
  return `${timestamp}-${randomNum}`;
};