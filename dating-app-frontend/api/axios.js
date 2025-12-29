import axios from 'axios';
import { Platform } from 'react-native';

let BASE_URL = 'http://localhost:8000';

// Android emulator special localhost
if (Platform.OS === 'android') {
  BASE_URL = 'http://10.0.2.2:8000';
}

// iOS simulator stays localhost
if (Platform.OS === 'ios') {
  BASE_URL = 'http://localhost:8000';
}

// ✅ If you are on a REAL phone, replace ONLY this line
// with your Mac's IP (from ifconfig → en0 → inet)
// Example:
// BASE_URL = 'http://192.168.1.109:8000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('API BASE URL:', BASE_URL);

export default api;
