import bcrypt from 'bcrypt';
import { UserModel } from '../models/User';

export const registerTeacherService = async (name: string, email: string, password: string) => {
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
        passwordHash
    });

    return {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
    };
};