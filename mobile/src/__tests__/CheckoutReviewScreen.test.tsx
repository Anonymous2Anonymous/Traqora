import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CheckoutReviewScreen, {
  CheckoutReviewScreenProps,
} from '../screens/CheckoutReviewScreen';

describe('CheckoutReviewScreen', () => {
  const sampleProps: CheckoutReviewScreenProps = {
    itinerary: [
      {
        flightNumber: 'TRQ101',
        fromAirport: 'JFK',
        toAirport: 'LAX',
        departureTime: '2025-06-01 10:00',
        arrivalTime: '2025-06-01 13:00',
      },
    ],
    traveler: {
      fullName: 'Jane Doe',
      email: 'jane.doe@example.com',
      passportNumber: 'AB1234567',
    },
    quote: {
      currency: 'USDC',
      amount: '450.00',
      fee: '5.00 USDC',
    },
    paymentMethod: {
      type: 'crypto',
      details: 'Stellar Wallet (G...XYZ)',
    },
    onConfirm: jest.fn(),
    onBack: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders normal path successfully with all required sections', () => {
    const { getByText } = render(<CheckoutReviewScreen {...sampleProps} />);

    expect(getByText('Review Checkout')).toBeTruthy();
    expect(getByText('Flight TRQ101')).toBeTruthy();
    expect(getByText('JFK → LAX')).toBeTruthy();
    expect(getByText('Departure: 2025-06-01 10:00')).toBeTruthy();
    expect(getByText('Arrival: 2025-06-01 13:00')).toBeTruthy();
    expect(getByText('Name: Jane Doe')).toBeTruthy();
    expect(getByText('Email: jane.doe@example.com')).toBeTruthy();
    expect(getByText('Passport: AB1234567')).toBeTruthy();
    expect(getByText('450.00 USDC')).toBeTruthy();
    expect(getByText('Includes fees: 5.00 USDC')).toBeTruthy();
    expect(getByText('Type: crypto')).toBeTruthy();
    expect(getByText('Details: Stellar Wallet (G...XYZ)')).toBeTruthy();
  });

  it('handles optional fields gracefully when missing', () => {
    const minimalProps: CheckoutReviewScreenProps = {
      itinerary: [
        {
          flightNumber: 'TRQ202',
          fromAirport: 'SFO',
          toAirport: 'ORD',
          departureTime: '2025-07-01 08:00',
        },
      ],
      traveler: {
        fullName: 'John Smith',
        email: 'john@example.com',
      },
      quote: {
        currency: 'XML',
        amount: '120.00',
      },
      paymentMethod: {
        type: 'card',
        details: 'Visa ending in 4242',
      },
      onConfirm: jest.fn(),
    };

    const { getByText, queryByText } = render(
      <CheckoutReviewScreen {...minimalProps} />
    );

    expect(getByText('Flight TRQ202')).toBeTruthy();
    expect(getByText('SFO → ORD')).toBeTruthy();
    expect(getByText('Name: John Smith')).toBeTruthy();
    expect(getByText('Email: john@example.com')).toBeTruthy();
    expect(queryByText(/Passport:/)).toBeNull();
    expect(getByText('120.00 XML')).toBeTruthy();
    expect(queryByText(/Includes fees:/)).toBeNull();
    expect(getByText('Type: card')).toBeTruthy();
    expect(queryByText(/Go back/)).toBeNull();
  });

  it('triggers onConfirm when confirm button is pressed', () => {
    const { getByLabelText } = render(<CheckoutReviewScreen {...sampleProps} />);

    const confirmButton = getByLabelText('Confirm and Pay');
    fireEvent.press(confirmButton);

    expect(sampleProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it('triggers onBack when back button is pressed', () => {
    const { getByLabelText } = render(<CheckoutReviewScreen {...sampleProps} />);

    const backButton = getByLabelText('Go back');
    fireEvent.press(backButton);

    expect(sampleProps.onBack).toHaveBeenCalledTimes(1);
  });
});
