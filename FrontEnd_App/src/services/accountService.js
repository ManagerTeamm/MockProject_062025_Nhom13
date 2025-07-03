import axios from 'axios';
const Api_Url = "https://localhost:7064/api/Auth";

export const loginAccount = async (userName, password) => {
    try {
        const response = await axios.post(`${Api_Url}/login`, {
            userName,
            password,
        });

        return response.data.data;
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        throw error;
    }
};