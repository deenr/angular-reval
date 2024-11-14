/**
 * Retrieve a nested value from an object using a dot-separated key string.
 *
 * @param key The dot-separated key string (e.g., 'user.profile.name').
 * @param object The object to search within.
 * @returns The value if found, otherwise `undefined`.
 */
export const getNestedValue = (key: string, object: any): any => {
  const keys = key.split('.');

  return keys.reduce(
    (nestedObject: any, currentKey: string) =>
      nestedObject !== null && nestedObject !== undefined && typeof nestedObject === 'object' && currentKey in nestedObject ? nestedObject[currentKey] : undefined,
    object
  );
};
