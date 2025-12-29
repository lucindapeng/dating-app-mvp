import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ROUTES } from '../Routes';

export default function ConsentScreen({ navigation }) {
  const handleAccept = async () => {
    // Save that they agreed
    await AsyncStorage.setItem("consentAccepted", "true");
    // Move to the main app
    navigation.replace(ROUTES.MATCH_LIST);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community Guidelines</Text>
      <Text style={styles.text}>
        To keep our community safe, you must agree to act respectfully, 
        honor consent, and report any inappropriate behavior.
      </Text>
      <Button title="I Agree & Continue" onPress={handleAccept} color="#e91e63" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  text: { fontSize: 16, lineHeight: 24, marginBottom: 40, textAlign: 'center', color: '#444' }
});