import React from "react";
import { MagnifyingGlass, Bell } from "phosphor-react";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const username = localStorage.getItem("username") || "Thầy Nguyễn Văn A";
  const userRole = localStorage.getItem("userRole") || "TEACHER";
  
  // Custom display for subject/role
  const subjectDisplay = userRole === "TEACHER" ? "Toán học" : userRole === "ADMIN" ? "Quản trị viên" : "Học sinh";
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=FE6747&color=fff&bold=true`;

  return (
    <header className={styles.header}>
      {/* Cánh trái: Các Tab điều hướng */}
      <div className={styles.navTabs}>
        <button className={`${styles.tabItem} ${styles.active}`}>Tổng quan</button>
        <button className={styles.tabItem}>Báo cáo</button>
        <button className={styles.tabItem}>Lịch dạy</button>
      </div>

      {/* Cánh phải: Tìm kiếm, Thông báo và Hồ sơ */}
      <div className={styles.rightSection}>
        {/* Hộp tìm kiếm */}
        <div className={styles.searchBox}>
          <MagnifyingGlass size={18} className={styles.searchIcon} />
          <input type="text" placeholder="Tìm kiếm dữ liệu..." />
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
