// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://localhost:7064',
  API_REPORT_URL: 'https://localhost:7064/api/Report',
  TIMEOUT: 50000
};

// Helper function to get full URL for attachments
export const getFullAttachmentUrl = (attachmentPath) => {
  if (!attachmentPath) return '';
  
  // Nếu đã là URL đầy đủ thì return luôn
  if (attachmentPath.startsWith('http')) {
    return attachmentPath;
  }
  
  // Nếu là đường dẫn tương đối thì ghép với base URL
  return `${API_CONFIG.BASE_URL}${attachmentPath}`;
};

