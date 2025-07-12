import axios from 'axios';
import { getCookie } from '../utils/cookie';
import { buildCaseEndpoint, logEnvironmentInfo } from '../utils/apiConfig';

// Log environment info for debugging
logEnvironmentInfo();

//Lưu bảo vệ hiện trường
export const saveSceneProtection = async (formData) => {
    const token = getCookie("token");
    const response = await axios.post(buildCaseEndpoint('/create-protection'), formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};
