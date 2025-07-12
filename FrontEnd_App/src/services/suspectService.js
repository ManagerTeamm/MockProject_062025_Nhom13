import axios from 'axios';
import { buildSuspectEndpoint, logEnvironmentInfo } from '../utils/apiConfig';

// Log environment info for debugging
logEnvironmentInfo();

export const getSuspectList = async () => {
  const response = await axios.get(buildSuspectEndpoint('/list'));
  return response.data;
};

export const getSuspectPaginated = async (page = 1, pageSize = 10) => {
  const response = await axios.get(buildSuspectEndpoint(`/paginated?page=${page}&pageSize=${pageSize}`));
  return response.data;
};

export const filterSuspects = async ({ status, catchTime, page = 1, pageSize = 10 }) => {
  const params = [];
  if (status) params.push(`status=${encodeURIComponent(status)}`);
  if (catchTime) params.push(`catchTime=${encodeURIComponent(catchTime)}`);
  params.push(`page=${page}`);
  params.push(`pageSize=${pageSize}`);
  const url = buildSuspectEndpoint(`/filter?${params.join('&')}`);
  const response = await axios.get(url);
  return response.data;
};

export const createSuspect = async (suspectData) => {
  const response = await axios.post(buildSuspectEndpoint('/create'), suspectData);
  return response.data;
}; 