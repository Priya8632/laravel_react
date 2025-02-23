import { useContext } from 'react';
import { AuthContext } from '../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="auth-container">
            <h2>Welcome, {user?.name}!</h2>
            <p>Your email: {user?.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
