import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MatchListScreen = ({ navigation }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      
      // Retrieve the ID saved during Login
      let userId = await AsyncStorage.getItem('user_id');
      
      // Fallback in case your LoginScreen used 'token'
      if (!userId) {
        userId = await AsyncStorage.getItem('token');
      }
      
      // If still no ID, stop the request to prevent 422 error
      if (!userId) {
        console.log("No User ID found yet, skipping fetch...");
        setLoading(false);
        return;
      }

      // Pass the current_user_id as a query parameter
      const response = await axios.get(`http://localhost:8000/matches?current_user_id=${userId}`);
      setMatches(response.data);
    } catch (err) {
      console.error("Fetch Error:", err.response?.status, err.message);
      
      // Handle session expiration for the Week 3 audit
      if (err.response?.status === 401 || err.response?.status === 422) {
        Alert.alert('Session Error', 'Please log in again to view matches.');
        navigation.replace('Login');
      }
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.matchCard} 
      onPress={() => navigation.navigate('Proposal', { match: item })}
    >
      <View style={styles.avatarPlaceholder} />
      <View>
        <Text style={styles.matchName}>{item.username}</Text>
        <Text style={styles.matchDetail}>Tap to propose a date</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Matches</Text>
      
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No matches found nearby.</Text>
            <TouchableOpacity style={styles.refreshButton} onPress={fetchMatches}>
              <Text style={styles.refreshText}>Refresh List</Text>
            </TouchableOpacity>
          </View>
        }
        onRefresh={fetchMatches}
        refreshing={loading}
      />
      
      {/* Logout is essential for testing User A vs User B roles */}
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={async () => {
          await AsyncStorage.clear();
          navigation.replace('Login');
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
  matchCard: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarPlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#e1e4e8', marginRight: 15 },
  matchName: { fontSize: 18, fontWeight: '600' },
  matchDetail: { color: '#666', fontSize: 14 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: '#999', marginBottom: 10 },
  refreshButton: { padding: 10 },
  refreshText: { color: '#007AFF', fontWeight: 'bold' },
  logoutButton: { marginTop: 20, padding: 15, alignItems: 'center' },
  logoutText: { color: '#dc3545', fontWeight: 'bold' }
});