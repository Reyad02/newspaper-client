import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const AdminPrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, adminLoading] = useAdmin(user?.email);
    const location = useLocation();
    if (adminLoading || loading) {
        return <div className='flex justify-center'><span className="loading loading-bars loading-lg"></span></div>
    }
    if (isAdmin && user) {
        return children;
    }
    return <Navigate to={"/login"} state={location.pathname}></Navigate>
};

export default AdminPrivateRoute;