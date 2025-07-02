const Api_Url = 'https://localhost:7064/api/Admin';

export const getAllUsers = async () => {
    try {
        const response = await fetch(`${Api_Url}/users`);
        if (!response.ok) throw new Error('Failed to fetch users');

        const users = await response.json();
        return users.data;
    } catch (error) {
        console.error('getAllUsers error:', error);
        throw error;
    }
};
