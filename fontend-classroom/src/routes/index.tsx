import { createBrowserRouter, Navigate } from "react-router-dom";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
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
      // Các trang con khác của giáo viên (ví dụ: classrooms, attendance...) sẽ thêm ở đây
    ],
  },
  {
    // Nếu truy cập vào đường dẫn không tồn tại, tự động chuyển hướng về trang đăng ký
    path: "*",
    element: <Navigate to="/register" replace />,
  },
]);

