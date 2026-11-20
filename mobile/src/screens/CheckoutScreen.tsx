import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// Non-lossy validation: allows international letters, spaces, hyphens, apostrophes while rejecting control characters
export function validatePassengerName(name: string): boolean {
  if (!name || name.trim().length === 0) return false;
  // Reject control characters (Unicode categories Cc, Cf)
  const controlCharRegex = /\p{Cc}|\p{Cf}/u;
  if (controlCharRegex.test(name)) {
    return false;
  }
  // Must contain valid name characters (letters, spaces, punctuation marks typical in names like O'Connor, García-López, 娜)
  const validNameRegex = /^[\p{L}\p{M}\s'\-\.]+$/u;
  return validNameRegex.test(name);
}

export default function CheckoutScreen() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleCheckout = () => {
    if (!validatePassengerName(name)) {
      setError('Invalid passenger name. Please check for unsupported characters or control codes.');
      return;
    }
    setError('');
    // Proceed with checkout
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Passenger Checkout</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Legal Name (International Supported)"
        value={name}
        onChangeText={setName}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Complete Booking" onPress={handleCheckout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  error: { color: 'red', marginBottom: 10 }
});
