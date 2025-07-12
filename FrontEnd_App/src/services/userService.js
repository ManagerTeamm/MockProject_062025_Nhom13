import axios from 'axios';
import { getCookie } from '../utils/cookie';
import { getUserNameFromToken } from '../utils/jwt';
import { API_CONFIG, buildUserEndpoint, logEnvironmentInfo } from '../utils/apiConfig';

// Log environment info for debugging
logEnvironmentInfo();


export const getAllUsers = async () => {
    try {
        const token = getCookie("token");
        console.log("token:", token);
        if (!token) throw new Error("No token found");

        const response = await axios.get(buildUserEndpoint('/users'), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("getAllUsers error:", error);
        throw error;
    }
};

export const getUser = async () => {
    try {
        const userName = getUserNameFromToken();
        const token = getCookie("token");
        const response = await axios.get(buildUserEndpoint('/get-user'), {
            params: { userName },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        return response.data.data;
    } catch (error) {
        console.error("getUser error:", error);
        throw error;
    }
};

export const getUserFormUserName = async (userName) => {
    try {
        const token = getCookie("token");
        const response = await axios.get(buildUserEndpoint('/get-user'), {
            params: { userName },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
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
        const response = await axios.post(buildUserEndpoint('/create-user'), userData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        console.log("Create user: ", response.data);
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
        console.log("data", userData);
        const response = await axios.put(buildUserEndpoint(`/update-user?username=${userData.userName}`), userData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        console.log("updateUser response:", response.data);
        return response.data;
    } catch (error) {
        console.error("updateUser error:", error);
        throw error;
    }
}

export const deleteUser = async (username) => {
    try {
        const token = getCookie("token");
        if (!token) throw new Error("No token found");
        const response = await axios.delete(buildUserEndpoint(`/delete-user?username=${username}`), {
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