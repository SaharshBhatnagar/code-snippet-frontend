import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/authService';
import Navbar from '../components/Navbar';

export default function Auth() {
    const location = useLocation();
    const navigate = useNavigate();
    const initialMode = location.state?.mode === 'signUp' ? false : true;
    
    const [isLogin, setIsLogin] = useState(initialMode);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            const res = await loginUser(formData.email, formData.password);
            if (res.success) {
                navigate('/dashboard');
            } else {
                alert(res.error);
            }
        } else {
            const res = await registerUser(formData.username, formData.email, formData.password);
            if (res.success) {
                alert("Account created. Please log in.");
                setIsLogin(true);
            } else {
                alert(res.error);
            }
        }
    };

    return (
        <>
            <Navbar user={null} />
            <main>
                <div className={`wrapper ${!isLogin ? 'active' : ''}`}>
                    <section className={`form-box ${isLogin ? 'login' : 'register'}`}>
                        <h2>{isLogin ? 'Login' : 'Registration'}</h2>
                        <form onSubmit={handleSubmit}>
                            {!isLogin && (
                                <div className="input-box">
                                    <input type="text" name="username" placeholder=" " required={!isLogin} onChange={handleChange} />
                                    <label>Username</label>
                                </div>
                            )}
                            <div className="input-box">
                                <input type="email" name="email" placeholder=" " required onChange={handleChange} />
                                <label>Email</label>
                            </div>
                            <div className="input-box">
                                <input type="password" name="password" placeholder=" " required onChange={handleChange} />
                                <label>Password</label>
                            </div>
                            <button type="submit" className={isLogin ? "login-button" : "register-button"}>
                                {isLogin ? 'Login' : 'Create Account'}
                            </button>
                            <div className="login-register">
                                <p>
                                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                                    <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }}>
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