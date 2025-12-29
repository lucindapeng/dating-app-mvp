import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProposalScreen = ({ route, navigation }) => {
  const { match } = route.params;
  const [dateData, setDateData] = useState(null); // Stores the whole date object from backend
  const [status, setStatus] = useState('none');
  const [myId, setMyId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userId = await AsyncStorage.getItem('user_id');
        setMyId(userId);

        // Check if there is already a pending date between these two users
        const response = await axios.get(`http://localhost:8000/dates/status/${match.id}?user_id=${userId}`);
        if (response.data) {
          setDateData(response.data);
          setStatus(response.data.status);
        }
      } catch (e) {
        console.log("No existing date found or error fetching status");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [match.id]);

  const handlePropose = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/dates/propose/${match.id}?proposer_id=${myId}`);
      setDateData(response.data);
      setStatus('pending');
      Alert.alert("Sent!", "Proposal sent to " + match.username);
    } catch (err) {
      Alert.alert("Error", "Could not send proposal.");
    }
  };

  const handleResponse = async (action) => {
    try {
      await axios.post(`http://localhost:8000/dates/${action}/${dateData.id}`);
      setStatus(action === 'accept' ? 'accepted' : 'declined');
      Alert.alert("Success", `Date ${action}ed!`);
    } catch (err) {
      Alert.alert("Error", "Action failed");
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{flex: 1}} />;

  // LOGIC: Am I the one who sent the proposal?
  const isProposer = dateData && String(dateData.proposer_id) === String(myId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Date with {match.username}</Text>
      
      {/* 1. NO DATE YET: Show Propose Button */}
      {status === 'none' && (
        <TouchableOpacity style={styles.button} onPress={handlePropose}>
          <Text style={styles.buttonText}>Propose Date</Text>
        </TouchableOpacity>
      )}

      {/* 2. PENDING & I AM PROPOSER: Show Waiting Message */}
      {status === 'pending' && isProposer && (
        <Text style={styles.statusText}>Waiting for {match.username} to respond...</Text>
      )}

      {/* 3. PENDING & I AM RECEIVER: Show Accept/Decline */}
      {status === 'pending' && !isProposer && (
        <View style={styles.fullWidth}>
          <Text style={styles.statusText}>{match.username} invited you on a date!</Text>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, styles.accept]} onPress={() => handleResponse('accept')}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.decline]} onPress={() => handleResponse('decline')}>
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {status === 'accepted' && <Text style={styles.successText}>Date Confirmed! 🎉</Text>}
      {status === 'declined' && <Text style={styles.errorText}>Date Declined.</Text>}
    </View>
  );
};

export default ProposalScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  fullWidth: { width: '100%', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, width: '100%', marginTop: 10 },
  accept: { backgroundColor: '#28a745', flex: 1 },
  decline: { backgroundColor: '#dc3545', flex: 1 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  statusText: { fontSize: 18, color: '#666', marginBottom: 20, textAlign: 'center' },
  row: { flexDirection: 'row', gap: 10, width: '100%' },
  successText: { fontSize: 22, color: '#28a745', fontWeight: 'bold' },
  errorText: { fontSize: 22, color: '#dc3545', fontWeight: 'bold' }
});