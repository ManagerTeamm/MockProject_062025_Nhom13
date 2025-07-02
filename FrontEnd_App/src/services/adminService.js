const Api_Url = 'https://localhost:7064/api/Admin';

export const getAllUsers = async () => {
    try {
        const response = await fetch(`${Api_Url}/users`);
        if (!response.ok) throw new Error('Failed to fetch users');
        return await response.json();
    } catch (error) {
        console.error('getAllUsers error:', error);
        throw error;
    }
};
