import api from '../utils/AxiosCustomize';
import type { IBackendRes } from '../types/backend';

export interface IAssignment {
  _id: string;
  classId: string;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
  createdAt: string;
}

export interface IGrade {
  _id: string;
  assignmentId: string;
  studentId: string;
  score: number;
  feedback?: string;
  gradedAt: string;
}

export interface IGradebookStudent {
  _id: string;
  name: string;
  email: string;
}

export interface IGradebookData {
  students: IGradebookStudent[];
  assignments: IAssignment[];
  grades: IGrade[];
}

export const gradebookService = {
  // Lấy dữ liệu bảng điểm của lớp
  getClassroomGrades: async (classId: string): Promise<IBackendRes<IGradebookData>> => {
    return await api.get(`/api/v1/grades`, { params: { classId } });
  },

  // Lưu điểm số của một bài tập
  saveGrades: async (data: {
    assignmentId: string;
    grades: { studentId: string; score: number; feedback?: string }[];
  }): Promise<IBackendRes<void>> => {
    return await api.post(`/api/v1/grades`, data);
  },

  // Tạo bài tập mới
  createAssignment: async (data: {
    classId: string;
    title: string;
    description?: string;
    dueDate: string;
    maxScore?: number;
  }): Promise<IBackendRes<IAssignment>> => {
    return await api.post(`/api/v1/assignments`, data);
  },

  // Lấy danh sách bài tập của lớp
  getAssignments: async (classId: string): Promise<IBackendRes<IAssignment[]>> => {
    return await api.get(`/api/v1/assignments`, { params: { classId } });
  },
};
