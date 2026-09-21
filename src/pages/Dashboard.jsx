import { useState, useEffect } from 'react';
import { fetchSnippets, fetchUserFavoritesApi, toggleFavoriteApi, deleteSnippetApi } from '../services/searchService';
import { sessionVerifing } from '../services/authService';
import Navbar from '../components/Navbar';
import SnippetCard from '../components/SnippetCard';
import SnippetModal from '../components/SnippetModal';
import ConfirmModal from '../components/ConfirmModal';
import Popup from '../components/Popup';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [snippets, setSnippets] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [snippetToDelete, setSnippetToDelete] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        async function loadData() {
            const authRes = await sessionVerifing();
            if (authRes.success) {
                setUser(authRes.user);
                const favData = await fetchUserFavoritesApi();
                if (favData && favData.res) {
                    setFavoriteIds(favData.res.map(s => s.id));
                }
            }
            
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

    const handleSnippetCreated = (newSnippet) => {
        setSnippets(prev => [newSnippet, ...prev]);
    };

    const handleToggleFavorite = async (snippetId) => {
        const isFav = favoriteIds.includes(snippetId);
        setFavoriteIds(prev => isFav ? prev.filter(id => id !== snippetId) : [...prev, snippetId]);
        
        const res = await toggleFavoriteApi(snippetId);
        if (!res.success) {
            setFavoriteIds(prev => isFav ? [...prev, snippetId] : prev.filter(id => id !== snippetId));
            showNotification(res.error, "error");
        }
    };

    const confirmDelete = async () => {
        if (!snippetToDelete) return;
        const res = await deleteSnippetApi(snippetToDelete);
        if (res.success) {
            showNotification("Snippet deleted successfully.", "success");
            setSnippets(prev => prev.filter(s => s.id !== snippetToDelete));
            setFavoriteIds(prev => prev.filter(id => id !== snippetToDelete));
            if (activeFilter === 'favorites' && favoriteIds.length === 1) {
                setActiveFilter('all');
            }
        } else {
            showNotification(res.error, "error");
        }
        setSnippetToDelete(null);
    };

    const filteredSnippets = snippets.filter(snippet => {
        const matchesSearch = snippet.title?.toLowerCase().includes(searchQuery) || snippet.description?.toLowerCase().includes(searchQuery);
        
        let matchesFilter = true;
        if (activeFilter === 'my snippets') {
            matchesFilter = snippet.author === user?.username;
        } else if (activeFilter === 'favorites') {
            matchesFilter = favoriteIds.includes(snippet.id);
        } else if (activeFilter !== 'all') {
            matchesFilter = snippet.category === activeFilter;
        }
        
        return matchesSearch && matchesFilter;
    });

    let categories = ['all', 'my snippets'];
    if (favoriteIds.length > 0) {
        categories.push('favorites');
    }
    categories.push('react', 'nodejs', 'setup-cmd', 'python', 'css');

    return (
        <>
            <Navbar user={user} />
            <Popup message={notification.message} type={notification.type} />
            
            <SnippetModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSnippetCreated={handleSnippetCreated}
                showNotification={showNotification}
            />

            <ConfirmModal 
                isOpen={!!snippetToDelete}
                title="Delete Snippet"
                message="Are you sure you want to delete this snippet? This action cannot be undone."
                onCancel={() => setSnippetToDelete(null)}
                onConfirm={confirmDelete}
            />
            
            <header className="search-header">
                <div className="header-content">
                    <h1 id="heading">What are you looking for today?</h1>
                    <p id="heading-description">Search across components, hooks, utilities, and configuration files.</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '700px', margin: '0 auto' }}>
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
            
            <section id="snippet-catagories" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', flexWrap: 'wrap', marginTop: '2rem' }}>
                {categories.map(cat => (
                    <div className="snippet-container" key={cat}>
                        <button 
                            className={activeFilter === cat ? 'active' : ''} 
                            onClick={() => setActiveFilter(cat)}
                        >
                            {cat === 'setup-cmd' ? 'SetUp Command' : cat === 'css' ? 'CSS' : cat === 'my snippets' ? 'My Snippets' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    </div>
                ))}

                <div className="snippet-container">
                    <button 
                        className="new-snippet-btn"
                        onClick={() => setIsModalOpen(true)}
                    >
                        + New Snippet
                    </button>
                </div>
            </section>

            <main className="snippet-result">
                {isLoading ? (
                    <div id="empty-state">Loading snippets...</div>
                ) : filteredSnippets.length === 0 ? (
                    <div id="empty-state">NO SNIPPETS FOUND</div>
                ) : (
                    <div id="results-grid">
                        {filteredSnippets.map(snippet => (
                            <SnippetCard 
                                key={snippet.id} 
                                snippet={snippet} 
                                currentUser={user}
                                isFavorite={favoriteIds.includes(snippet.id)}
                                onToggleFavorite={handleToggleFavorite}
                                onDeletePrompt={setSnippetToDelete}
                                showNotification={showNotification}
                            />
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}