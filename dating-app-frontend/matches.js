import api from './axios';

export const getMatches = async () => {
  const response = await api.get('/matches');
  return response.data;
};

export const blockMatch = async (matchId) => {
  const response = await api.post(`/matches/block/${matchId}`);
  return response.data;
};
