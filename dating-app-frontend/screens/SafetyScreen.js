import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

export default function SafetyScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Safety & Transparency</Text>
      <Text style={styles.section}>How to Block: Tap 'Block' on any match detail screen.</Text>
      <Text style={styles.section}>How to Report: Tap 'Report' if a user is acting inappropriately.</Text>
      <Text style={styles.section}>Data Policy: We store your city. We never track your live GPS location.</Text>
      <Text style={styles.section}>Account Deletion: Email support@yourapp.com to wipe your data.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  section: { fontSize: 16, marginBottom: 15, lineHeight: 22 }
});