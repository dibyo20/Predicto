import { useContext } from 'react';
import { AuthContext } from '../auth.context.jsx';
import { register, login, logout } from "../services/auth.api.js";

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context;

    async function handleRegister({ username, email, password }) {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            setUser(data.user);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function handleLogin({ username, email, password }) {
        setLoading(true);
        try {
            const data = await login({ username, email, password });
            setUser(data.user);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function handleLogout() {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout,
    }
};