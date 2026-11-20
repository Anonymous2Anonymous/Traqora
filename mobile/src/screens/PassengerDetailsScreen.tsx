import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { validatePassengerName } from './CheckoutScreen';

export default function PassengerDetailsScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSave = () => {
    if (!validatePassengerName(firstName) || !validatePassengerName(lastName)) {
      setValidationError('Names must be valid and cannot contain control characters.');
      return;
    }
    setValidationError('');
    // Save passenger details
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Passenger Details</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      {validationError ? <Text style={styles.errorText}>{validationError}</Text> : null}
      <Button title="Save Passenger" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 12, borderRadius: 4 },
  errorText: { color: 'red', marginBottom: 10 }
});
