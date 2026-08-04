import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom';

const Protected = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className='loading' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#fff', fontSize: '2rem' }}>
                <p>Loading...</p>
            </div>
        )
    }

    if (!loading && !user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default Protected