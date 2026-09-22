import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import ResetPassword from './pages/ResetPassword';

export default function App() {
    return (
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
    );
}