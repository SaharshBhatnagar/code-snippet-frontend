import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authService';

export default function Navbar({ user }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="nav-element">
                <h2 id="title">Code Snippets</h2>
            </div>
            <div className="nav-element">
                {user ? (
                    <>
                        <span id="user-name">{user.username}</span>
                        <button id="log-out" onClick={handleLogout}>Log out</button>
                    </>
                ) : (
                    <>
                        <Link id="sign-in" to="/login" state={{ mode: 'signIn' }}>Sign In</Link>
                        <p style={{ margin: '0 8px' }}>or</p>
                        <Link id="sign-up" to="/login" state={{ mode: 'signUp' }}>Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}