import { jwtDecode } from "jwt-decode";
import { getCookie } from "./cookie";

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

export const getUserPermissionsFromToken = () => {
    const decoded = getDecodedToken();
    return decoded?.permissions ?? [];
}