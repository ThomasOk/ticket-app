import axios, { AxiosInstance } from "axios";
import API_CONFIG from "@/config/api";

interface ApiClient
	extends Omit<AxiosInstance, "get" | "post" | "put" | "delete" | "patch"> {
	get<T = any>(url: string): Promise<T>;
	post<T = any>(url: string, data?: any): Promise<T>;
	put<T = any>(url: string, data?: any): Promise<T>;
	delete<T = any>(url: string): Promise<T>;
	patch<T = any>(url: string, data?: any): Promise<T>;
}

export class ApiError extends Error {
	constructor(public status: number, message: string, public data?: unknown) {
		super(message);
	}
}

export const api = axios.create({
	baseURL: API_CONFIG.BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 10000,
}) as ApiClient;

api.interceptors.response.use(
	(response) => response.data,
	(error) => {
		const message = error.response?.data?.message || error.message;
		throw new Error(message);
	}
);
