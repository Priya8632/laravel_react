import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function GuestRoute({ children }) {
    const { user } = useContext(AuthContext);

    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return children;
}
