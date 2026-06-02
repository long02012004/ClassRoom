import { createBrowserRouter, Navigate } from "react-router-dom";
import Register from "../pages/Auth/Register/Register";
import Dashboard from "../pages/Dashboard";
import Classrooms from "../pages/Classrooms";
import Assignments from "../pages/Assignments";
import AssignmentDetail from "../pages/Student/Assignments/AssignmentDetail";
import MainLayout from "../components/Layout/MainLayout.tsx";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    // Áp dụng Layout chung (Navbar + Footer) cho hệ thống quản lý lớp học
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "classrooms",
        element: <Classrooms />,
      },
      {
        path: "assignments",
        element: <Assignments />,
      },
      {
        path: "assignments/:id",
        element: <AssignmentDetail />,
      },
      // Các trang con khác của giáo viên (ví dụ: attendance...) sẽ thêm ở đây
    ],
  },
  {
    // Nếu truy cập vào đường dẫn không tồn tại, tự động chuyển hướng về trang đăng ký
    path: "*",
    element: <Navigate to="/register" replace />,
  },
]);

