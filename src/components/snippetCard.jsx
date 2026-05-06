import React, { useState } from 'react';

export default function SnippetCard({ snippet }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="snippet-card">
      <div className="card-top">
        <h3>{snippet.title}</h3>
        <button onClick={handleCopy} className="copy-btn">
          <ion-icon name={copied ? "checkmark-outline" : "copy-outline"}></ion-icon>
        </button>
      </div>
      <p className="card-desc">{snippet.description}</p>
      <div className="code-preview">
        <code>{snippet.code}</code>
      </div>
      <div className="card-footer">
        <span className="category-tag">{snippet.category}</span>
        <span>{snippet.author}</span>
      </div>
    </div>
  );
}