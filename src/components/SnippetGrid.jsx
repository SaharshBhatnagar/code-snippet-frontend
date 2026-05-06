import React from 'react';
import SnippetCard from './snippetCard';

export default function SnippetGrid({ snippets }) {
  if (snippets.length === 0) {
    return <div className="empty-state">No snippets found matching your criteria.</div>;
  }

  return (
    <main className="results-grid">
      {snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </main>
  );
}