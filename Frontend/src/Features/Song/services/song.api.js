import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
    withCredentials: true
});

export async function getSongs({ mood }) {
    const res = await api.get(`/songs?mood=${mood}`);
    return res.data;
}

export default api;
