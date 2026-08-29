import { useState } from 'react';
import { IoCopyOutline, IoCheckmarkOutline } from 'react-icons/io5';
import { sanitizeHTML } from '../utils/sanitizer';

export default function SnippetCard({ snippet }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(snippet.code || '').then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => console.error("Failed to copy", err));
    };

    return (
        <div className="snippet-card">
            <div className="card-top">
                <h3 className="card-title" dangerouslySetInnerHTML={{ __html: sanitizeHTML(snippet.title) }} />
                <button onClick={handleCopy} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied ? '#10b981' : '#62647c' }}>
                    {copied ? <IoCheckmarkOutline size={24} /> : <IoCopyOutline size={24} />}
                </button>
            </div>
            <p className="card-desc" dangerouslySetInnerHTML={{ __html: sanitizeHTML(snippet.description) }} />
            <div className="card-footer">
                <span className="category-tag">{sanitizeHTML(snippet.category)}</span>
                <span id="author">{sanitizeHTML(snippet.author)}</span>
            </div>
        </div>
    );
}