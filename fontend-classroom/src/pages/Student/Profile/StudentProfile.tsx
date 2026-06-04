import React from 'react';
import { 
  PencilSimple, 
  TrendUp, 
  BookBookmark, 
  Fire, 
  CalendarCheck,
  User,
  Medal,
  CaretRight,
  Password,
  BellRinging,
  ShieldCheck,
  SignOut,
  CircleWavyCheck,
  Star,
  UsersThree,
  GraduationCap,
  IdentificationBadge
} from 'phosphor-react';
import styles from './StudentProfile.module.scss';

const StudentProfile: React.FC = () => {
  return (
    <div className={styles.profileContainer}>
      {/* Header */}
      <div className={styles.profileHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.avatarWrapper}>
            <img 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
              alt="Alex Johnson" 
            />
            <button className={styles.editAvatarBtn}>
              <PencilSimple size={16} />
            </button>
          </div>
          <div className={styles.userInfo}>
            <h1>Alex Johnson</h1>
            <div className={styles.infoRow}>
              <div className={styles.infoItem}>
                <GraduationCap size={16} />
                Lớp 12A1 • THPT Chuyên Lê Hồng Phong
              </div>
              <div className={styles.infoItem}>
                <IdentificationBadge size={16} />
                ID: HS20240015
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Left Column */}
        <div className={styles.leftCol}>
          {/* Stat Cards */}
          <div className={styles.statCards}>
            <div className={styles.statCard}>
              <div className={`${styles.iconWrapper} ${styles.green}`}>
                <TrendUp size={24} weight="bold" />
              </div>
              <div className={styles.statLabel}>Hạng lớp</div>
              <div className={styles.statValue}>05<span>/40</span></div>
            </div>
            <div className={styles.statCard}>
              <div className={`${styles.iconWrapper} ${styles.red}`}>
                <BookBookmark size={24} weight="bold" />
              </div>
              <div className={styles.statLabel}>Tín chỉ</div>
              <div className={styles.statValue}>124</div>
            </div>
            <div className={styles.statCard}>
              <div className={`${styles.iconWrapper} ${styles.blue}`}>
                <Fire size={24} weight="bold" />
              </div>
              <div className={styles.statLabel}>Chuỗi học</div>
              <div className={styles.statValue}>12<span> ngày</span></div>
            </div>
            <div className={styles.statCard}>
              <div className={`${styles.iconWrapper} ${styles.gray}`}>
                <CalendarCheck size={24} weight="bold" />
              </div>
              <div className={styles.statLabel}>Chuyên cần</div>
              <div className={styles.statValue}>98<span>%</span></div>
            </div>
          </div>

          {/* Thông tin hồ sơ */}
          <div className={styles.sectionBox}>
            <div className={styles.sectionHeader}>
              <div className={styles.headerTitle}>
                <div className={styles.titleIcon}><User size={20} weight="bold" /></div>
                Thông tin hồ sơ
              </div>
              <button className={styles.editBtn}><PencilSimple size={16} weight="bold" /> Chỉnh sửa</button>
            </div>

            <div className={styles.infoGroup}>
              <div className={styles.groupTitle}>Thông tin cơ bản</div>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Họ và tên</span>
                  <span className={styles.value}>Alex Johnson</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Ngày sinh</span>
                  <span className={styles.value}>15 Tháng 05, 2006</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Giới tính</span>
                  <span className={styles.value}>Nam</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Dân tộc</span>
                  <span className={styles.value}>Kinh</span>
                </div>
              </div>
            </div>

            <div className={styles.infoGroup}>
              <div className={styles.groupTitle}>Liên lạc & Địa chỉ</div>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Email học sinh</span>
                  <span className={styles.value}>alex.j@school.edu.vn</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Số điện thoại</span>
                  <span className={styles.value}>090 123 4567</span>
                </div>
                <div className={styles.infoItem} style={{ gridColumn: '1 / -1' }}>
                  <span className={styles.label}>Địa chỉ thường trú</span>
                  <span className={styles.value}>123 Đường Phan Xích Long, Phường 2, Quận Phú Nhuận, TP. Hồ Chí Minh</span>
                </div>
              </div>
            </div>

            <div className={styles.infoGroup}>
              <div className={styles.groupTitle}>Nền tảng học thuật</div>
              <div className={styles.tagsGrid}>
                <div className={styles.tagBox}>
                  <div className={styles.tagLabel}>Khối lớp</div>
                  <div className={styles.tagValue}>Lớp 12 - THPT</div>
                </div>
                <div className={styles.tagBox}>
                  <div className={styles.tagLabel}>Chuyên ngành</div>
                  <div className={styles.tagValue}>Khoa học Tự nhiên</div>
                </div>
                <div className={styles.tagBox}>
                  <div className={styles.tagLabel}>Năm nhập học</div>
                  <div className={styles.tagValue}>Niên khóa 2021</div>
                </div>
              </div>
            </div>
          </div>

          {/* Huy hiệu thành tích */}
          <div className={styles.sectionBox}>
            <div className={styles.sectionHeader}>
              <div className={styles.headerTitle}>
                <div className={styles.titleIcon}><Medal size={20} weight="bold" /></div>
                Huy hiệu thành tích
              </div>
              <button className={styles.seeAllBtn}>Xem tất cả</button>
            </div>
            <div className={styles.badgesGrid}>
              <div className={styles.badgeItem}>
                <div className={`${styles.badgeCircle} ${styles.green}`}>
                  <CircleWavyCheck size={36} weight="fill" />
                </div>
                <div className={styles.badgeName}>Chuyên cần</div>
              </div>
              <div className={styles.badgeItem}>
                <div className={`${styles.badgeCircle} ${styles.orange}`}>
                  <Star size={36} weight="fill" />
                </div>
                <div className={styles.badgeName}>Điểm tuyệt đối</div>
              </div>
              <div className={styles.badgeItem}>
                <div className={`${styles.badgeCircle} ${styles.blue}`}>
                  <UsersThree size={36} weight="fill" />
                </div>
                <div className={styles.badgeName}>Sôi nổi</div>
              </div>
              <div className={styles.badgeItem}>
                <div className={`${styles.badgeCircle} ${styles.gray}`}>
                  <Medal size={36} weight="fill" />
                </div>
                <div className={styles.badgeName}>Lãnh đạo</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightCol}>
          {/* Tiến độ học tập */}
          <div className={styles.sectionBox}>
            <div className={styles.sectionHeader}>
              <div className={styles.headerTitle}>
                <TrendUp size={20} weight="bold" color="#1fb98f" />
                Tiến độ học tập
              </div>
            </div>
            <div className={styles.progressList}>
              <div className={styles.progressItem}>
                <div className={`${styles.pHeader} ${styles.green}`}>
                  <span className={styles.pLabel}>Mục tiêu học kỳ 1</span>
                  <span className={styles.pVal}>9.2 / 10.0</span>
                </div>
                <div className={`${styles.pBarWrap} ${styles.green}`}>
                  <div className={styles.pBar} style={{ width: '92%' }}></div>
                </div>
                <div className={styles.pSub}>Đã đạt 92% kế hoạch học tập đề ra</div>
              </div>
              <div className={styles.progressItem}>
                <div className={`${styles.pHeader} ${styles.orange}`}>
                  <span className={styles.pLabel}>Hoàn thành bài tập</span>
                  <span className={styles.pVal}>88%</span>
                </div>
                <div className={`${styles.pBarWrap} ${styles.orange}`}>
                  <div className={styles.pBar} style={{ width: '88%' }}></div>
                </div>
                <div className={styles.pSub}>Chỉ còn 12 bài tập chưa nộp</div>
              </div>
              <div className={styles.progressItem}>
                <div className={`${styles.pHeader} ${styles.blue}`}>
                  <span className={styles.pLabel}>Dự án cuối năm</span>
                  <span className={styles.pVal}>45%</span>
                </div>
                <div className={`${styles.pBarWrap} ${styles.blue}`}>
                  <div className={styles.pBar} style={{ width: '45%' }}></div>
                </div>
                <div className={styles.pSub}>Đang trong giai đoạn thu thập dữ liệu</div>
              </div>
            </div>
          </div>

          {/* Quản lý tài khoản */}
          <div className={styles.sectionBox}>
            <div className={styles.sectionHeader} style={{ marginBottom: '16px' }}>
              <div className={styles.headerTitle} style={{ fontSize: '16px' }}>
                Quản lý tài khoản
              </div>
            </div>
            <div className={styles.accountMenu}>
              <div className={styles.menuItem}>
                <div className={styles.menuLeft}>
                  <div className={styles.menuIcon}><Password size={18} weight="bold" /></div>
                  <div className={styles.menuText}>
                    <span className={styles.mTitle}>Đổi mật khẩu</span>
                    <span className={styles.mSub}>Cập nhật mật khẩu định kỳ</span>
                  </div>
                </div>
                <CaretRight size={16} weight="bold" className={styles.menuArrow} />
              </div>
              <div className={styles.menuItem}>
                <div className={styles.menuLeft}>
                  <div className={styles.menuIcon}><BellRinging size={18} weight="bold" /></div>
                  <div className={styles.menuText}>
                    <span className={styles.mTitle}>Thông báo</span>
                    <span className={styles.mSub}>Email, Mobile & Web</span>
                  </div>
                </div>
                <CaretRight size={16} weight="bold" className={styles.menuArrow} />
              </div>
              <div className={styles.menuItem}>
                <div className={styles.menuLeft}>
                  <div className={styles.menuIcon}><ShieldCheck size={18} weight="bold" /></div>
                  <div className={styles.menuText}>
                    <span className={styles.mTitle}>Quyền riêng tư</span>
                    <span className={styles.mSub}>Quản lý hiển thị hồ sơ</span>
                  </div>
                </div>
                <CaretRight size={16} weight="bold" className={styles.menuArrow} />
              </div>
              <button className={styles.logoutBtn}>
                <SignOut size={18} weight="bold" />
                Đăng xuất tài khoản
              </button>
            </div>
          </div>

          {/* Tổng kết năm học */}
          <div className={styles.summaryCard}>
            <div className={styles.summaryHeader}>Tổng kết năm học</div>
            <div className={styles.summaryStats}>
              <div className={styles.sStat}>
                <div className={styles.sVal}>0</div>
                <div className={styles.sLabel}>Số ngày vắng</div>
              </div>
              <div className={styles.sStat}>
                <div className={`${styles.sVal} ${styles.orange}`}>12</div>
                <div className={styles.sLabel}>Khen thưởng</div>
              </div>
            </div>
            <div className={styles.gpaBox}>
              <div className={styles.gpaTop}>
                <span className={styles.gpaLabel}>ĐIỂM TRUNG BÌNH (GPA)</span>
                <span className={styles.gpaVal}>9.2</span>
              </div>
              <div className={styles.gpaBarWrap}>
                <div className={styles.gpaBar}></div>
              </div>
              <div className={styles.gpaSub}>Xếp loại: <strong>XUẤT SẮC</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
