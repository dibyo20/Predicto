import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/auth"
});

export async function register({ username, email, password }) {
    const response = await api.post("/register", { username, email, password });
    return response.data;
}

export async function login({ username, email, password }) {
    const response = await api.post("/login", { username, email, password });
    return response.data;
}

export async function profile() {
    const response = await api.get("/profile");
    return response.data;
}

export async function logout() {
    const response = await api.post("/logout");
    return response.data;
}