import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser, registerUser, forgotPasswordApi } from '../services/authService';
import Navbar from '../components/Navbar';
import Popup from '../components/Popup';

export default function Auth() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [isLogin, setIsLogin] = useState(location.state?.mode !== 'signUp');
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [notification, setNotification] = useState({ message: '', type: '' });
    
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [resetEmail, setResetEmail] = useState('');

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

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        
        if (!resetEmail) {
            showNotification("Please enter an email address.", "error");
            return;
        }

        const res = await forgotPasswordApi(resetEmail);
        
        if (res.success) {
            showNotification(res.message, "success");
            setShowForgotModal(false);
            setResetEmail('');
        } else {
            showNotification(res.error, "error");
        }
    };


    return (
        <>
            <Navbar user={null} />
            <Popup message={notification.message} type={notification.type} />
            
            {showForgotModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    backdropFilter: 'blur(4px)'
                }} onClick={() => setShowForgotModal(false)}>
                    <div style={{
                        backgroundColor: 'var(--card-col)', padding: '30px', borderRadius: '12px',
                        width: '400px', maxWidth: '90%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        textAlign: 'center', border: '1px solid var(--border-col)'
                    }} onClick={e => e.stopPropagation()}>
                        
                        <h3 style={{ marginBottom: '15px', color: 'var(--heading-col)', fontSize: '1.4rem' }}>Reset Password</h3>
                        <p style={{ color: 'var(--desc-col)', marginBottom: '25px', fontSize: '0.95rem' }}>
                            Enter your account email address to receive a secure reset link.
                        </p>
                        
                        <form onSubmit={handleForgotPasswordSubmit}>
                            <input 
                                type="email" 
                                placeholder="Email address" 
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                required
                                style={{
                                    width: '100%', padding: '12px 15px', marginBottom: '25px',
                                    borderRadius: '8px', border: '1px solid var(--border-col)',
                                    backgroundColor: 'transparent', color: 'var(--heading-col)',
                                    outline: 'none', fontSize: '1rem'
                                }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                                <button type="button" onClick={() => setShowForgotModal(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--border-col)', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: 'bold', color: 'var(--desc-col)', flexGrow: 1 }}>
                                    Cancel
                                </button>
                                <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--primary-col)', color: 'white', cursor: 'pointer', fontWeight: 'bold', flexGrow: 1 }}>
                                    Send Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
                                    <a href="#" onClick={(e) => { e.preventDefault(); setShowForgotModal(true); }}>Forgot Password?</a>
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