import { useState } from 'react';
import { postSnippet } from '../services/searchService';

export default function CreateSnippet({ onClose, onCreated, showNotification }) {
    const [formData, setFormData] = useState({ 
        title: '', description: '', code: '', category: 'react' 
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await postSnippet(formData);
        
        if (res.success) {
            showNotification({ message: "Snippet created successfully!", type: 'success' });
            onCreated(); 
            onClose();   
        } else {
            showNotification({ message: res.error, type: 'error' });
        }
    };

    return (
        <div className="modal-active" style={{ zIndex: 100 }}>
            <div className="modal-content" style={{ width: '600px', maxWidth: '90%' }}>
                <h2>Create New Snippet</h2>
                <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    
                    <div className="input-box" style={{ margin: 0 }}>
                        <input type="text" name="title" placeholder=" " required onChange={handleChange} />
                        <label>Title</label>
                    </div>
                    
                    <div className="input-box" style={{ margin: 0 }}>
                        <input type="text" name="description" placeholder=" " required onChange={handleChange} />
                        <label>Description</label>
                    </div>
                    
                    <select name="category" onChange={handleChange} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', backgroundColor: 'transparent' }}>
                        <option value="react">React</option>
                        <option value="nodejs">Node.js</option>
                        <option value="python">Python</option>
                        <option value="css">CSS</option>
                        <option value="setup-cmd">Setup Command</option>
                    </select>
                    
                    <textarea 
                        name="code" 
                        placeholder="Paste your code here..." 
                        required 
                        onChange={handleChange}
                        style={{ padding: '15px', borderRadius: '8px', minHeight: '150px', border: '1px solid #d1d5db', fontFamily: 'monospace', outline: 'none', resize: 'vertical' }}
                    />
                    
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '10px' }}>
                        <button type="button" onClick={onClose} style={{ padding: '10px 24px', borderRadius: '20px', border: '2px solid #cac3c3', color: '#6b7280', background: 'transparent', cursor: 'pointer', fontWeight: 'bold' }}>CANCEL</button>
                        <button type="submit" className="login-button" style={{ width: 'auto', padding: '10px 24px', borderRadius: '20px' }}>SAVE SNIPPET</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}