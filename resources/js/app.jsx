import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthProvider, { AuthContext } from './components/context/AuthContext'; 
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import '../css/app.css';
import { createRoot } from 'react-dom/client';

export default function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Guest Routes: Can't Access If Already Logged In */}
                    <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />
                    <Route path="/register" element={<GuestOnly><Register /></GuestOnly>} />

                    {/* Protected Routes: Only Accessible If Logged In */}
                    <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

function GuestOnly({ children }) {
    const { user } = useContext(AuthContext);
    return user ? <Navigate to="/dashboard" /> : children;
}

function Protected({ children }) {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
