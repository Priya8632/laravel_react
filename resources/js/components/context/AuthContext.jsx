import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://127.0.0.1:8000/api/user', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                setUser(response.data);
            }).catch(() => {
                logout();
            });
        }
    }, []);

    const login = async (credentials) => {
        const { data } = await axios.post('http://127.0.0.1:8000/api/login', credentials);
        localStorage.setItem('token', data.token);
        setUser(data.user);
        navigate('/dashboard'); // Redirect to Dashboard after login
    };

    const register = async (userData) => {
        const { data } = await axios.post('http://127.0.0.1:8000/api/register', userData);
        localStorage.setItem('token', data.token);
        setUser(data.user);
        navigate('/login'); // Redirect to Dashboard after register
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login'); // Redirect to Login after logout
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
