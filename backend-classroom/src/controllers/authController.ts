import { Request, Response, NextFunction } from 'express';
import { registerTeacherService } from '../services/authService';

// [POST] /api/v1/auth/register
export const registerTeacher = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { name, email, password } = req.body;

        // Gọi sang tầng Service để xử lý nghiệp vụ
        const result = await registerTeacherService(name, email, password);

        // Trả về kết quả thành công cho client
        res.status(201).json({
            message: 'Đăng ký tài khoản giáo viên thành công!',
            user: result
        });
    } catch (error) {
        // Nếu Service ném ra lỗi (ví dụ trùng email), chuyển thẳng qua Middleware xử lý lỗi toàn cục
        next(error);
    }
};