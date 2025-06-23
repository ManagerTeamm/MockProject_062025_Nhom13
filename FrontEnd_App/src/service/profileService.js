const API_BASE_URL = 'https://localhost:7064/api';

export const profileService = {
  // Lấy thông tin profile người dùng
  getProfile: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Profile?token=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
      }

      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }
};