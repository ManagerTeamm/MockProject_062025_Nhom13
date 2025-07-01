import axiosClient from './client';

const fetchSecureData = async () => {
  try {
    const response = await axiosClient.get('/secure-data');
    console.log(response.data);
  } catch (error) {
    console.error('Unauthorized or error:', error.response?.data || error.message);
  }
};