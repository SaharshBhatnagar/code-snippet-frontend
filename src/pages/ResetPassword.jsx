import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPasswordApi } from '../services/authService';
import Navbar from '../components/Navbar';
import Popup from '../components/Popup';
import '../styles/signin-and-signup.css';

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!token) {
            return showNotification("Invalid password reset link.", "error");
        }
        
        if (newPassword !== confirmPassword) {
            return showNotification("Passwords do not match.", "error");
        }

        const res = await resetPasswordApi(token, newPassword);
        
        if (res.success) {
            showNotification("Password reset successfully. Redirecting to login...", "success");
            setTimeout(() => {
                navigate('/login', { state: { mode: 'signIn' } });
            }, 2000);
        } else {
            showNotification(res.error, "error");
        }
    };

    return (
        <>
            <Navbar user={null} />
            <Popup message={notification.message} type={notification.type} />
            <main>
                <div className="wrapper">
                    <section className="form-box login">
                        <h2>Set New Password</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-box">
                                <input 
                                    type="password" 
                                    placeholder=" " 
                                    value={newPassword} 
                                    required 
                                    onChange={(e) => setNewPassword(e.target.value)} 
                                />
                                <label>New Password</label>
                            </div>
                            <div className="input-box">
                                <input 
                                    type="password" 
                                    placeholder=" " 
                                    value={confirmPassword} 
                                    required 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                />
                                <label>Confirm Password</label>
                            </div>
                            <button type="submit" className="login-button">
                                Reset Password
                            </button>
                        </form>
                    </section>
                </div>
            </main>
        </>
    );
}