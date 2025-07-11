import axios from 'axios';
import { getCookie } from '../utils/cookie';
import { API_CONFIG } from '../utils/apiConfig';

const token = getCookie("token");
const apiClient = axios.create({
    baseURL: API_CONFIG.API_REPORT_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    },
    timeout: API_CONFIG.TIMEOUT,
});

export const reportService = {
    getReports: async () => {
        try {
            const response = await apiClient.get('/get-reports');
            return response.data;
        } catch (error) {
            console.error('Error fetching reports:', error);
            throw error;
        }
    },

    getReportDetail: async (reportId) => {
        try {
            const response = await apiClient.get(`/report-detail/${reportId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching report detail:', error);
            throw error;
        }
    },

    approveReport: async (reportId) => {
        try {
            const response = await apiClient.post(`/report-approve/${reportId}`);
            return response.data;
        } catch (error) {
            console.error('Error approving report:', error);
            throw error;
        }
    },
    declineReport: async (reportId) => {
        try {
            const response = await apiClient.patch(`/report-decline/${reportId}`);
            return response.data;
        } catch (error) {
            console.error('Error approving report:', error);
            throw error;
        }
    }
};