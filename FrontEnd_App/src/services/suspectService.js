import axios from 'axios';
const API_URL = "https://localhost:7064/api/suspect";

export const getSuspectList = async () => {
  const response = await axios.get(`${API_URL}/list`);
  return response.data;
};

export const getSuspectPaginated = async (page = 1, pageSize = 10) => {
  const response = await axios.get(`${API_URL}/paginated?page=${page}&pageSize=${pageSize}`);
  return response.data;
};

export const filterSuspects = async ({ status, catchTime, page = 1, pageSize = 10 }) => {
  const params = [];
  if (status) params.push(`status=${encodeURIComponent(status)}`);
  if (catchTime) params.push(`catchTime=${encodeURIComponent(catchTime)}`);
  params.push(`page=${page}`);
  params.push(`pageSize=${pageSize}`);
  const url = `${API_URL}/filter?${params.join('&')}`;
  const response = await axios.get(url);
  return response.data;
};

export const createSuspect = async (suspectData) => {
  const response = await axios.post(`${API_URL}/create`, suspectData);
  return response.data;
}; 