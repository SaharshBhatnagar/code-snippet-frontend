import { useState, useEffect } from 'react';
import { fetchSnippets } from '../services/searchService';
import Navbar from '../components/Navbar';
import SnippetCard from '../components/SnippetCard';

export default function Landing() {
    const [snippets, setSnippets] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        async function loadData() {
            const data = await fetchSnippets();
            setSnippets(data || []);
        }
        loadData();
    }, []);

    const filteredSnippets = snippets.filter(snippet => {
        const matchesSearch = snippet.title?.toLowerCase().includes(searchQuery) || snippet.description?.toLowerCase().includes(searchQuery);
        const matchesFilter = activeFilter === 'all' || snippet.category === activeFilter;
        return matchesSearch && matchesFilter;
    });

    const categories = ['all', 'react', 'nodejs', 'setup-cmd', 'python'];

    return (
        <>
            <Navbar user={null} />
            <header className="search-header">
                <div className="header-content">
                    <h1 id="heading">Welcome to the Developer Resource Hub</h1>
                    <p id="heading-description">Search across components, hooks, utilities, and configuration files. <br/> Sign in to save and share your favorites.</p>
                    <div className="search-wrapper">
                        <input 
                            type="text" 
                            id="search-input" 
                            placeholder="Search snippets (e.g., 'Authentication')..." 
                            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                        />
                    </div>
                </div>
            </header>
            
            <section id="snippet-catagories">
                {categories.map(cat => (
                    <div className="snippet-container" key={cat}>
                        <button 
                            className={activeFilter === cat ? 'active' : ''} 
                            onClick={() => setActiveFilter(cat)}
                        >
                            {cat === 'setup-cmd' ? 'SetUp Command' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    </div>
                ))}
            </section>

            <main className="snippet-result">
                {filteredSnippets.length === 0 ? (
                    <div id="empty-state">NO SNIPPETS FOUND</div>
                ) : (
                    <div id="results-grid">
                        {filteredSnippets.map(snippet => (
                            <SnippetCard key={snippet.id} snippet={snippet} />
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}