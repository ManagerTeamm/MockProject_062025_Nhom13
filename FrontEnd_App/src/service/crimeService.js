// src/service/crimeService.js
import axios from 'axios';

// Ensure your backend server is running on this port
const API_BASE_URL = 'http://localhost:3000/api/crimes';

export const getCrimes = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching crimes:', error);
        throw error; // Re-throw to be handled by the component
    }
};

export const getCrimeById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching crime ${id}:`, error);
        throw error;
    }
};

export const createCrime = async (crimeData) => {
    try {
        const response = await axios.post(API_BASE_URL, crimeData);
        return response.data;
    } catch (error) {
        console.error('Error creating crime:', error);
        throw error;
    }
};

export const updateCrime = async (id, crimeData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, crimeData);
        return response.data;
    } catch (error) {
        console.error(`Error updating crime ${id}:`, error);
        throw error;
    }
};

export const deleteCrime = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting crime ${id}:`, error);
        throw error;
    }
};

// The temporary data endpoints are no longer needed on the frontend as React state manages temporary data.