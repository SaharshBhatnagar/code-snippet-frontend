import { useState } from 'react';
import { createSnippetApi } from '../services/searchService';

export default function SnippetModal({ isOpen, onClose, onSnippetCreated, showNotification }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        code: '',
        category: 'react',
        language: 'javascript'
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createSnippetApi(formData);
        
        if (res.success) {
            showNotification("Snippet created successfully!", "success");
            onSnippetCreated(res.snippet);
            setFormData({ title: '', description: '', code: '', category: 'react', language: 'javascript' });
            onClose();
        } else {
            showNotification(res.error, "error");
        }
    };

    const overlayStyle = {
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100,
        display: 'flex', justifyContent: 'center', alignItems: 'center'
    };

    const modalStyle = {
        backgroundColor: 'var(--card-col)', padding: '30px', borderRadius: '12px',
        width: '500px', maxWidth: '90%', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
    };

    const inputStyle = {
        width: '100%', padding: '10px', marginBottom: '15px',
        borderRadius: '8px', border: '1px solid var(--border-col)',
        fontFamily: 'inherit'
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={e => e.stopPropagation()}>
                <h2 style={{ marginBottom: '20px', color: 'var(--heading-col)' }}>Create New Snippet</h2>
                <form onSubmit={handleSubmit}>
                    <input style={inputStyle} type="text" name="title" placeholder="Snippet Title" value={formData.title} onChange={handleChange} required />
                    
                    <input style={inputStyle} type="text" name="description" placeholder="Brief Description" value={formData.description} onChange={handleChange} required />
                    
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select style={inputStyle} name="category" value={formData.category} onChange={handleChange}>
                            <option value="react">React</option>
                            <option value="nodejs">Node.js</option>
                            <option value="python">Python</option>
                            <option value="css">CSS</option>
                            <option value="setup-cmd">Setup Command</option>
                        </select>

                        <select style={inputStyle} name="language" value={formData.language} onChange={handleChange}>
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="css">CSS</option>
                            <option value="html">HTML</option>
                            <option value="yaml">YAML</option>
                        </select>
                    </div>

                    <textarea 
                        style={{ ...inputStyle, minHeight: '150px', resize: 'vertical', fontFamily: 'monospace' }} 
                        name="code" placeholder="Paste your code here..." 
                        value={formData.code} onChange={handleChange} required 
                    />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button type="button" onClick={onClose} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>Cancel</button>
                        <button type="submit" style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: 'var(--primary-col)', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>Save Snippet</button>
                    </div>
                </form>
            </div>
        </div>
    );
}