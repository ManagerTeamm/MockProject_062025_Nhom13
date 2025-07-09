import axios from 'axios';
import { getCookie } from '../utils/cookie';
const API_BASE_URL = 'https://localhost:7064/api/Report';

const token = getCookie("token");
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    },
    timeout: 10000,
});

export const reportService ={
    getReports: async() => {
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
    }
};