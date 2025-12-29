import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DateDetailScreen = ({ route, navigation }) => {
  const { date } = route.params;

  const handleCancel = () => {
    alert('Date canceled');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{date.match.name}</Text>
      <Text style={styles.info}>{date.match.age} • {date.match.city}</Text>
      <Button title="Cancel Date" onPress={handleCancel} color="red" />
    </View>
  );
};

export default DateDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#fafafa' },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  info: { fontSize: 18, marginBottom: 16 },
});

const handleBlock = async () => {
  // Call your backend: POST /matches/block/{match_id}
  alert("User Blocked. You will no longer see this match.");
  navigation.navigate("MatchList");
};

const handleReport = () => {
  // Navigate to a simple form or just show an alert for MVP
  alert("Report submitted. Our team will review this shortly.");
};

// ... in your JSX ...
<View style={{ marginTop: 20 }}>
  <Button title="Report User" onPress={handleReport} color="orange" />
  <Button title="Block User" onPress={handleBlock} color="red" />
</View>