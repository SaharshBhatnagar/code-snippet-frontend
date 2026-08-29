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