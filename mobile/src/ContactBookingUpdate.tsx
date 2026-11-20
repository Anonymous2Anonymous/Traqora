import React, { useState } from 'react';

interface ContactBookingUpdateProps {
  bookingId: string;
  onSubmitContact: (channel: 'email' | 'sms', value: string) => void;
  initialChannel?: 'email' | 'sms';
  initialValue?: string;
}

export default function ContactBookingUpdate({
  bookingId,
  onSubmitContact,
  initialChannel = 'email',
  initialValue = '',
}: ContactBookingUpdateProps) {
  const [channel, setChannel] = useState<'email' | 'sms'>(initialChannel);
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const validateContact = (ch: 'email' | 'sms', val: string): boolean => {
    const trimmed = val.trim();
    if (!trimmed) return false;
    if (ch === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    } else {
      return /^\+?[1-9]\d{1,14}$/.test(trimmed.replace(/[\s()\-]/g, ''));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContact(channel, value)) {
      setError(channel === 'email' ? 'Please enter a valid email address.' : 'Please enter a valid phone number.');
      return;
    }
    setError(null);
    setSubmitted(true);
    onSubmitContact(channel, value.trim());
  };

  return (
    <div className="contact-booking-update-container">
      <h2>Booking Contact Details</h2>
      <p className="privacy-notice">
        We store only the required contact channel for booking updates (TRAQ-{bookingId}).
      </p>
      {submitted ? (
        <div className="success-message">
          <p>Contact details successfully saved for booking updates.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="channel-selector">
            <label>
              <input
                type="radio"
                name="channel"
                checked={channel === 'email'}
                onChange={() => { setChannel('email'); setError(null); }}
              />
              Email
            </label>
            <label>
              <input
                type="radio"
                name="channel"
                checked={channel === 'sms'}
                onChange={() => { setChannel('sms'); setError(null); }}
              />
              SMS / Phone
            </label>
          </div>
          <div className="input-group">
            <input
              type={channel === 'email' ? 'email' : 'tel'}
              placeholder={channel === 'email' ? 'traveler@example.com' : '+15555550199'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              aria-label="Contact Channel Value"
            />
          </div>
          {error && <p className="error-text" role="alert">{error}</p>}
          <button type="submit" className="button">
            Save Contact Details
          </button>
        </form>
      )}
    </div>
  );
}
