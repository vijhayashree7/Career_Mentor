import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);
export const fetchRecommendations = (data) => api.post('/career/recommendations', data);
export const analyzeResume = (data) => api.post('/career/resume/analyze', data);
export const setRole = (data) => api.post('/auth/role', data);

export default api;
