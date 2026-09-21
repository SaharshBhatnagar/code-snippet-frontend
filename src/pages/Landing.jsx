import { useState, useEffect } from 'react';
import { fetchSnippets } from '../services/searchService';
import Navbar from '../components/Navbar';
import SnippetCard from '../components/SnippetCard';
import Popup from '../components/Popup';

export default function Landing() {
    const [snippets, setSnippets] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        async function loadData() {
            const data = await fetchSnippets();
            setSnippets(data || []);
            setIsLoading(false);
        }
        loadData();
    }, []);

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    };

    const filteredSnippets = snippets.filter(snippet => {
        const matchesSearch = snippet.title?.toLowerCase().includes(searchQuery) || snippet.description?.toLowerCase().includes(searchQuery);
        const matchesFilter = activeFilter === 'all' || snippet.category === activeFilter;
        return matchesSearch && matchesFilter;
    });

    const categories = ['all', 'react', 'nodejs', 'setup-cmd', 'python', 'css'];

    return (
        <>
            <Navbar user={null} />
            <Popup message={notification.message} type={notification.type} />
            
            <header className="search-header">
                <div className="header-content">
                    <h1 id="heading">Welcome to the Developer Resource Hub</h1>
                    <p id="heading-description">Search across components, hooks, utilities, and configuration files. <br/> Sign in to save and share your favorites.</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '900px', margin: '0 auto' }}>
                        <div className="search-wrapper" style={{ flexGrow: 1, margin: 0 }}>
                            <input 
                                type="text" 
                                id="search-input" 
                                placeholder="Search snippets (e.g., 'Authentication')..." 
                                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                            />
                        </div>
                    </div>
                </div>
            </header>
            
            <section id="snippet-catagories" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '2rem' }}>
                {categories.map(cat => (
                    <div className="snippet-container" key={cat}>
                        <button 
                            className={activeFilter === cat ? 'active' : ''} 
                            onClick={() => setActiveFilter(cat)}
                        >
                            {cat === 'setup-cmd' ? 'SetUp Command' : cat === 'css' ? 'CSS' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    </div>
                ))}
            </section>

            <main className="snippet-result">
                {isLoading ? (
                    <div id="empty-state">Loading snippets...</div>
                ) : filteredSnippets.length === 0 ? (
                    <div id="empty-state">NO SNIPPETS FOUND</div>
                ) : (
                    <div id="results-grid">
                        {filteredSnippets.slice(0, 6).map(snippet => (
                            <SnippetCard 
                                key={snippet.id} 
                                snippet={snippet} 
                                currentUser={null} 
                                isFavorite={false}
                                onToggleFavorite={() => showNotification("Please sign in to save favorites.", "error")}
                                onDeletePrompt={() => {}}
                                showNotification={showNotification}
                            />
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}