import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  House,
  Chalkboard,
  CalendarCheck,
  GraduationCap,
  ClipboardText,
  UserCircle,
  SignOut,
  List,
  X,
  CaretDown,
  ShieldCheck,
  Notebook
} from "phosphor-react";
import styles from "./Navbar.module.scss";

const NavBar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Giả lập trạng thái đăng nhập cho giáo viên (Sau này kết nối AuthContext)
  const isLoggedIn = true;
  const username = "Thầy Long";
  const userRole = "TEACHER"; // TEACHER hoặc ADMIN
  const avatar = `https://ui-avatars.com/api/?name=Thay+Long&background=FE6747&color=fff&bold=true`;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleLogOut = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Hệ thống: Bạn đã đăng xuất thành công!");
    // Logic đăng xuất thực tế sẽ xử lý ở đây
  };

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        {/* Logo Thương Hiệu */}
        <Link to="/dashboard" className={styles.logo}>
          <span className={styles.logoIcon}>🏫</span>
          <span className={styles.logoText}>
            Classroom<span className={styles.accentText}>Manager</span>
          </span>
        </Link>

        {/* Thanh Điều Hướng Desktop */}
        <nav className={styles.navLinks}>
          <Link to="/dashboard" className={isActive("/dashboard") ? styles.active : ""}>
            <House size={18} weight={isActive("/dashboard") ? "fill" : "regular"} />
            <span>Bảng điều khiển</span>
          </Link>
          <Link to="/classrooms" className={isActive("/classrooms") ? styles.active : ""}>
            <Chalkboard size={18} weight={isActive("/classrooms") ? "fill" : "regular"} />
            <span>Lớp học</span>
          </Link>
          <Link to="/attendance" className={isActive("/attendance") ? styles.active : ""}>
            <CalendarCheck size={18} weight={isActive("/attendance") ? "fill" : "regular"} />
            <span>Điểm danh</span>
          </Link>
          <Link to="/gradebook" className={isActive("/gradebook") ? styles.active : ""}>
            <GraduationCap size={18} weight={isActive("/gradebook") ? "fill" : "regular"} />
            <span>Sổ điểm</span>
          </Link>
          <Link to="/assignments" className={isActive("/assignments") ? styles.active : ""}>
            <ClipboardText size={18} weight={isActive("/assignments") ? "fill" : "regular"} />
            <span>Bài tập</span>
          </Link>
        </nav>

        {/* Khối tài khoản / Hành động */}
        <div className={styles.navActions}>
          {isLoggedIn ? (
            <div className={styles.userDropdown}>
              <div className={styles.userTrigger}>
                <img src={avatar} alt="User Avatar" className={styles.avatarImg} />
                <span className={styles.userName}>{username}</span>
                <CaretDown weight="bold" size={12} className={styles.arrowIcon} />
              </div>
              
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownHeader}>
                  <span>Vai trò</span>
                  <div className={styles.userDisplayName}>{userRole === "ADMIN" ? "Quản trị viên" : "Giáo viên"}</div>
                </div>
                
                <Link to="/profile" className={styles.dropdownItem}>
                  <UserCircle size={20} /> Trang cá nhân
                </Link>
                <Link to="/classrooms" className={styles.dropdownItem}>
                  <Notebook size={20} /> Giáo án & Lớp học
                </Link>
                {userRole === "ADMIN" && (
                  <Link to="/admin" className={styles.dropdownItem}>
                    <ShieldCheck size={20} /> Quản trị hệ thống
                  </Link>
                )}
                
                <div className={styles.dropdownDivider}></div>
                <a href="/" onClick={handleLogOut} className={styles.logoutItem}>
                  <SignOut size={20} /> Đăng xuất
                </a>
              </div>
            </div>
          ) : (
            <div className={styles.authGroup}>
              <Link to="/register" className={styles.loginBtn}>Đăng nhập</Link>
              <Link to="/register" className={styles.ctaBtn}>Đăng ký ngay</Link>
            </div>
          )}
        </div>

        {/* Nút bấm Menu Mobile */}
        <button 
          className={styles.mobileMenuBtn} 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
        >
          {isMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}

        </button>

        {/* Mobile Drawer (Thanh kéo bên trên thiết bị di động) */}
        <div className={`${styles.mobileDrawer} ${isMenuOpen ? styles.open : ""}`}>
          <nav className={styles.mobileNavLinks}>
            <Link to="/dashboard" className={isActive("/dashboard") ? styles.active : ""} onClick={() => setIsMenuOpen(false)}>
              <House size={20} weight={isActive("/dashboard") ? "fill" : "bold"} />
              <span>Bảng điều khiển</span>
            </Link>
            <Link to="/classrooms" className={isActive("/classrooms") ? styles.active : ""} onClick={() => setIsMenuOpen(false)}>
              <Chalkboard size={20} weight={isActive("/classrooms") ? "fill" : "bold"} />
              <span>Lớp học</span>
            </Link>
            <Link to="/attendance" className={isActive("/attendance") ? styles.active : ""} onClick={() => setIsMenuOpen(false)}>
              <CalendarCheck size={20} weight={isActive("/attendance") ? "fill" : "bold"} />
              <span>Điểm danh</span>
            </Link>
            <Link to="/gradebook" className={isActive("/gradebook") ? styles.active : ""} onClick={() => setIsMenuOpen(false)}>
              <GraduationCap size={20} weight={isActive("/gradebook") ? "fill" : "bold"} />
              <span>Sổ điểm</span>
            </Link>
            <Link to="/assignments" className={isActive("/assignments") ? styles.active : ""} onClick={() => setIsMenuOpen(false)}>
              <ClipboardText size={20} weight={isActive("/assignments") ? "fill" : "bold"} />
              <span>Bài tập</span>
            </Link>
            
            <div className={styles.mobileDivider}></div>
            
            {isLoggedIn ? (
              <>
                <Link to="/profile" className={styles.mobileMenuItem} onClick={() => setIsMenuOpen(false)}>
                  <UserCircle size={20} /> <span>Trang cá nhân</span>
                </Link>
                <a href="/" onClick={(e) => { handleLogOut(e); setIsMenuOpen(false); }} className={`${styles.mobileMenuItem} ${styles.logout}`}>
                  <SignOut size={20} /> <span>Đăng xuất</span>
                </a>
              </>
            ) : (
              <div className={styles.mobileAuthBtns}>
                <Link to="/register" className={styles.mobileLoginBtn} onClick={() => setIsMenuOpen(false)}>Đăng nhập</Link>
                <Link to="/register" className={styles.mobileJoinBtn} onClick={() => setIsMenuOpen(false)}>Đăng ký ngay</Link>
              </div>
            )}
          </nav>
        </div>
        
        {isMenuOpen && <div className={styles.menuOverlay} onClick={() => setIsMenuOpen(false)} />}
      </div>
    </header>
  );
};

export default NavBar;