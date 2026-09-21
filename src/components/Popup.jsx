import { sanitizeHTML } from '../utils/sanitizer';

export default function Popup({ message, type }) {
    if (!message) return null;

    const popupStyle = {
        padding: '20px',
        borderRadius: '20px',
        color: '#ffffff',
        boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.2), -4px -4px 4px rgba(0, 0, 0, 0.2)',
        backgroundColor: type === 'success' ? '#10b981' : 'rgb(221, 30, 30)',
        transition: '0.3s ease-in'
    };

    return (
        <div className="pop-up-container">
            <div style={popupStyle} dangerouslySetInnerHTML={{ __html: sanitizeHTML(message) }} />
        </div>
    );
}