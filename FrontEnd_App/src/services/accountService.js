import axios from 'axios';
import { buildAuthEndpoint, logEnvironmentInfo } from '../utils/apiConfig';

// Log environment info for debugging
logEnvironmentInfo();

export const loginAccount = async (userName, password) => {
    try {
        const response = await axios.post(buildAuthEndpoint('/login'), {
            userName,
            password,
        });

        return response.data.data;
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        throw error;
    }
};