import axios from "axios";
const API_URL = "https://localhost:7064/api/Evidence";

export const getAllEvidence = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const getEvidencePaginated = async (page = 1, pageSize = 10) => {
  const response = await axios.get(`${API_URL}/paginated?page=${page}&pageSize=${pageSize}`);
  return response.data;
};

export const searchEvidence = async ({ from, to, status }) => {
  const params = [];
  if (from) params.push(`from=${encodeURIComponent(from)}`);
  if (to) params.push(`to=${encodeURIComponent(to)}`);
  if (status) params.push(`status=${encodeURIComponent(status)}`);
  const query = params.length ? `?${params.join('&')}` : '';
  const response = await axios.get(`${API_URL}/search${query}`);
  return response.data;
};

export const getEvidenceById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createEvidence = async (data) => {
  const response = await axios.post(`${API_URL}`, data);
  return response.data;
}; 