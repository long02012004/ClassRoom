import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { MagnifyingGlass, Bell, SignOut, User } from "phosphor-react";
import { useAuth } from "../../../context/AuthContext";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isStudentsPage = location.pathname.includes("/students");
  const activeTab = isStudentsPage ? "" : (searchParams.get("tab") || "overview");

  const username = user?.name || "Người dùng";
  const userRole = user?.role || "teacher";

  // Custom display for role
  const roleDisplay =
    userRole === "teacher" ? "Giáo viên" :
    userRole === "admin" ? "Quản trị viên" : "Học sinh";

  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=FE6747&color=fff&bold=true`;

  // Trích xuất classId từ URL
  const classIdMatch = location.pathname.match(/^\/classrooms\/([^/]+)/);
  const classId = classIdMatch ? classIdMatch[1] : null;

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabClick = (tabName: string) => {
    if (classId) {
      navigate(`/classrooms/${classId}?tab=${tabName}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      {/* Cánh trái: Brand & Các Tab điều hướng */}
      <div className={styles.navTabs}>
        {classId && (
          <span className={styles.brandLabel}>Quản lý lớp học</span>
        )}
        {classId ? (
          <>
            <button 
              className={`${styles.tabItem} ${activeTab === "overview" ? styles.active : ""}`}
              onClick={() => handleTabClick("overview")}
            >
              Tổng quan
            </button>
            <button 
              className={`${styles.tabItem} ${activeTab === "reports" ? styles.active : ""}`}
              onClick={() => handleTabClick("reports")}
            >
              Báo cáo
            </button>
            <button 
              className={`${styles.tabItem} ${activeTab === "schedule" ? styles.active : ""}`}
              onClick={() => handleTabClick("schedule")}
            >
              Lịch trình
            </button>
            {userRole === "teacher" && (
              <button 
                className={`${styles.tabItem} ${isStudentsPage ? styles.active : ""}`}
                onClick={() => navigate(`/classrooms/${classId}/students`)}
              >
                Học sinh
              </button>
            )}
          </>
        ) : (
          <span className={styles.defaultBrand}>Quản lý lớp học</span>
        )}
      </div>

      {/* Cánh phải: Tìm kiếm, Thông báo và Hồ sơ */}
      <div className={styles.rightSection}>
        {/* Hộp tìm kiếm */}
        <div className={styles.searchBox}>
          <MagnifyingGlass size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder={classId ? "Tìm kiếm thông báo..." : "Tìm kiếm dữ liệu..."} 
          />
        </div>

        {/* Nút thông báo */}
        <button className={styles.notificationBtn} aria-label="Thông báo">
          <Bell size={22} weight="bold" />
          <span className={styles.bellBadge}></span>
        </button>

        {/* Thông tin hồ sơ + Dropdown */}
        <div className={styles.profileWidget} ref={dropdownRef}>
          <div
            className={styles.profileClickable}
            onClick={() => setDropdownOpen((prev) => !prev)}
            role="button"
            aria-label="Mở menu tài khoản"
          >
            <div className={styles.profileText}>
              <span className={styles.profileName}>{username}</span>
              <span className={styles.profileRole}>{roleDisplay}</span>
            </div>
            <img src={avatar} alt="Avatar" className={styles.avatarImg} />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownHeader}>
                <img src={avatar} alt="Avatar" className={styles.dropdownAvatar} />
                <div>
                  <p className={styles.dropdownName}>{username}</p>
                  <p className={styles.dropdownRole}>{roleDisplay}</p>
                </div>
              </div>
              <div className={styles.dropdownDivider} />
              <button
                className={styles.dropdownItem}
                onClick={() => { setDropdownOpen(false); navigate("/profile"); }}
              >
                <User size={16} weight="bold" />
                Hồ sơ cá nhân
              </button>
              <div className={styles.dropdownDivider} />
              <button
                className={`${styles.dropdownItem} ${styles.dropdownLogout}`}
                onClick={handleLogout}
              >
                <SignOut size={16} weight="bold" />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

