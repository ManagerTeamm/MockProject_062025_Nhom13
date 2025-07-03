import axios from "axios";

const API_URL = "https://localhost:7064/api/Auth";

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data.token;
};