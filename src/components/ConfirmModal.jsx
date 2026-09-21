export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
    if (!isOpen) return null;

    const overlayStyle = {
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        backdropFilter: 'blur(4px)'
    };

    const modalStyle = {
        backgroundColor: 'var(--card-col)', padding: '25px', borderRadius: '12px',
        width: '400px', maxWidth: '90%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        textAlign: 'center'
    };

    return (
        <div style={overlayStyle} onClick={onCancel}>
            <div style={modalStyle} onClick={e => e.stopPropagation()}>
                <h3 style={{ marginBottom: '10px', color: 'var(--heading-col)', fontSize: '1.2rem' }}>{title}</h3>
                <p style={{ color: 'var(--desc-col)', marginBottom: '25px', fontSize: '0.95rem' }}>{message}</p>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <button onClick={onCancel} style={{ padding: '8px 20px', borderRadius: '8px', border: '1px solid var(--border-col)', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: 'bold', color: 'var(--desc-col)' }}>
                        Cancel
                    </button>
                    <button onClick={onConfirm} style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--red-col)', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}