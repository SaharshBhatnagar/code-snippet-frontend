import { apiFetch } from './apiClient';

export async function loginUser(email, password) {
    try {
        const data = await apiFetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return { success: true, user: data.user };
    } catch (err) {
        return { success: false, error: err.error || "Login failed" };
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
        return { success: false, error: err.error || "Failed to connect to server" };
    }
}

export async function logoutUser() {
    try {
        await apiFetch('/auth/logout', { method: 'POST' });
        return { success: true };
    } catch (err) {
        return { success: false, error: "Logout failed" };
    }
}

export async function sessionVerifing() {
    try {
        const data = await apiFetch('/auth/verify');
        return { success: true, user: data.user };
    } catch (err) {
        return { success: false };
    }
}

export async function forgotPasswordApi(email) {
    try {
        const data = await apiFetch('/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        return { success: true, message: data.message };
    } catch (err) {
        return { success: false, error: err.error || "Failed to process request" };
    }
}

export async function resetPasswordApi(token, newPassword) {
    try {
        const data = await apiFetch('/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword })
        });
        return { success: true, message: data.message };
    } catch (err) {
        return { success: false, error: err.error || "Failed to reset password" };
    }
}