import { getUserNameFromToken } from "../utils/jwt";
const Api_Url = "https://localhost:7064/api/Auth";

export const loginAccount = async(userName, password) => {
 
  try {
      const response = await fetch(`${Api_Url}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password }), //account, result đọc account header nên lỗi
    });

    if (!response.ok) {
      throw new Error("Invalid email or password");
    }

    const account = await response.json();
    return account;
  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
    try {
        const userName = getUserNameFromToken();
        const response = await fetch(`${Api_Url}/get-user?userName=${userName}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("User not found");
        }

        const user = await response.json();
        return user.data;
    } catch (error) {
        console.error("getUser error:", error);
        throw error;
    }
}