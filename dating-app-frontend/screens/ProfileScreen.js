import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = ({ route }) => {
  const { name = 'Jane Doe', city = 'San Francisco' } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.info}>{city}</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#fafafa' },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  info: { fontSize: 18, color: '#555' },
});
