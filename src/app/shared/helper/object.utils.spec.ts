import { getNestedValue } from './object.utils';

describe('ObjectUtils', () => {
  describe('getNestedValue', () => {
    it('should return undefined for null object', () => {
      expect(getNestedValue('test', null)).toBeUndefined();
    });

    it('should return undefined for undefined object', () => {
      expect(getNestedValue('test', undefined)).toBeUndefined();
    });

    it('should return value for single level key', () => {
      const obj = { name: 'John' };
      expect(getNestedValue('name', obj)).toBe('John');
    });

    it('should return undefined for non-existent single level key', () => {
      const obj = { name: 'John' };
      expect(getNestedValue('age', obj)).toBeUndefined();
    });

    it('should return nested value for multi-level key', () => {
      const obj = {
        user: {
          profile: {
            name: 'John',
            age: 30
          }
        }
      };
      expect(getNestedValue('user.profile.name', obj)).toBe('John');
      expect(getNestedValue('user.profile.age', obj)).toBe(30);
    });

    it('should return undefined for partially matching nested path', () => {
      const obj = {
        user: {
          profile: {
            name: 'John'
          }
        }
      };
      expect(getNestedValue('user.settings.theme', obj)).toBeUndefined();
    });

    it('should handle arrays in nested path', () => {
      const obj = {
        users: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' }
        ]
      };
      expect(getNestedValue('users.1.name', obj)).toBe('Jane');
    });

    it('should return undefined when accessing non-object with dot notation', () => {
      const obj = {
        name: 'John',
        'some.key': 'value'
      };
      expect(getNestedValue('name.invalid', obj)).toBeUndefined();
    });
  });
});
