export async function apiFetch(route, options = {}) {
    try {
        const endpoint = `${import.meta.env.VITE_API_URL}${route}`;
        
        const fetchOption = {
            ...options,
            credentials: 'include',
            cache: 'no-store'
        };

        const response = await fetch(endpoint, fetchOption);

        if (response.status === 401) {
            window.location.href = '/login';
            return;
        }

        const data = await response.json();
        
        if (!response.ok) {
            throw data;
        }
        
        return data;
    } catch (err) {
        throw err;
    }
}