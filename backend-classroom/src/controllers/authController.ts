import { Request, Response, NextFunction } from 'express';
import { createAccountService, loginTeacherService } from '../services/authService';
import { IUser } from '../models/User';

export interface AuthRequest extends Request {
    user?: any;
}

// [POST] /api/v1/auth/create-teacher
// (Admin dùng)
export const createTeacherAccount = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { name, email, password } = req.body;

        const result = await createAccountService(name, email, password, 'teacher');

        res.status(201).json({
            message: 'Tạo tài khoản Giáo viên thành công!',
            user: result
        });
    } catch (error) {
        next(error);
    }
};

// [POST] /api/v1/auth/create-student
// (Teacher dùng)
export const createStudentAccount = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { name, email, password } = req.body;

        const result = await createAccountService(name, email, password, 'student');

        res.status(201).json({
            message: 'Tạo tài khoản Học sinh thành công!',
            user: result
        });
    } catch (error) {
        next(error);
    }
};

// [POST] /api/v1/auth/login
export const loginTeacher = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { email, password } = req.body;

        const result = await loginTeacherService(email, password);

        res.status(200).json({
            message: 'Đăng nhập thành công!',
            data: result
        });
    } catch (error) {
        // Trả về lỗi 401 Unauthorized nếu đăng nhập thất bại (sai mật khẩu, email)
        res.status(401);
        next(error);
    }
};

// [GET] /api/v1/auth/me
export const getMe = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        // req.user được gán từ authMiddleware
        const user = req.user;
        if (!user) {
            res.status(401);
            return next(new Error('Không tìm thấy thông tin người dùng!'));
        }

        res.status(200).json({
            message: 'Lấy thông tin người dùng thành công!',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};