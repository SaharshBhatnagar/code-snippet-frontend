import React from 'react';

export default function Header({ searchQuery, setSearchQuery, activeFilter, setActiveFilter }) {
  const categories = ['all', 'react', 'nodejs', 'css', 'python'];

  return (
    <header className="header-container">
      <nav className="navbar">
        <h2>DevHub Snippets</h2>
        <a href="https://github.com" target="_blank" rel="noreferrer">GitHub Repo</a>
      </nav>

      <div className="search-section">
        <h1>Welcome to the Developer Resource Hub</h1>
        <p>Search across components, hooks, and utilities.</p>
        
        <input 
          type="text" 
          className="search-input"
          placeholder="Search snippets..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="category-filters">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}