import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export interface ItinerarySegmentItem {
  flightNumber: string;
  fromAirport: string;
  toAirport: string;
  departureTime: string;
  arrivalTime?: string;
}

export interface TravelerDetails {
  fullName: string;
  email: string;
  passportNumber?: string;
}

export interface FinalQuote {
  currency: string;
  amount: string;
  fee?: string;
}

export interface PaymentMethodInfo {
  type: 'crypto' | 'card';
  details: string;
}

export interface CheckoutReviewScreenProps {
  itinerary: ItinerarySegmentItem[];
  traveler: TravelerDetails;
  quote: FinalQuote;
  paymentMethod: PaymentMethodInfo;
  onConfirm: () => void;
  onBack?: () => void;
}

export default function CheckoutReviewScreen({
  itinerary,
  traveler,
  quote,
  paymentMethod,
  onConfirm,
  onBack,
}: CheckoutReviewScreenProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.headerTitle} accessibilityRole="header">
        Review Checkout
      </Text>

      <View style={styles.section} accessibilityLabel="Itinerary Section">
        <Text style={styles.sectionTitle}>Selected Itinerary</Text>
        {itinerary.map((segment, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.flightNum}>Flight {segment.flightNumber}</Text>
            <Text style={styles.route}>
              {segment.fromAirport} → {segment.toAirport}
            </Text>
            <Text style={styles.time}>Departure: {segment.departureTime}</Text>
            {segment.arrivalTime && (
              <Text style={styles.time}>Arrival: {segment.arrivalTime}</Text>
            )}
          </View>
        ))}
      </View>

      <View style={styles.section} accessibilityLabel="Traveler Details Section">
        <Text style={styles.sectionTitle}>Traveler Details</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Name: {traveler.fullName}</Text>
          <Text style={styles.label}>Email: {traveler.email}</Text>
          {traveler.passportNumber && (
            <Text style={styles.label}>Passport: {traveler.passportNumber}</Text>
          )}
        </View>
      </View>

      <View style={styles.section} accessibilityLabel="Final Quote Section">
        <Text style={styles.sectionTitle}>Final Quote</Text>
        <View style={styles.card}>
          <Text style={styles.amount}>
            {quote.amount} {quote.currency}
          </Text>
          {quote.fee && <Text style={styles.fee}>Includes fees: {quote.fee}</Text>}
        </View>
      </View>

      <View style={styles.section} accessibilityLabel="Payment Method Section">
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.card}>
          <Text style={styles.label} capitalize>
            Type: {paymentMethod.type}
          </Text>
          <Text style={styles.label}>Details: {paymentMethod.details}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {onBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={onConfirm}
          accessibilityRole="button"
          accessibilityLabel="Confirm and Pay"
        >
          <Text style={styles.confirmButtonText}>Confirm and Pay</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333333',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  flightNum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 4,
  },
  route: {
    fontSize: 15,
    fontWeight: '500',
    color: '#495057',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: '#6c757d',
  },
  label: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
  },
  fee: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 2,
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
