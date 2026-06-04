import api from './api';

export const authService = {
  login: async (email: string, password: string): Promise<any> => {
    // Không cần body: JSON.stringify và fetchApi nữa, Axios tự làm
    return await api.post('/api/v1/auth/login', { email, password });
  },

  getMe: async (): Promise<any> => {
    return await api.get('/api/v1/auth/me');
  },
};
