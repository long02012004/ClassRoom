import { Request, Response, NextFunction } from 'express';
import { AssignmentModel } from '../models/Assignment';
import { ClassModel } from '../models/Class';

// Lấy danh sách bài tập của một lớp
export const getAssignments = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { classId } = req.query;
        if (!classId) {
            return res.status(400).json({ message: 'Thiếu classId' });
        }

        const assignments = await AssignmentModel.find({ classId: classId as string })
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Lấy danh sách bài tập thành công',
            data: assignments
        });
    } catch (error) {
        next(error);
    }
};

// Tạo bài tập mới
export const createAssignment = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { classId, title, description, dueDate, maxScore } = req.body;
        const teacherId = (req as any).user?.id;

        if (!classId || !title || !dueDate) {
            return res.status(400).json({ message: 'Thiếu thông tin bắt buộc (classId, title, dueDate)' });
        }

        // Kiểm tra xem lớp học có thuộc về giáo viên này không
        const classroom = await ClassModel.findOne({ _id: classId, teacherId });
        if (!classroom) {
            return res.status(403).json({ message: 'Bạn không có quyền giao bài tập cho lớp học này' });
        }

        const assignment = await AssignmentModel.create({
            classId,
            title,
            description,
            dueDate: new Date(dueDate),
            maxScore: maxScore || 10
        });

        res.status(201).json({
            message: 'Tạo bài tập thành công',
            data: assignment
        });
    } catch (error) {
        next(error);
    }
};
