import axiosClient from "../api/client";
import Cookies from "js-cookie";

export function register({ email, password }) {
  return axiosClient.post("Auth/register", { email, password });
}

export async function login({ email, password }) {
  const response = await axiosClient.post("Auth/login", { email, password });
  const token = response.data.token;

  if (token) {
    Cookies.set("token", token, { expires: 0.5 });
  }

  throw new Error("Login failed.");
}

export function getProfile() {
  return axiosClient.get("/users/profile");
}

//if (token) {
//    localStorage.setItem("jwtToken", token);
 //   const decoded = jwt_decode(token);
//localStorage.setItem("user", JSON.stringify(decoded));
 //   return decoded;
//  }