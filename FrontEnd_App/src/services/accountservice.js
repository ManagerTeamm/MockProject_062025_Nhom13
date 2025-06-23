import axios from 'axios';

const BASE_URL = "https://localhost:7064/api";


export const loginAccount = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/Auth/login`, {
            email,
            password,
        });

        const token = response.data.token;
        return { token, email };
    } catch (error) {
        if (error.response) {
            // Error from the server (e.g., 401 Unauthorized, 400 Bad Request)
            throw new Error(error.response.data.message || "Login failed. Please check your Email and Password.");
        } else if (error.request) {
            // Request was made but no response was received
            throw new Error("Cannot connect to the server. Please try again later.");
        } else {
            // Other error during request setup
            throw new Error("An unexpected error occurred during login.");
        }
    }
};

export const getCurrentUser = () => {
    const account = localStorage.getItem("account");
    if (account) {
        return JSON.parse(account);
    }
    return null;
};

// Register function (if you want to add a registration page later)
export const registerAccount = async (username, email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/Auth/register`, {
            username,
            email,
            password
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            const errors = error.response.data.errors;
            let errorMessage = "Registration failed.";
            if (errors) {
                errorMessage = Object.values(errors).flat().join(". ");
            } else if (error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            throw new Error(errorMessage);
        } else if (error.request) {
            throw new Error("Cannot connect to the server. Please try again later.");
        } else {
            throw new Error("An unexpected error occurred during registration.");
        }
    }
};

// Function to add the authorization token to headers for authenticated requests
export const authHeader = () => {
    const account = getCurrentUser();
    if (account && account.token) {
        return { Authorization: 'Bearer ' + account.token };
    } else {
        return {};
    }
};

// Example of how to call an API that requires authentication
export const getUserProfile = async () => {
    try {
        const headers = authHeader();
        if (Object.keys(headers).length === 0) {
            throw new Error("No authentication token found. Please log in.");
        }
        const response = await axios.get(`${BASE_URL}/Auth/profile`, { headers });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || "Could not retrieve user profile.");
        } else if (error.request) {
            throw new Error("Cannot connect to the server.");
        } else {
            throw new Error("Error retrieving user profile.");
        }
    }
};