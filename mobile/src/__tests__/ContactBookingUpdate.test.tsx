import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactBookingUpdate from '../ContactBookingUpdate';

describe('ContactBookingUpdate', () => {
  it('renders correctly and validates email contact input', () => {
    const handleSubmit = jest.fn();
    render(
      <ContactBookingUpdate
        bookingId="1001"
        onSubmitContact={handleSubmit}
      />
    );

    expect(screen.getByText('Booking Contact Details')).toBeInTheDocument();
    expect(screen.getByText(/We store only the required contact channel/)).toBeInTheDocument();

    const input = screen.getByLabelText('Contact Channel Value');
    const button = screen.getByText('Save Contact Details');

    // Invalid email
    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.click(button);
    expect(screen.getByRole('alert')).toHaveTextContent('Please enter a valid email address.');
    expect(handleSubmit).not.toHaveBeenCalled();

    // Valid email
    fireEvent.change(input, { target: { value: 'traveler@traqora.io' } });
    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalledWith('email', 'traveler@traqora.io');
    expect(screen.getByText('Contact details successfully saved for booking updates.')).toBeInTheDocument();
  });

  it('validates SMS/phone contact input correctly', () => {
    const handleSubmit = jest.fn();
    render(
      <ContactBookingUpdate
        bookingId="1002"
        onSubmitContact={handleSubmit}
        initialChannel="sms"
      />
    );

    const input = screen.getByLabelText('Contact Channel Value');
    const button = screen.getByText('Save Contact Details');

    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.click(button);
    expect(screen.getByRole('alert')).toHaveTextContent('Please enter a valid phone number.');

    fireEvent.change(input, { target: { value: '+14155552671' } });
    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalledWith('sms', '+14155552671');
  });
});
