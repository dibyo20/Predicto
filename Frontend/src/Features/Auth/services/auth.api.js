import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
    withCredentials: true
});

export async function register({ username, email, password }) {
    const response = await api.post("/auth/register", { username, email, password });
    return response.data;
}

export async function login({ username, email, password }) {
    const response = await api.post("/auth/login", { username, email, password });
    return response.data;
}

export async function profile() {
    const response = await api.get("/auth/profile");
    return response.data;
}

export async function logout() {
    const response = await api.post("/auth/logout");
    return response.data;
}