import axios from 'axios';
import { getCookie } from '../utils/cookie';
import { API_CONFIG, buildReportEndpoint } from '../utils/apiConfig';

const token = getCookie("token");
const apiClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    },
    timeout: API_CONFIG.TIMEOUT,
});

export const reportService = {
    getReports: async () => {
        try {
            const url = buildReportEndpoint("/get-reports");
            console.log('🔧 Calling API:', url);
            const response = await apiClient.get(url);
                  console.log('🔧 Reponse API:', response);
            return response.data;
        } catch (error) {
            console.error('Error fetching reports:', error);
            throw error;
        }
    },

    getReportDetail: async (reportId) => {
        try {
            const response = await apiClient.get(buildReportEndpoint(`/report-detail/${reportId}`));
            return response.data;
        } catch (error) {
            console.error('Error fetching report detail:', error);
            throw error;
        }
    },

    approveReport: async (reportId) => {
        try {
            const response = await apiClient.post(buildReportEndpoint(`/report-approve/${reportId}`));
            return response.data;
        } catch (error) {
            console.error('Error approving report:', error);
            throw error;
        }
    },
    declineReport: async (reportId) => {
        try {
            const response = await apiClient.patch(buildReportEndpoint(`/report-decline/${reportId}`));
            return response.data;
        } catch (error) {
            console.error('Error declining report:', error);
            throw error;
        }
    }
};