import axios from 'axios';

// Tạo instance axios với cấu hình mặc định
const api = axios.create({
  baseURL: '', // Để trống vì đã cấu hình proxy Vite cho '/api'
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor Request: Tự động đính kèm token vào mọi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('USER_TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor Response: Xử lý dữ liệu trả về và bắt lỗi chung
api.interceptors.response.use(
  (response) => {
    // Trả về trực tiếp data của response để code gọn hơn
    return response.data;
  },
  (error) => {
    // Lấy message lỗi từ backend (nếu có) hoặc dùng lỗi mặc định
    const errorMessage = error.response?.data?.message || 'Đã xảy ra lỗi kết nối đến máy chủ';
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
