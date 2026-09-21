import { useState } from 'react';
import { IoCopyOutline, IoCheckmarkOutline, IoHeartOutline, IoHeart, IoTrashOutline } from 'react-icons/io5';
import { sanitizeHTML } from '../utils/sanitizer';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function SnippetCard({ snippet, currentUser, isFavorite, onToggleFavorite, onDeletePrompt }) {
    const [copied, setCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const getBrandColor = (category) => {
        const cat = category?.toLowerCase();
        if (cat === 'python') return 'var(--google-red)';
        if (cat === 'css') return 'var(--google-yellow)';
        if (cat === 'nodejs' || cat === 'setup-cmd') return 'var(--google-green)';
        return 'var(--google-blue)'; 
    };
    
    const brandColor = getBrandColor(snippet.category);

    const rawCode = snippet.code || '';
    const formattedCode = rawCode.replace(/\\n/g, '\n');
    const lines = formattedCode.split('\n');
    
    const maxLines = 5;
    const isLongCode = lines.length > maxLines || formattedCode.length > 200;
    
    let displayCode = formattedCode;
    if (!isExpanded && isLongCode) {
        if (lines.length > maxLines) {
            displayCode = lines.slice(0, maxLines).join('\n') + '\n...';
        } else {
            displayCode = formattedCode.substring(0, 200) + '...';
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(formattedCode).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => console.error("Failed to copy", err));
    };

    const languageType = snippet.language?.toLowerCase() || 'javascript';
    const isOwner = currentUser?.username === snippet.author;

    return (
        <div className="snippet-card" style={{ borderTop: `4px solid ${brandColor}` }}>
            <div className="card-top">
                <h3 className="card-title" dangerouslySetInnerHTML={{ __html: sanitizeHTML(snippet.title) }} />
                
                <div style={{ display: 'flex', gap: '8px' }}>
                    {isOwner && (
                        <button onClick={() => onDeletePrompt(snippet.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--desc-col)' }}>
                            <IoTrashOutline size={20} />
                        </button>
                    )}
                    
                    <button onClick={() => onToggleFavorite(snippet.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: isFavorite ? brandColor : 'var(--desc-col)' }}>
                        {isFavorite ? <IoHeart size={22} /> : <IoHeartOutline size={22} />}
                    </button>

                    <button onClick={handleCopy} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied ? 'var(--google-green)' : 'var(--desc-col)' }}>
                        {copied ? <IoCheckmarkOutline size={22} /> : <IoCopyOutline size={22} />}
                    </button>
                </div>
            </div>
            
            <p className="card-desc" dangerouslySetInnerHTML={{ __html: sanitizeHTML(snippet.description) }} />
            
            <div style={{ margin: '16px 0', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: `1px solid var(--border-col)` }}>
                    <SyntaxHighlighter 
                        language={languageType === 'setup-cmd' ? 'bash' : languageType} 
                        style={atomDark}
                        customStyle={{ margin: 0, padding: '16px', fontSize: '0.95rem', background: '#1d1f21' }}
                        wrapLongLines={true}
                    >
                        {displayCode}
                    </SyntaxHighlighter>
                </div>
                
                {isLongCode && (
                    <button 
                        onClick={() => setIsExpanded(prev => !prev)} 
                        style={{ color: brandColor, background: 'none', border: 'none', cursor: 'pointer', marginTop: '10px', fontWeight: 'bold', alignSelf: 'flex-start', fontSize: '0.9rem' }}
                    >
                        {isExpanded ? 'See Less' : 'See More'}
                    </button>
                )}
            </div>

            <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: brandColor, fontWeight: '600', fontSize: '0.9rem', textTransform: 'capitalize' }}>
                    {sanitizeHTML(snippet.language)}
                </span>
                <span id="author" style={{ color: 'var(--desc-col)' }}>
                    {sanitizeHTML(snippet.author)}
                </span>
            </div>
        </div>
    );
}