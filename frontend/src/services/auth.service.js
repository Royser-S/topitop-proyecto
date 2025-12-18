import api from './api';

const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error("Error en login", error);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};

export default {
    login,
    logout
};