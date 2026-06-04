import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  SquaresFour,
  Chalkboard,
  CalendarCheck,
  GraduationCap,
  ClipboardText,
  User,
  SignOut,
  List,
  X,
  CalendarBlank
} from "phosphor-react";
import styles from "./Navbar.module.scss";

const NavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Đọc trạng thái đăng nhập từ localStorage để hỗ trợ demo
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username") || "Thầy Nguyễn Văn A";
  const userRole = localStorage.getItem("userRole") || "TEACHER";
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=FE6747&color=fff&bold=true`;

  const isActive = (path: string) => location.pathname === path;

  const handleLogOut = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    navigate("/register");
  };

  return (
    <>
      {/* Mobile Top Header (Hiển thị trên di động) */}
      <header className={styles.mobileHeader}>
        <button 
          className={styles.mobileMenuBtn} 
          onClick={() => setIsMenuOpen(true)} 
          aria-label="Mở menu"
        >
          <List size={24} weight="bold" />
        </button>
        
        <Link to="/dashboard" className={styles.mobileLogo}>
          <span className={styles.logoText}>Lớp học</span>
        </Link>

        {isLoggedIn ? (
          <img src={avatar} alt="User Avatar" className={styles.mobileAvatar} />
        ) : (
          <Link to="/register" className={styles.mobileLoginLink}>Đăng nhập</Link>
        )}
      </header>

      {/* Sidebar (Thanh điều hướng bên trái) */}
      <aside className={`${styles.sidebar} ${isMenuOpen ? styles.open : ""}`}>
        {/* Nút đóng Sidebar trên Mobile */}
        <button 
          className={styles.closeMenuBtn} 
          onClick={() => setIsMenuOpen(false)} 
          aria-label="Đóng menu"
        >
          <X size={20} weight="bold" />
        </button>

        {/* Logo Thương Hiệu */}
        <div className={styles.logoContainer}>
          <Link to="/dashboard" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.logoText}>
              Quản lý<span className={styles.accentText}> Lớp học</span>
            </span>
          </Link>
          <div className={styles.logoSubtitle}>
            {userRole === "STUDENT" ? "Cổng thông tin học sinh" : "Bảng điều khiển giáo viên"}
          </div>
        </div>

        {/* Menu Điều Hướng */}
        <nav className={styles.navLinks}>
          <Link 
            to="/dashboard" 
            className={`${styles.navItem} ${isActive("/dashboard") ? styles.active : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <SquaresFour size={20} weight={isActive("/dashboard") ? "fill" : "regular"} />
            <span>Bảng điều khiển</span>
          </Link>
          
          {userRole === "STUDENT" ? (
            // Menu dành cho học sinh
            <>
              <Link 
                to="/classrooms" 
                className={`${styles.navItem} ${isActive("/classrooms") ? styles.active : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Chalkboard size={20} weight={isActive("/classrooms") ? "fill" : "regular"} />
                <span>Lớp học</span>
              </Link>
              <Link 
                to="/gradebook" 
                className={`${styles.navItem} ${isActive("/gradebook") ? styles.active : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <GraduationCap size={20} weight={isActive("/gradebook") ? "fill" : "regular"} />
                <span>Điểm số</span>
              </Link>
              <Link 
                to="/assignments" 
                className={`${styles.navItem} ${isActive("/assignments") ? styles.active : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <ClipboardText size={20} weight={isActive("/assignments") ? "fill" : "regular"} />
                <span>Bài tập</span>
              </Link>
              <Link 
                to="/profile" 
                className={`${styles.navItem} ${isActive("/profile") ? styles.active : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} weight={isActive("/profile") ? "fill" : "regular"} />
                <span>Hồ sơ</span>
              </Link>
            </>
          ) : userRole === "ADMIN" ? (
            // Menu dành cho Admin
            <>
              <Link 
                to="/admin/teachers" 
                className={`${styles.navItem} ${isActive("/admin/teachers") ? styles.active : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} weight={isActive("/admin/teachers") ? "fill" : "regular"} />
                <span>Giáo viên</span>
              </Link>
            </>
          ) : (
            // Menu dành cho giáo viên
            <>
              <Link 
                to="/classrooms" 
                className={`${styles.navItem} ${isActive("/classrooms") ? styles.active : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Chalkboard size={20} weight={isActive("/classrooms") ? "fill" : "regular"} />
                <span>Lớp học</span>
              </Link>
              <Link 
                to="/attendance" 
                className={`${styles.navItem} ${isActive("/attendance") ? styles.active : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <CalendarCheck size={20} weight={isActive("/attendance") ? "fill" : "regular"} />
                <span>Điểm danh</span>
              </Link>
              <Link 
                to="/gradebook" 
                className={`${styles.navItem} ${isActive("/gradebook") ? styles.active : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <GraduationCap size={20} weight={isActive("/gradebook") ? "fill" : "regular"} />
                <span>Sổ điểm</span>
              </Link>
              <Link 
                to="/assignments" 
                className={`${styles.navItem} ${isActive("/assignments") ? styles.active : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <ClipboardText size={20} weight={isActive("/assignments") ? "fill" : "regular"} />
                <span>Bài tập</span>
              </Link>
              <Link 
                to="/schedule" 
                className={`${styles.navItem} ${isActive("/schedule") ? styles.active : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <CalendarBlank size={20} weight={isActive("/schedule") ? "fill" : "regular"} />
                <span>Lịch dạy</span>
              </Link>
            </>
          )}


        </nav>

        {/* Nút Hành Động Ở Góc Sidebar */}
        <div className={styles.actionBtnContainer}>
          {userRole === "TEACHER" ? (
            <button 
              className={styles.newClassBtn}
              onClick={() => {
                window.dispatchEvent(new Event("open-new-class-modal"));
              }}
            >
              Tạo lớp mới
            </button>
          ) : null}
        </div>

        {/* Khối Thông Tin Người Dùng ở đáy Sidebar */}
        {isLoggedIn && (
          <div className={styles.userCard}>
            <img src={avatar} alt="User Avatar" className={styles.avatarImg} />
            <div className={styles.userInfo}>
              <span className={styles.userName}>{username}</span>
              <span className={styles.userRole}>
                {userRole === "ADMIN" ? "Quản trị viên" : userRole === "TEACHER" ? "Giáo viên" : "Học sinh"}
              </span>
            </div>
            <button 
              onClick={handleLogOut} 
              className={styles.logoutBtn} 
              title="Đăng xuất"
              aria-label="Đăng xuất"
            >
              <SignOut size={20} weight="bold" />
            </button>
          </div>
        )}
      </aside>

      {/* Overlay che nền khi mở menu trên di động */}
      {isMenuOpen && (
        <div className={styles.menuOverlay} onClick={() => setIsMenuOpen(false)} />
      )}
    </>
  );
};

export default NavBar;