import api from './api';

const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', {
            email,
            password
        });

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }

        return response.data;
    } catch (error) {
        console.error("Error en login", error);
        throw error;
    }
};


const register = async (nombre, apellido, email, password) => {
    try {
        const response = await api.post('/auth/register', {
            nombre,
            apellido,
            email,
            password
        });

        return response.data;
    } catch (error) {
        console.error("Error en registro", error);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};

export default {
    login,
    register, 
    logout
};
