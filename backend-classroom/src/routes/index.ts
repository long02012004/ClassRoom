import { Router } from 'express';
import authRoutes from './authRoutes';

const apiRouter = Router();

// Toàn bộ các route bên trong authRoutes sẽ có tiền tố là /v1/auth
apiRouter.use('/auth', authRoutes);

// Sau này bạn phát triển thêm chức năng lớp học, học sinh thì chỉ cần thêm ở đây:
// apiRouter.use('/classrooms', classroomRoutes);
// apiRouter.use('/students', studentRoutes);

export default apiRouter;