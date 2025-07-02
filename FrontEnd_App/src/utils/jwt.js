import { jwtDecode } from "jwt-decode";

export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
};

const getDecodedToken = () => {
    const token = getCookie("token");
    if (!token) return null;

    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};

export const getUserRoleFromToken = () => {
    const decoded = getDecodedToken();
    return decoded?.role ?? null;
};

export const getUserNameFromToken = () => {
    const decoded = getDecodedToken();
    return decoded?.name ?? null;
};
