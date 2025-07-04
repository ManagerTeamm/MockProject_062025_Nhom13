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