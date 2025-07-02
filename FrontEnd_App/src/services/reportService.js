import axios from 'axios';
const API_BASE_URL = 'https://localhost:7064/api/Report'; // Replace with your actual API base URL

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
});

// Interceptor để thêm token nếu cần
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const reportService ={
    getReports: async() => {
        try {
            const response = await apiClient.get('/get-reports');
            return response.data;
        } catch (error) {
            console.error('Error fetching reports:', error);
            throw error;
        }
    }
};