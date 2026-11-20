import { validatePassengerNameNonLossy } from '../passengerValidation';

describe('validatePassengerNameNonLossy', () => {
  it('accepts valid international names', () => {
    expect(() => validatePassengerNameNonLossy('François Müller-Özdemir 🚀')).not.toThrow();
    expect(() => validatePassengerNameNonLossy('José María García')).not.toThrow();
    expect(() => validatePassengerNameNonLossy('李小龙')).not.toThrow();
  });

  it('rejects control characters', () => {
    expect(() => validatePassengerNameNonLossy('John\u001FDoe')).toThrow(
      'Passenger name contains forbidden control characters'
    );
  });
});
