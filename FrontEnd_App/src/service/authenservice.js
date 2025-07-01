import axios from "axios";

const API_URL = "https://localhost:7064/api/Auth";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data.token;
};