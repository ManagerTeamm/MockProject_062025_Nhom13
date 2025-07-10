import axios from 'axios';
const API_URL = "https://localhost:7064/api/suspect/list";

export const getSuspectList = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getSuspectPaginated = async (page = 1, pageSize = 10) => {
  const response = await axios.get(`${API_URL.replace('/list', '/paginated')}?page=${page}&pageSize=${pageSize}`);
  return response.data;
};

export const filterSuspects = async ({ status, catchTime, page = 1, pageSize = 10 }) => {
  const params = [];
  if (status) params.push(`status=${encodeURIComponent(status)}`);
  if (catchTime) params.push(`catchTime=${encodeURIComponent(catchTime)}`);
  params.push(`page=${page}`);
  params.push(`pageSize=${pageSize}`);
  const url = `${API_URL.replace('/list', '/filter')}?${params.join('&')}`;
  const response = await axios.get(url);
  return response.data;
}; 