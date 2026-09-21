import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser, registerUser, forgotPasswordApi } from '../services/authService'; // Imported new API
import Navbar from '../components/Navbar';
import Popup from '../components/Popup';

export default function Auth() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [isLogin, setIsLogin] = useState(location.state?.mode !== 'signUp');
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        if (location.state?.mode === 'signUp') {
            setIsLogin(false);
        } else if (location.state?.mode === 'signIn') {
            setIsLogin(true);
        }
    }, [location.state]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleToggle = (e) => {
        e.preventDefault();
        setIsLogin(prev => !prev);
        setFormData({ username: '', email: '', password: '' }); 
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isLogin) {
            const res = await loginUser(formData.email, formData.password);
            if (res.success) {
                navigate('/dashboard');
            } else {
                showNotification(res.error, 'error');
            }
        } else {
            const res = await registerUser(formData.username, formData.email, formData.password);
            if (res.success) {
                showNotification("Registration successful! Redirecting to login...", 'success');
                setFormData({ username: '', email: '', password: '' });
                
                setTimeout(() => {
                    setIsLogin(true);
                }, 2000);
            } else {
                showNotification(res.error, 'error');
            }
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        
        if (!formData.email) {
            showNotification("Please enter your email in the field above first.", "error");
            return;
        }

        const res = await forgotPasswordApi(formData.email);
        
        if (res.success) {
            showNotification(res.message, "success");
        } else {
            showNotification(res.error, "error");
        }
    };

    return (
        <>
            <Navbar user={null} />
            <Popup message={notification.message} type={notification.type} />
            <main>
                <div className={`wrapper ${!isLogin ? 'active' : ''}`}>
                    <section className={`form-box ${isLogin ? 'login' : 'register'}`}>
                        <h2>{isLogin ? 'Login' : 'Registration'}</h2>
                        <form onSubmit={handleSubmit}>
                            {!isLogin && (
                                <div className="input-box">
                                    <input type="text" name="username" value={formData.username} placeholder=" " required={!isLogin} onChange={handleChange} />
                                    <label>Username</label>
                                </div>
                            )}
                            <div className="input-box">
                                <input type="email" name="email" value={formData.email} placeholder=" " required onChange={handleChange} />
                                <label>Email</label>
                            </div>
                            <div className="input-box">
                                <input type="password" name="password" value={formData.password} placeholder=" " required onChange={handleChange} />
                                <label>Password</label>
                            </div>
                            
                            {isLogin && (
                                <div className="forgot-password">
                                    <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
                                </div>
                            )}

                            <button type="submit" className={isLogin ? "login-button" : "register-button"}>
                                {isLogin ? 'Login' : 'Create Account'}
                            </button>
                            <div className="login-register">
                                <p>
                                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                                    <a href="#" onClick={handleToggle}>
                                        {isLogin ? 'Register' : 'Login'}
                                    </a>
                                </p>
                            </div>
                        </form>
                    </section>
                </div>
            </main>
        </>
    );
}