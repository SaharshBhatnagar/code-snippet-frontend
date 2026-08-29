import { apiFetch } from './apiClient';

export async function loginUser(email, password) {
    try {
        const data = await apiFetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return { success: true, userName: data.userName };
    } catch (err) {
        return { success: false, error: "Failed to connect to server" };
    }
}

export async function registerUser(username, email, password) {
    try {
        const data = await apiFetch('/auth/register', { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        return { success: true, message: data.message };
    } catch (err) {
        return { success: false, error: "Failed to connect to server" };
    }
}

export async function logoutUser() {
    try {
        return await apiFetch('/auth/logout', { method: 'POST' });
    } catch (err) {
        console.error(err);
    }
}

export async function sessionVerifing() {
    try {
        const data = await apiFetch('/auth/verify', { method: 'GET' });
        return { success: true, user: data }; 
    } catch (err) {
        return { success: false, err: "error verifying session" };
    }
}