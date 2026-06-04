import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { MagnifyingGlass, Bell } from "phosphor-react";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  const username = localStorage.getItem("username") || "Thầy Long";
  const userRole = localStorage.getItem("userRole") || "TEACHER";
  
  // Custom display for subject/role
  const subjectDisplay = userRole === "TEACHER" ? "Toán học" : userRole === "ADMIN" ? "Quản trị viên" : "Học sinh";
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=FE6747&color=fff&bold=true`;

  // Trích xuất classId từ URL (ví dụ: /classrooms/class_123456)
  const classIdMatch = location.pathname.match(/^\/classrooms\/([^/]+)/);
  const classId = classIdMatch ? classIdMatch[1] : null;

  // Handler khi click chuyển tab
  const handleTabClick = (tabName: string) => {
    if (classId) {
      navigate(`/classrooms/${classId}?tab=${tabName}`);
    }
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

        {/* Thông tin hồ sơ */}
        <div className={styles.profileWidget}>
          <div className={styles.profileText}>
            <span className={styles.profileName}>{username}</span>
            <span className={styles.profileRole}>{subjectDisplay}</span>
          </div>
          <img src={avatar} alt="Teacher Avatar" className={styles.avatarImg} />
        </div>
      </div>
    </header>
  );
};

export default Header;
