export function sanitizeHTML(unsafeText) {
    if (!unsafeText) return '';
    const tempDiv = document.createElement('div');
    tempDiv.textContent = unsafeText;
    return tempDiv.innerHTML;
}