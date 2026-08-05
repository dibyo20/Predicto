import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
});

export async function getSongs({ mood }) {
    const res = await api.get(`/songs?mood=${mood}`);
    return res.data;
}

export default api;
