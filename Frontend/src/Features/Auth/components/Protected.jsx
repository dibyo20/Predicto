import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom';
import { DashboardSkeleton } from './Skeletons';

const Protected = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <DashboardSkeleton />;
    }

    if (!loading && !user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default Protected