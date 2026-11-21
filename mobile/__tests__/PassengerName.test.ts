import { validatePassengerName } from '../../src/utils/passengerName';

describe('validatePassengerName', () => {
  it('accepts valid international names', () => {
    expect(validatePassengerName('José María')).toBe(true);
    expect(validatePassengerName('O\'Connor')).toBe(true);
    expect(validatePassengerName('Jean-Luc')).toBe(true);
    expect(validatePassengerName('Müller')).toBe(true);
  });

  it('rejects control characters', () => {
    expect(validatePassengerName('John\u001FDoe')).toBe(false);
    expect(validatePassengerName('Jane\u007F')).toBe(false);
  });
});
