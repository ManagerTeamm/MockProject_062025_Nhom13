import axios from 'axios';
import { getCookie } from '../utils/cookie';
const API_URL = 'https://localhost:7064/api/Case';

//Lưu bảo vệ hiện trường
export const saveSceneProtection = async (formData) => {
    const token = getCookie("token");
    const response = await axios.post(`${API_URL}/create-protection`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};
