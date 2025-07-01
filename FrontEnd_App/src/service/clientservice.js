import axiosClient from "../api/client";

export function register({ email, password }) {
  return axiosClient.post("auth/register", { email, password });
}

export function login({ email, password }) {
  return axiosClient.post("auth/login", { email, password });
}

export function getProfile() {
  return axiosClient.get("/users/profile");
}