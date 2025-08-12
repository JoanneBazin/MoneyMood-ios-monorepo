export const TEST_CONFIG = {
  API_URL: "http://localhost:4000",
  TEST_USER: {
    email: "test@example.com",
    password: "Pass1234",
    name: "Test User",
  },
  TIMEOUTS: {
    DEFAULT: 10000,
    LONG: 30000,
  },
};

export const getApiUrl = (endpoint: string) =>
  `${TEST_CONFIG.API_URL}${endpoint}`;
