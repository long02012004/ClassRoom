import { Router } from 'express';
import { getClassroomGrades, saveGrades } from '../controllers/gradeController';
import { protect, authorize } from '../middlewares/authMiddleware';

const router = Router();

// GET /api/v1/grades?classId=...
router.get('/', protect, authorize('teacher'), getClassroomGrades);

// POST /api/v1/grades
router.post('/', protect, authorize('teacher'), saveGrades);

export default router;
