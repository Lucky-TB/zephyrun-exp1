import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';

export function ProfileScreen() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Profile Screen</Text>
      <Button
        mode="contained"
        onPress={signOut}
        style={styles.button}
      >
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
}); 