import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hook/useAuth";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        console.log('loading')
        // return <Loader></Loader>
        return <div>Loading...</div>
    }

    if (user) {
        return children;
    }

    return <Navigate to='/login-signup' state={{ from: location }} replace />
};

export default ProtectedRoute;