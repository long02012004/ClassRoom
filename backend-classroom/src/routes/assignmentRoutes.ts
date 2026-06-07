import { Router } from 'express';
import { getAssignments, createAssignment } from '../controllers/assignmentController';
import { protect, authorize } from '../middlewares/authMiddleware';

const router = Router();

// GET /api/v1/assignments?classId=...
router.get('/', protect, authorize('teacher'), getAssignments);

// POST /api/v1/assignments
router.post('/', protect, authorize('teacher'), createAssignment);

export default router;
