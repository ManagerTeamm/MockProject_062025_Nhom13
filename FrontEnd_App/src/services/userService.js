import axios from 'axios';
import { getCookie } from '../utils/cookie';
import { getUserNameFromToken } from '../utils/jwt';
const Api_Url = 'https://localhost:7064/api/User';


export const getAllUsers = async () => {
    try {
        const token = getCookie("token");
        console.log("token:", token);
        if (!token) throw new Error("No token found");

        const response = await axios.get(`${Api_Url}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data.data;
        console.log("getAllUsers response:", response.data.data);
    } catch (error) {
        console.error("getAllUsers error:", error);
        throw error;
    }
};

export const getUser = async () => {
    try {
        const userName = getUserNameFromToken();
        const response = await axios.get(`${Api_Url}/get-user`, {
            params: { userName },
            headers: {
                "Content-Type": "application/json"
            }
        });

        return response.data.data;
    } catch (error) {
        console.error("getUser error:", error);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const token = getCookie("token");
        if (!token) throw new Error("No token found");
        const response = await axios.post(`${Api_Url}/create-user`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error("createUser error:", error);
        throw error;
    }
}

export const updateUser = async (userData) => {
    try {
        const token = getCookie("token");
        if (!token) throw new Error("No token found");
        const response = await axios.put(`${Api_Url}/update-user`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error("updateUser error:", error);
        throw error;
    }
}

export const deleteUser = async (userId) => {
    try {
        const token = getCookie("token");
        if (!token) throw new Error("No token found");
        const response = await axios.delete(`${Api_Url}/delete-user`, {
            data: { userId },
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error("deleteUser error:", error);
        throw error;
    }
}