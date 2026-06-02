import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar/Navbar.tsx";
import Footer from "./Footer/Footer.tsx";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Thanh điều hướng cố định phía trên */}
      <NavBar />
      
      {/* Vùng nội dung động thay đổi theo đường dẫn, chừa khoảng trống 72px cho Navbar */}
      <main className="flex-grow pt-[72px]">
        <Outlet />
      </main>

      {/* Chân trang phía dưới */}
      <Footer />
    </div>
  );
};

export default MainLayout;
