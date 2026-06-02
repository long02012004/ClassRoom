import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  Users, 
  CheckSquare, 
  Clipboard,
  PaperPlaneTilt,
  ChatCircleText
} from "phosphor-react";
import { getMockClassrooms, createMockClassroom, getMockDb } from "../../../utils/mockDb.ts";
import type { Classroom } from "../../../utils/mockDb.ts";
import { useToast } from "../../../components/Styles/ToastContext.tsx";
import styles from "./TeacherDashboard.module.scss";

interface ScoreStats {
  gioi: number;
  kha: number;
  trungBinh: number;
}

export default function TeacherDashboard() {
  const toast = useToast();
  
  // State quản lý danh sách lớp học
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(320); // Fallback
  const [showModal, setShowModal] = useState(false);
  const [newClass, setNewClass] = useState({ className: "", subject: "" });
  
  // State quản lý thống kê
  const [selectedClassFilter, setSelectedClassFilter] = useState("all");
  const [scoreStats, setScoreStats] = useState<ScoreStats>({ gioi: 142, kha: 110, trungBinh: 68 });

  // Tải dữ liệu từ database giả lập
  const loadData = () => {
    const list = getMockClassrooms();
    setClassrooms(list);
    
    const db = getMockDb();
    if (db.students && db.students.length > 0) {
      setTotalStudents(db.students.length + 316); 
    }
  };

  useEffect(() => {
    loadData();

    // Lắng nghe sự kiện từ Sidebar
    const handleOpenModal = () => setShowModal(true);
    window.addEventListener("open-new-class-modal", handleOpenModal);

    return () => {
      window.removeEventListener("open-new-class-modal", handleOpenModal);
    };
  }, []);

  // Bộ lọc phổ điểm lớp học
  useEffect(() => {
    if (selectedClassFilter === "all") {
      setScoreStats({ gioi: 142, kha: 110, trungBinh: 68 });
    } else if (selectedClassFilter === "class-6") {
      setScoreStats({ gioi: 85, kha: 60, trungBinh: 42 });
    } else {
      setScoreStats({ gioi: 57, kha: 50, trungBinh: 26 });
    }
  }, [selectedClassFilter]);

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.className || !newClass.subject) {
      toast.error("Vui lòng điền đầy đủ thông tin tên lớp và môn học!");
      return;
    }

    try {
      createMockClassroom(newClass.className, newClass.subject);
      toast.success(`Tạo lớp học "${newClass.className}" thành công!`, 3000);
      setNewClass({ className: "", subject: "" });
      setShowModal(false);
      loadData();
    } catch (err) {
      toast.error("Đã xảy ra lỗi trong quá trình tạo lớp!");
    }
  };

  const maxScoreVal = Math.max(scoreStats.gioi, scoreStats.kha, scoreStats.trungBinh, 1);
  const getBarHeight = (val: number) => `${(val / maxScoreVal) * 100}%`;

  return (
    <div className={styles.dashboard}>
      
      {/* 1. KHỐI THẺ THỐNG KÊ (TEACHER STATS) */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.orangeBg}`}>
            <BookOpen size={26} weight="duotone" />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Tổng số lớp</span>
            <span className={styles.statValue}>{classrooms.length}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.greenBg}`}>
            <Users size={26} weight="duotone" />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Học sinh</span>
            <span className={styles.statValue}>{totalStudents}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.blueBg}`}>
            <CheckSquare size={26} weight="duotone" />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Chuyên cần</span>
            <span className={styles.statValue}>96%</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.redBg}`}>
            <Clipboard size={26} weight="duotone" />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Bài tập cần chấm</span>
            <span className={styles.statValue}>15</span>
          </div>
        </div>
      </section>

      {/* 2. KHỐI PHÂN TÍCH VÀ FEED HOẠT ĐỘNG (TEACHER GRID) */}
      <section className={styles.middleGrid}>
        
        {/* Biểu đồ phổ điểm */}
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <div className={styles.headerText}>
              <h3>Biểu đồ phổ điểm</h3>
              <p>Thống kê kết quả học kỳ 1</p>
            </div>
            <select 
              className={styles.dropdownSelect}
              value={selectedClassFilter}
              onChange={(e) => setSelectedClassFilter(e.target.value)}
            >
              <option value="all">Tất cả các lớp</option>
              {classrooms.map(c => (
                <option key={c._id} value={c._id}>{c.className}</option>
              ))}
            </select>
          </div>

          <div className={styles.barChartContainer}>
            <div className={styles.barChart}>
              {/* Cột Giỏi */}
              <div className={styles.barItem}>
                <span className={styles.barValue}>{scoreStats.gioi} HS</span>
                <div className={styles.barColumnWrap}>
                  <div 
                    className={`${styles.barColumn} ${styles.gioi}`} 
                    style={{ height: getBarHeight(scoreStats.gioi) }}
                  />
                </div>
                <span className={styles.barLabel}>Giỏi</span>
              </div>

              {/* Cột Khá */}
              <div className={styles.barItem}>
                <span className={styles.barValue}>{scoreStats.kha} HS</span>
                <div className={styles.barColumnWrap}>
                  <div 
                    className={`${styles.barColumn} ${styles.kha}`} 
                    style={{ height: getBarHeight(scoreStats.kha) }}
                  />
                </div>
                <span className={styles.barLabel}>Khá</span>
              </div>

              {/* Cột Trung Bình */}
              <div className={styles.barItem}>
                <span className={styles.barValue}>{scoreStats.trungBinh} HS</span>
                <div className={styles.barColumnWrap}>
                  <div 
                    className={`${styles.barColumn} ${styles.trungbinh}`} 
                    style={{ height: getBarHeight(scoreStats.trungBinh) }}
                  />
                </div>
                <span className={styles.barLabel}>Trung bình</span>
              </div>
            </div>

            <div className={styles.chartDetails}>
              <div className={styles.detailItem}>
                <span className={styles.label}>Tỷ lệ đạt Khá / Giỏi</span>
                <span className={styles.count} style={{ color: "#10B981" }}>
                  {Math.round(((scoreStats.gioi + scoreStats.kha) / (scoreStats.gioi + scoreStats.kha + scoreStats.trungBinh)) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hoạt động gần đây */}
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <div className={styles.headerText}>
              <h3>Hoạt động gần đây</h3>
            </div>
          </div>

          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                alt="Student Avatar" 
                className={styles.activityAvatar} 
              />
              <div className={styles.activityInfo}>
                <span className={styles.activityDesc}>
                  <strong>Nguyễn Văn A</strong> đã nộp bài tập tin lớp <span className={styles.subjectTag}>Toán Hình học</span>
                </span>
                <span className={styles.activityTime}>2 phút trước</span>
              </div>
              <div className={`${styles.activityIndicator} ${styles.orange}`}>
                <PaperPlaneTilt size={12} weight="bold" />
              </div>
            </div>

            <div className={styles.activityItem}>
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80" 
                alt="Student Avatar" 
                className={styles.activityAvatar} 
              />
              <div className={styles.activityInfo}>
                <span className={styles.activityDesc}>
                  <strong>Lê Thị B</strong> bình luận trên bảng tin lớp <strong>12A1</strong>
                </span>
                <span className={styles.activityTime}>15 phút trước</span>
              </div>
              <div className={`${styles.activityIndicator} ${styles.green}`}>
                <ChatCircleText size={12} weight="bold" />
              </div>
            </div>

            <div className={styles.activityItem}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" 
                alt="Student Avatar" 
                className={styles.activityAvatar} 
              />
              <div className={styles.activityInfo}>
                <span className={styles.activityDesc}>
                  <strong>Trần Minh C</strong> được điểm danh có mặt
                </span>
                <span className={styles.activityTime}>1 giờ trước</span>
              </div>
              <div className={`${styles.activityIndicator} ${styles.blue}`}>
                <CheckSquare size={12} weight="bold" />
              </div>
            </div>
          </div>

          <button className={styles.viewAllBtn}>Xem tất cả</button>
        </div>
      </section>

      {/* 3. BIỂU ĐỒ XU HƯỚNG CHUYÊN CẦN (TEACHER BOTTOM WIDGET) */}
      <section className={styles.bottomCard}>
        <div className={styles.cardHeader}>
          <div className={styles.headerText}>
            <h3>Xu hướng chuyên cần</h3>
            <p>Biến động tỷ lệ đi học trong 6 tháng qua</p>
          </div>
          <div className={styles.trendLegend}>
            <div className={styles.legendItem}>
              <span className={styles.dot} style={{ background: "#10B981" }}></span>
              <span>Hiện tại</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.dot} style={{ background: "#cbd5e1" }}></span>
              <span>Năm ngoái</span>
            </div>
          </div>
        </div>

        <div className={styles.trendChartContainer}>
          <svg className={styles.chartSvg} preserveAspectRatio="none" viewBox="0 0 1000 150">
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <line x1="0" y1="30" x2="1000" y2="30" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="75" x2="1000" y2="75" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="120" x2="1000" y2="120" stroke="#f1f5f9" strokeWidth="1" />

            <path 
              d="M 50 130 Q 230 132 410 115 T 770 120 T 950 100" 
              fill="none" 
              stroke="#cbd5e1" 
              strokeWidth="2.5" 
              strokeDasharray="6,4" 
            />

            <path 
              d="M 50 120 C 180 125, 300 85, 450 100 C 600 115, 750 35, 950 50" 
              fill="url(#areaGradient)" 
            />
            <path 
              d="M 50 120 C 180 125, 300 85, 450 100 C 600 115, 750 35, 950 50" 
              fill="none" 
              stroke="#10B981" 
              strokeWidth="3.5" 
              strokeLinecap="round"
            />

            <circle cx="50" cy="120" r="5" fill="#10B981" stroke="white" strokeWidth="2" />
            <circle cx="230" cy="112" r="5" fill="#10B981" stroke="white" strokeWidth="2" />
            <circle cx="410" cy="98" r="5" fill="#10B981" stroke="white" strokeWidth="2" />
            <circle cx="590" cy="110" r="5" fill="#10B981" stroke="white" strokeWidth="2" />
            <circle cx="770" cy="45" r="5" fill="#10B981" stroke="white" strokeWidth="2" />
            <circle cx="950" cy="50" r="5" fill="#10B981" stroke="white" strokeWidth="2" />
          </svg>

          <div className={styles.xAxis}>
            <span>Tháng 8</span>
            <span>Tháng 9</span>
            <span>Tháng 10</span>
            <span>Tháng 11</span>
            <span>Tháng 12</span>
            <span>Tháng 1</span>
          </div>
        </div>
      </section>

      {/* POPUP MODAL GIÁO VIÊN TẠO LỚP MỚI */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Tạo Lớp Học Mới</h3>
            <form onSubmit={handleCreateClass}>
              <div className={styles.formGroup}>
                <label htmlFor="modalClassName">Tên lớp học</label>
                <input
                  id="modalClassName"
                  type="text"
                  required
                  placeholder="Ví dụ: Lớp Toán 10A (Học thêm)"
                  value={newClass.className}
                  onChange={(e) => setNewClass({ ...newClass, className: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="modalSubject">Môn học / Chủ đề</label>
                <input
                  id="modalSubject"
                  type="text"
                  required
                  placeholder="Ví dụ: Toán học - Đại Số"
                  value={newClass.subject}
                  onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })}
                />
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.btnCancel} onClick={() => setShowModal(false)}>
                  Hủy bỏ
                </button>
                <button type="submit" className={styles.btnConfirm}>
                  Xác nhận tạo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
