import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';

export const createAccountService = async (name: string, email: string, password: string, role: 'admin' | 'teacher' | 'student') => {
    // 1. Logic kiểm tra trùng email
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
        throw new Error('Email này đã được đăng ký hệ thống!');
    }

    // 2. Logic mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Logic tương tác với database để tạo mới
    const newUser = await UserModel.create({
        name,
        email,
        passwordHash,
        role
    });

    return {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
    };
};

export const loginTeacherService = async (email: string, password: string) => {
    // 1. Kiểm tra email có tồn tại không
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error('Email hoặc mật khẩu không chính xác!');
    }

    // 2. Kiểm tra mật khẩu có khớp không
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        throw new Error('Email hoặc mật khẩu không chính xác!');
    }

    // 3. Tạo JWT Token
    const jwtSecret = process.env.JWT_SECRET || 'SieuBaoMat2026';
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';
    const token = jwt.sign(
        { id: user._id, role: user.role },
        jwtSecret,
        { expiresIn: jwtExpiresIn as any }
    );

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        token
    };
};