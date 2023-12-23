import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hook/useAuth";

interface AdminRouteProps {
    children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {

        // return <Loader></Loader>
        return <div>Loading...</div>
    }

    if (user && user.role === 'admin') {
        return children;
    }

    return <Navigate to='/login-signup' state={{ from: location }} replace />
};

export default AdminRoute;