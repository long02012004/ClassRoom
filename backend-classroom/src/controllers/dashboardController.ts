import { Request, Response, NextFunction } from 'express';
import { ClassModel } from '../models/Class';
import { UserModel } from '../models/User';

export const getAdminStats = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Đếm tổng số học sinh và giáo viên thật từ DB
        const totalStudents = await UserModel.countDocuments({ role: 'student' });
        const totalTeachers = await UserModel.countDocuments({ role: 'teacher' });

        // Đếm số lớp học đang hoạt động từ DB
        const activeClasses = await ClassModel.countDocuments({ status: 'Active' });
        const engagementRate = 86.5; // Giả lập tỷ lệ tương tác

        // Giả lập dữ liệu biểu đồ
        const trafficData = [
            { name: "Thứ 2", value: 450 },
            { name: "Thứ 3", value: 680 },
            { name: "Thứ 4", value: 1200 },
            { name: "Thứ 5", value: 850 },
            { name: "Thứ 6", value: 1500 },
            { name: "Thứ 7", value: 1800 },
            { name: "CN", value: 1100 },
        ];

        // Giả lập danh sách recent actions
        const recentActions = [
            {
                id: 1,
                user: "Nguyễn Văn A",
                action: "vừa tạo lớp Toán 10",
                time: "5 phút trước",
                avatar: "https://i.pravatar.cc/150?img=11",
                badge: "Lớp học",
                badgeColor: "bg-blue-50 text-blue-700 hover:bg-blue-100 border-transparent",
                fallback: "A"
            },
            {
                id: 2,
                user: "Trần B",
                action: "vừa báo lỗi quên mật khẩu",
                time: "12 phút trước",
                avatar: "https://i.pravatar.cc/150?img=12",
                badge: "Hỗ trợ",
                badgeColor: "bg-red-50 text-red-700 hover:bg-red-100 border-transparent",
                fallback: "B"
            },
            {
                id: 3,
                user: "Hệ thống",
                action: "đã hoàn thành sao lưu dữ liệu ngày",
                time: "2 giờ trước",
                avatar: "",
                badge: "Hệ thống",
                badgeColor: "bg-slate-100 text-slate-700 hover:bg-slate-200 border-transparent",
                fallback: "HT",
                isSystem: true
            }
        ];

        res.status(200).json({
            message: 'Lấy dữ liệu thống kê thành công',
            data: {
                totalStudents,
                totalTeachers,
                activeClasses,
                engagementRate,
                trafficData,
                recentActions
            }
        });
    } catch (error) {
        next(error);
    }
};

import { AttendanceModel } from '../models/Attendance';
import { AssignmentModel } from '../models/Assignment';
import { GradeModel } from '../models/Grade';
import mongoose from 'mongoose';

export const getTeacherDashboardStats = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const teacherId = (req as any).user?.id;
        if (!teacherId) {
            return res.status(401).json({ message: "Không tìm thấy thông tin giáo viên" });
        }

        // 1. Số lượng lớp học
        const classes = await ClassModel.find({ teacherId });
        const classIds = classes.map(c => c._id);
        const totalClasses = classIds.length;

        // 2. Tổng số học sinh
        const studentSet = new Set<string>();
        classes.forEach(c => {
            if (c.students && c.students.length > 0) {
                c.students.forEach(s => studentSet.add(s.toString()));
            }
        });
        const totalStudents = studentSet.size;

        // 3. Tỷ lệ chuyên cần hiện tại (overall)
        const attendances = await AttendanceModel.find({ classId: { $in: classIds } });
        let totalRecords = 0;
        let presentCount = 0;
        
        attendances.forEach(att => {
            if (att.records) {
                att.records.forEach(r => {
                    totalRecords++;
                    if (r.status === 'present') {
                        presentCount++;
                    }
                });
            }
        });
        
        const attendanceRate = totalRecords === 0 ? 96 : Math.round((presentCount / totalRecords) * 100);

        // 4. Bài tập cần chấm
        const pendingGrades = 15; // Mock for now

        // 5. Phổ điểm (Giỏi >= 8, Khá >= 6.5, TB < 6.5)
        const assignments = await AssignmentModel.find({ classId: { $in: classIds } });
        const assignmentIds = assignments.map(a => a._id);
        const grades = await GradeModel.find({ assignmentId: { $in: assignmentIds } });
        
        let gioi = 0, kha = 0, trungBinh = 0;
        if (grades.length > 0) {
            grades.forEach(g => {
                if (g.score >= 8) gioi++;
                else if (g.score >= 6.5) kha++;
                else trungBinh++;
            });
        } else {
            // Mock data if no grades
            gioi = 142;
            kha = 110;
            trungBinh = 68;
        }

        res.status(200).json({
            message: 'Lấy dữ liệu thống kê giáo viên thành công',
            data: {
                stats: {
                    totalClasses,
                    totalStudents,
                    attendanceRate,
                    pendingGrades
                },
                scoreDistribution: {
                    gioi,
                    kha,
                    trungBinh
                },
                classes: classes.map(c => ({
                    _id: c._id,
                    className: c.name,
                    subject: c.subject || 'Môn học chung'
                }))
            }
        });
    } catch (error: any) {
        next(error);
    }
};
