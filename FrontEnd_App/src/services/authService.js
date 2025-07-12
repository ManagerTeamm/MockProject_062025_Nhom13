import axios from 'axios';
import { buildAuthEndpoint, logEnvironmentInfo } from '../utils/apiConfig';

// Log environment info for debugging
logEnvironmentInfo();

export const login = async (username, password) => {
  const response = await axios.post(buildAuthEndpoint('/login'), { username, password });
  return response.data.data;
};