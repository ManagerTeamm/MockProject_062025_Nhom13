import axios from 'axios';
import { buildEvidenceEndpoint, logEnvironmentInfo } from '../utils/apiConfig';

// Log environment info for debugging
logEnvironmentInfo();

export const getEvidenceList = async () => {
  const response = await axios.get(buildEvidenceEndpoint(''));
  return response.data;
};

export const getEvidencePaginated = async (page = 1, pageSize = 10) => {
  const response = await axios.get(buildEvidenceEndpoint(`/paginated?page=${page}&pageSize=${pageSize}`));
  return response.data;
};

export const searchEvidence = async ({ from, to, status }) => {
  const params = [];
  if (from) params.push(`from=${encodeURIComponent(from)}`);
  if (to) params.push(`to=${encodeURIComponent(to)}`);
  if (status) params.push(`status=${encodeURIComponent(status)}`);
  const query = params.length ? `?${params.join('&')}` : '';
  const response = await axios.get(buildEvidenceEndpoint(`/search${query}`));
  return response.data;
};

export const filterEvidence = async ({ status, collectedAt, page = 1, pageSize = 10 }) => {
  const params = [];
  if (status) params.push(`status=${encodeURIComponent(status)}`);
  if (collectedAt) params.push(`collectedAt=${encodeURIComponent(collectedAt)}`);
  params.push(`page=${page}`);
  params.push(`pageSize=${pageSize}`);
  
  const query = params.length ? `?${params.join('&')}` : '';
  const response = await axios.get(buildEvidenceEndpoint(`/filter${query}`));
  return response.data;
};

export const getEvidenceById = async (id) => {
  const response = await axios.get(buildEvidenceEndpoint(`/${id}`));
  return response.data;
};

export const createEvidence = async (data) => {
  const response = await axios.post(buildEvidenceEndpoint(''), data);
  return response.data;
}; 