import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authService';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';

export default function Navbar({ user }) {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            setIsDarkMode(true);
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    const handleLogout = async () => {
        await logoutUser();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="nav-element">
                <h2 id="title">Code Snippets</h2>
            </div>
            <div className="nav-element" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                
                <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--black-col)', display: 'flex', alignItems: 'center' }}>
                    {isDarkMode ? <IoSunnyOutline size={22} /> : <IoMoonOutline size={22} />}
                </button>

                {user ? (
                    <>
                        <span id="user-name">{user.username}</span>
                        <button id="log-out" onClick={handleLogout}>Log out</button>
                    </>
                ) : (
                    <>
                        <button 
                            onClick={() => navigate('/login', { state: { mode: 'signIn' } })}
                            style={{ background: 'none', border: 'none', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', color: 'var(--black-col)', letterSpacing: '1px' }}
                        >
                            Sign In
                        </button>
                        
                        <p style={{ margin: '0' }}>or</p>
                        
                        <button 
                            onClick={() => navigate('/login', { state: { mode: 'signUp' } })}
                            style={{ background: 'none', border: 'none', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', color: 'var(--black-col)', letterSpacing: '1px' }}
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}