import { apiFetch } from './apiClient';

export async function fetchSnippets() {
    try {
        const data = await apiFetch('/snippets');
        return data;
    } catch (err) {
        console.log('Error fetching data...', err);
        return [];
    }
}

export async function createSnippetApi(snippetData) {
    try {
        const data = await apiFetch('/snippets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(snippetData)
        });
        return { success: true, snippet: data.snippet };
    } catch (err) {
        return { success: false, error: err.error || "Failed to create snippet" };
    }
}

export async function deleteSnippetApi(id) {
    try {
        const data = await apiFetch(`/snippets/${id}`, { method: 'DELETE' });
        return { success: true, ...data };
    } catch (err) {
        return { success: false, error: err.error || "Failed to delete" };
    }
}

export async function toggleFavoriteApi(id) {
    try {
        const data = await apiFetch(`/snippets/${id}/favorite`, { method: 'POST' });
        return { success: true, ...data };
    } catch (err) {
        return { success: false, error: err.error || "Failed to favorite" };
    }
}

export async function fetchUserFavoritesApi() {
    try {
        const data = await apiFetch('/snippets/favorites');
        return data;
    } catch (err) {
        return { res: [] };
    }
}