export const loginAccount = async (email, password) => {
  //const url = "https://193a-14-186-91-164.ngrok-free.app/api/Auth/login";
  const url = "https://localhost:7064/api/Auth/login";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }), //account, result đọc account header nên lỗi
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
