import React, { useState } from "react";
import { 
  DownloadSimple, 
  FloppyDisk, 
  CheckCircle,
  Clock,
  XCircle,
  ListBullets,
  CalendarBlank
} from "phosphor-react";
import styles from "./TeacherAttendance.module.scss";

// Mock Data
const mockStudents = [
  { id: "#230101", name: "Nguyễn Hoàng Nam", initials: "NH", bg: "#d1fae5", color: "#059669", progress: 98, status: "present", note: "" },
  { id: "#230102", name: "Trần Linh Chi", initials: "TL", bg: "#fee2e2", color: "#dc2626", progress: 82, status: "late", note: "Xe bus hỏng" },
  { id: "#230103", name: "Võ Minh Anh", initials: "VM", bg: "#dbeafe", color: "#2563eb", progress: 95, status: "absent", note: "" },
];

export default function TeacherAttendance() {
  const [students, setStudents] = useState(mockStudents);
  const [selectedDate, setSelectedDate] = useState("2023-10-27");
  const [selectedClass, setSelectedClass] = useState("12A1");

  const handleStatusChange = (id: string, newStatus: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, status: newStatus };
      }
      return s;
    }));
  };

  const totalStudents = students.length + 29; // Mocking 32
  const presentCount = students.filter(s => s.status === 'present').length + 27; // Mocking 28

  return (
    <div className={styles.attendanceContainer}>
      
      {/* FILTER & STATS SECTION */}
      <section className={styles.filterSection}>
        <div className={styles.filtersLeft}>
          <div className={styles.filterGroup}>
            <label>Chọn Lớp</label>
            <select 
              className={styles.selectInput}
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="12A1">Lớp 12A1 (Toán)</option>
              <option value="12A2">Lớp 12A2 (Toán)</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Ngày Điểm Danh</label>
            <div className={styles.dateInputWrapper}>
              <input 
                type="date" 
                className={styles.dateInput}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.statsGroup}>
            <div className={styles.statItem}>
              <span className={styles.statNumRed}>{totalStudents}</span>
              <span className={styles.statLabel}>SĨ SỐ</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumGreen}>{presentCount}</span>
              <span className={styles.statLabel}>CÓ MẶT</span>
            </div>
          </div>
        </div>

        <div className={styles.filtersRight}>
          <button className={styles.btnExport}>
            <DownloadSimple size={18} weight="bold" />
            Xuất báo cáo
          </button>
          <button className={styles.btnSave}>
            <FloppyDisk size={18} weight="bold" />
            Lưu điểm danh
          </button>
        </div>
      </section>

      {/* TABLE SECTION */}
      <section className={styles.tableSection}>
        <table className={styles.attendanceTable}>
          <thead>
            <tr>
              <th className={styles.colId}>Mã HS</th>
              <th className={styles.colName}>Học sinh</th>
              <th className={styles.colProgress}>Chuyên cần</th>
              <th className={styles.colStatus}>Trạng thái điểm danh</th>
              <th className={styles.colNote}>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td className={styles.colId}>{student.id}</td>
                <td className={styles.colName}>
                  <div className={styles.studentInfo}>
                    <div 
                      className={styles.avatarInitials} 
                      style={{ backgroundColor: student.bg, color: student.color }}
                    >
                      {student.initials}
                    </div>
                    <span className={styles.studentName}>{student.name}</span>
                  </div>
                </td>
                <td className={styles.colProgress}>
                  <div className={styles.progressWrapper}>
                    <div className={styles.progressBarBg}>
                      <div 
                        className={styles.progressBarFill}
                        style={{ 
                          width: `${student.progress}%`,
                          backgroundColor: student.progress >= 90 ? '#059669' : '#fbbf24'
                        }}
                      ></div>
                    </div>
                    <span 
                      className={styles.progressText}
                      style={{ color: student.progress >= 90 ? '#059669' : '#d97706' }}
                    >
                      {student.progress}%
                    </span>
                  </div>
                </td>
                <td className={styles.colStatus}>
                  <div className={styles.statusButtons}>
                    <button 
                      className={`${styles.statusBtn} ${student.status === 'present' ? styles.activePresent : ''}`}
                      onClick={() => handleStatusChange(student.id, 'present')}
                    >
                      <CheckCircle size={18} weight="bold" />
                      Có mặt
                    </button>
                    <button 
                      className={`${styles.statusBtn} ${student.status === 'late' ? styles.activeLate : ''}`}
                      onClick={() => handleStatusChange(student.id, 'late')}
                    >
                      <Clock size={18} weight="bold" />
                      Muộn
                    </button>
                    <button 
                      className={`${styles.statusBtn} ${student.status === 'absent' ? styles.activeAbsent : ''}`}
                      onClick={() => handleStatusChange(student.id, 'absent')}
                    >
                      <XCircle size={18} weight="bold" />
                      Vắng
                    </button>
                  </div>
                </td>
                <td className={styles.colNote}>
                  {student.note ? (
                    <span className={styles.noteText}>{student.note}</span>
                  ) : (
                    <button className={styles.noteIconBtn}>
                      <ListBullets size={20} weight="bold" color="#94a3b8" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {/* Skeleton Row */}
            <tr className={styles.skeletonRow}>
              <td><div className={styles.skelText}>#230104</div></td>
              <td>
                <div className={styles.skelAvatarWrapper}>
                  <div className={styles.skelAvatar}></div>
                  <div className={styles.skelName}></div>
                </div>
              </td>
              <td><div className={styles.skelProgress}></div></td>
              <td>
                <div className={styles.skelButtons}>
                  <div className={styles.skelBtn}></div>
                  <div className={styles.skelBtn}></div>
                  <div className={styles.skelBtn}></div>
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* FOOTER SECTION */}
      <footer className={styles.footerSection}>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={styles.dot} style={{ backgroundColor: '#34d399' }}></span>
            Có mặt
          </div>
          <div className={styles.legendItem}>
            <span className={styles.dot} style={{ backgroundColor: '#fbbf24' }}></span>
            Đi muộn
          </div>
          <div className={styles.legendItem}>
            <span className={styles.dot} style={{ backgroundColor: '#f87171' }}></span>
            Vắng mặt
          </div>
        </div>
        <div className={styles.lastUpdate}>
          Cập nhật lần cuối: 08:30 AM - 27/10/2023
        </div>
      </footer>
    </div>
  );
}
