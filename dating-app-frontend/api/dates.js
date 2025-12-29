import api from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Propose a date for a match
export const proposeDate = async (matchId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await api.post(
      `/dates/propose/${matchId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    console.log('Error proposing date:', err.response?.data || err.message);
    throw err;
  }
};

// Block a match
export const blockMatch = async (matchId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await api.post(
      `/matches/block/${matchId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    console.log('Error blocking match:', err.response?.data || err.message);
    throw err;
  }
};

const authHeader = async () => {
  const token = await AsyncStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const getMyDates = async () => {
  const headers = await authHeader();
  const res = await api.get('/dates/my', { headers });
  return res.data;
};

export const acceptDate = async (dateId) => {
  const headers = await authHeader();
  const res = await api.post(`/dates/accept/${dateId}`, {}, { headers });
  return res.data;
};

export const declineDate = async (dateId) => {
  const headers = await authHeader();
  const res = await api.post(`/dates/decline/${dateId}`, {}, { headers });
  return res.data;
};