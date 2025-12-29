import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !username) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      setLoading(true);
      // Ensure local IP is used if testing on a physical device
      await axios.post('http://localhost:8000/register', { 
        email, 
        password, 
        username 
      });
      
      Alert.alert("Success", "Account created! Please log in.");
      navigation.navigate('Login');
    } catch (err) {
      console.error("Registration Error Details:", err.response?.data);
      const detail = err.response?.data?.detail;
      const errorMessage = typeof detail === 'string' ? detail : "Registration failed. Ensure the backend is running.";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        value={username} 
        onChangeText={setUsername} 
      />
      
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
        onPress={handleRegister} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginLink}>
        <Text style={styles.loginLinkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, marginBottom: 15, borderRadius: 10, backgroundColor: '#f9f9f9' },
  button: { backgroundColor: '#28a745', padding: 18, borderRadius: 10, marginTop: 10 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  loginLink: { marginTop: 20 },
  loginLinkText: { color: '#007AFF', textAlign: 'center' }
});