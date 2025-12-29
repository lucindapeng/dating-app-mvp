import axios from 'axios'; // <--- ADD THIS LINE
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_URL = 'http://localhost:8000'; // Or your specific backend URL

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/token`, { 
      username: email, // FastAPI often uses 'username' for the OAuth2 flow
      password: password 
    });

    const token = response.data.access_token;

    if (token) {
      await AsyncStorage.setItem('token', token);
      return response.data;
    } else {
      throw new Error("No token received");
    }
  } catch (error) {
    // This catches the error seen in your second screenshot
    console.error("Axios Error:", error);
    throw error;
  }
};
const response = await axios.post(...);
console.log("Full Backend Response Data:", response.data);
