const API_CONFIG = {
	BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
} as const;

export default API_CONFIG;
