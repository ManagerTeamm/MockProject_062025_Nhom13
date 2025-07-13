// API Configuration for different environments
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';


// Environment-specific configurations
const ENVIRONMENTS = {
  development: {
    BASE_URL: 'https://localhost:7064',
    API_URL: 'https://localhost:7064/api',
  },
  production: {
    BASE_URL: '/api',  // Use nginx proxy
    API_URL: '/api',   // Use nginx proxy
  }
};

// Get current environment config
const getCurrentConfig = () => {
  
  if (isDevelopment) {
    return ENVIRONMENTS.development;
  }
  if (isProduction) {
    return ENVIRONMENTS.production;
  }
  // Fallback to production config
  return ENVIRONMENTS.production;
};

const currentConfig = getCurrentConfig();

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || currentConfig.BASE_URL,
  API_URL: process.env.REACT_APP_API_URL || currentConfig.API_URL,
  
  // Specific endpoint URLs - Use consistent base URL
  AUTH_URL: `${process.env.REACT_APP_API_URL || currentConfig.BASE_URL}/api/Auth`,
  USER_URL: `${process.env.REACT_APP_API_URL || currentConfig.BASE_URL}/api/User`,
  CASE_URL: `${process.env.REACT_APP_API_URL || currentConfig.BASE_URL}/api/Case`,
  REPORT_URL: `${process.env.REACT_APP_API_URL || currentConfig.BASE_URL}/api/Report`,
  EVIDENCE_URL: `${process.env.REACT_APP_API_URL || currentConfig.BASE_URL}/api/Evidence`,
  SUSPECT_URL: `${process.env.REACT_APP_API_URL || currentConfig.BASE_URL}/api/Suspect`,
  INITIAL_RESPONSE_URL: `${process.env.REACT_APP_API_URL || currentConfig.BASE_URL}/api/initial-response`,
  PATROL_OFFICER_URL: `${process.env.REACT_APP_API_URL || currentConfig.BASE_URL}/api/PatrolOfficerUser`,
  
  TIMEOUT: 50000,
  
};

// Legacy support for existing API_REPORT_URL
export const API_REPORT_URL = API_CONFIG.REPORT_URL;

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

// Helper function to log current environment (for debugging)
export const logEnvironmentInfo = () => {
  console.log('🔧 API Configuration:');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('Window location:', window.location.hostname + ':' + window.location.port);
  console.log('Environment used:', isDevelopment ? 'development' : isProduction ? 'production' : 'unknown');
  console.log('Base URL:', API_CONFIG.BASE_URL);
  console.log('API URL:', API_CONFIG.API_URL);
  console.log('AUTH URL:', API_CONFIG.AUTH_URL); // Thêm log cho AUTH URL
};

// Export specific endpoint builders
export const buildEndpoint = (path) => `${API_CONFIG.API_URL}${path}`;
export const buildAuthEndpoint = (path) => `${API_CONFIG.AUTH_URL}${path}`;
export const buildUserEndpoint = (path) => `${API_CONFIG.USER_URL}${path}`;
export const buildCaseEndpoint = (path) => `${API_CONFIG.CASE_URL}${path}`;
export const buildReportEndpoint = (path) => `${API_CONFIG.REPORT_URL}${path}`;
export const buildEvidenceEndpoint = (path) => `${API_CONFIG.EVIDENCE_URL}${path}`;
export const buildSuspectEndpoint = (path) => `${API_CONFIG.SUSPECT_URL}${path}`;
export const buildInitialResponseEndpoint = (path) => `${API_CONFIG.INITIAL_RESPONSE_URL}${path}`;
export const buildPatrolOfficerEndpoint = (path) => `${API_CONFIG.PATROL_OFFICER_URL}${path}`;

