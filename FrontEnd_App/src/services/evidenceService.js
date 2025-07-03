import axios from 'axios';

const API_BASE_URL = 'https://localhost:7064/api';

const evidenceService = {
  // Lấy tất cả evidence
  getAllEvidences: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Evidence`);
      return response.data;
    } catch (error) {
      console.error('Error fetching evidences:', error);
      throw error;
    }
  },

  // Tạo evidence mới
  createEvidence: async (evidenceData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Evidence`, evidenceData);
      return response.data;
    } catch (error) {
      console.error('Error creating evidence:', error);
      throw error;
    }
  },

  // Lấy evidence theo ID
  getEvidenceById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Evidence/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching evidence by id:', error);
      throw error;
    }
  }
};

export default evidenceService; 