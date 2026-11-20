import { validatePassengerName } from '../src/screens/CheckoutScreen';

describe('validatePassengerName', () => {
  it('accepts valid international names', () => {
    expect(validatePassengerName('José García-López')).toBe(true);
    expect(validatePassengerName("O'Connor")).toBe(true);
    expect(validatePassengerName('娜娜')).toBe(true);
    expect(validatePassengerName('Marie-Claire D\u00e9cor')).toBe(true);
  });

  it('rejects names with control characters', () => {
    expect(validatePassengerName('John\u0000Doe')).toBe(false);
    expect(validatePassengerName('Jane\u001FDoe')).toBe(false);
    expect(validatePassengerName('Test\u0080User')).toBe(false);
  });

  it('rejects empty or whitespace-only names', () => {
    expect(validatePassengerName('')).toBe(false);
    expect(validatePassengerName('   ')).toBe(false);
  });
});
