import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://85ce-14-186-91-164.ngrok-free.app/api/Auth/login', //API base URL
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;