import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SnippetGrid from './components/SnippetGrid';
import { mockSnippets } from './data/mockData';
import './App.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredSnippets = useMemo(() => {
    return mockSnippets.filter(snippet => {
      const matchesSearch = snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            snippet.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeFilter === 'all' || snippet.category === activeFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeFilter]);

  return (
    <div className="app-container">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <SnippetGrid snippets={filteredSnippets} />
    </div>
  );
}