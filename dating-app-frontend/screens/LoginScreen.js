import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import { ROUTES } from '../Routes';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      setLoading(true);
      
      // Attempting login against your updated FastAPI backend
      const response = await axios.post('http://localhost:8000/login', { 
        email: email, 
        password: password 
      });

      if (response.data && response.data.user_id) {
        // IMPORTANT: Save as 'user_id' so ProposalScreen can find it
        await AsyncStorage.setItem('user_id', String(response.data.user_id));
        
        // Also saving token for session management if needed
        await AsyncStorage.setItem('token', String(response.data.user_id)); 
        
        // Week 3 Safety Requirement: Verify consent
        const consent = await AsyncStorage.getItem("consentAccepted");
        
        if (consent === "true") {
          navigation.replace(ROUTES.MATCH_LIST);
        } else {
          navigation.replace('Consent'); 
        }
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.detail || "Check your backend connection";
      Alert.alert('Login failed', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        autoCapitalize="none" 
        keyboardType="email-address"
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      
      <TouchableOpacity 
        style={[styles.button, loading && { opacity: 0.7 }]} 
        onPress={handleLogin} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.registerLink} 
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>
          Don't have an account? <Text style={styles.linkBold}>Register here</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#fafafa' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 12, 
    marginBottom: 12, 
    borderRadius: 8, 
    backgroundColor: '#fff' 
  },
  button: { 
    backgroundColor: '#007AFF', 
    padding: 16, 
    borderRadius: 8,
    minHeight: 55,
    justifyContent: 'center'
  },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 16 },
  registerLink: { marginTop: 25, padding: 10 },
  registerText: { textAlign: 'center', color: '#666', fontSize: 14 },
  linkBold: { color: '#007AFF', fontWeight: '700' }
});