import { toEnumKey } from './to-enum-key';

describe(`toEnumKey`, () => {
  it(`should convert a string to an enum key`, () => {
    expect(toEnumKey('test-string')).toBe('TestString');
  });
});
