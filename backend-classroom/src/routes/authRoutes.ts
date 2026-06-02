import { Router } from 'express';
import { registerTeacher } from '../controllers/authController';
import { validateRegister } from '../middlewares/validateMiddleware';

const router = Router();

// validateRegister sẽ đứng chặn ở giữa để kiểm duyệt dữ liệu trước
router.post('/register', validateRegister, registerTeacher);

export default router;