import { Router } from 'express';
import { loginTeacher, getMe, createTeacherAccount, createStudentAccount } from '../controllers/authController';
import { validateRegister, validateLogin } from '../middlewares/validateMiddleware';
import { protect, authorize } from '../middlewares/authMiddleware';

const router = Router();

// [Admin] Tạo tài khoản giáo viên
router.post('/create-teacher', protect, authorize('admin'), validateRegister, createTeacherAccount);

// [Teacher] Tạo tài khoản học sinh
router.post('/create-student', protect, authorize('teacher'), validateRegister, createStudentAccount);

// route login
router.post('/login', validateLogin, loginTeacher);

// route lấy thông tin cá nhân (yêu cầu token)
router.get('/me', protect, getMe);

export default router;