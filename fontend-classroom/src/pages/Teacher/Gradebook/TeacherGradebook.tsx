import React, { useState } from "react";
import { 
  DownloadSimple, 
  FloppyDisk, 
  CloudArrowUp,
  SortDescending,
  NotePencil,
  BellRinging,
  CaretRight,
  Article,
  Question,
  BookOpen
} from "phosphor-react";
import styles from "./TeacherGradebook.module.scss";

// --- Mock Data ---
const mockStudents = [
  { 
    id: "1201", 
    name: "Nguyễn Văn Lộc", 
    initials: "NL", 
    bg: "#fee2e2", 
    color: "#dc2626", 
    scores: { oral: 9.0, min15: 8.5, mid: 8.0, final: 9.5 }, 
    avg: 8.8, 
    rank: "Giỏi",
    rankClass: styles.rankGood
  },
  { 
    id: "1202", 
    name: "Trần Minh Hiếu", 
    initials: "TH", 
    bg: "#e0e7ff", 
    color: "#4f46e5", 
    scores: { oral: 7.0, min15: 6.5, mid: 7.5, final: 4.0 }, 
    avg: 5.8, 
    rank: "TB",
    rankClass: styles.rankAvg
  },
  { 
    id: "1203", 
    name: "Võ Thị Thắm", 
    initials: "VT", 
    bg: "#dcfce7", 
    color: "#16a34a", 
    scores: { oral: 10.0, min15: 9.0, mid: 9.5, final: 10.0 }, 
    avg: 9.7, 
    rank: "Xuất sắc",
    rankClass: styles.rankExcellent
  },
];

const mockAssignments = [
  { 
    id: 1, 
    title: 'Phân tích "Vợ Nhặt"', 
    deadline: 'Hạn chót: 24/10/2023 • Văn học', 
    iconBg: '#dbeafe', 
    iconColor: '#2563eb', 
    submitted: 32, 
    total: 45, 
    statusText: 'ĐÃ NỘP',
    type: 'doc'
  },
  { 
    id: 2, 
    title: 'Trắc nghiệm Từ vựng Unit 5', 
    deadline: 'Hạn chót: Hôm nay • Tiếng Anh', 
    iconBg: '#fee2e2', 
    iconColor: '#dc2626', 
    submitted: 12, 
    total: 45, 
    statusText: 'ĐÃ NỘP', 
    alarm: true,
    type: 'quiz'
  },
  { 
    id: 3, 
    title: 'Dự án nhóm: Thực hành Hóa học', 
    deadline: 'Hạn chót: 30/10/2023 • Hóa học', 
    iconBg: '#dcfce7', 
    iconColor: '#16a34a', 
    submitted: 0, 
    total: 45, 
    statusText: 'CHƯA MỞ', 
    edit: true,
    type: 'project'
  },
];

export default function TeacherGradebook() {
  const [students, setStudents] = useState(mockStudents);

  const handleScoreChange = (id: string, field: string, value: string) => {
    // In a real app, you would parse the number and recalculate the average
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          scores: { ...s.scores, [field]: value }
        };
      }
      return s;
    }));
  };

  const getIcon = (type: string, color: string) => {
    if (type === 'doc') return <Article size={24} color={color} weight="fill" />;
    if (type === 'quiz') return <Question size={24} color={color} weight="fill" />;
    return <BookOpen size={24} color={color} weight="fill" />;
  };

  return (
    <div className={styles.gradebookContainer}>
      
      {/* 1. CHI TIẾT SỔ ĐIỂM (TOP TABLE) */}
      <section className={styles.topSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerInfo}>
            <h2>Chi tiết Sổ điểm</h2>
            <p>Lớp 12A1 - Học kỳ I</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.btnOutline}>
              <DownloadSimple size={18} weight="bold" />
              Xuất Excel
            </button>
            <button className={styles.btnPrimary}>
              <FloppyDisk size={18} weight="bold" />
              Lưu thay đổi
            </button>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.scoresTable}>
            <thead>
              <tr>
                <th className={styles.colStudent}>Học sinh</th>
                <th>Miệng</th>
                <th>15 phút</th>
                <th>Giữa kỳ (x2)</th>
                <th>Cuối kỳ (x3)</th>
                <th className={styles.colAvg}>ĐTB</th>
                <th className={styles.colRank}>Xếp loại</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className={styles.colStudent}>
                    <div className={styles.studentInfo}>
                      <div 
                        className={styles.avatarInitials} 
                        style={{ backgroundColor: student.bg, color: student.color }}
                      >
                        {student.initials}
                      </div>
                      <div className={styles.nameDetails}>
                        <span className={styles.studentName}>{student.name}</span>
                        <span className={styles.studentId}>MSHS: {student.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <input 
                      type="number" 
                      className={styles.scoreInput} 
                      value={student.scores.oral}
                      onChange={(e) => handleScoreChange(student.id, 'oral', e.target.value)}
                      step="0.1"
                      min="0"
                      max="10"
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      className={styles.scoreInput} 
                      value={student.scores.min15}
                      onChange={(e) => handleScoreChange(student.id, 'min15', e.target.value)}
                      step="0.1"
                      min="0"
                      max="10"
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      className={styles.scoreInput} 
                      value={student.scores.mid}
                      onChange={(e) => handleScoreChange(student.id, 'mid', e.target.value)}
                      step="0.1"
                      min="0"
                      max="10"
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      className={`${styles.scoreInput} ${student.scores.final < 5 ? styles.highlightInput : ''}`} 
                      value={student.scores.final}
                      onChange={(e) => handleScoreChange(student.id, 'final', e.target.value)}
                      step="0.1"
                      min="0"
                      max="10"
                    />
                  </td>
                  <td className={styles.colAvg}>
                    <span className={`${styles.avgValue} ${student.avg >= 8.0 ? styles.textGreen : (student.avg < 6.0 ? styles.textDark : styles.textDark)}`}>
                      {student.avg.toFixed(1)}
                    </span>
                  </td>
                  <td className={styles.colRank}>
                    <span className={`${styles.rankBadge} ${student.rankClass}`}>
                      {student.rank}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. BOTTOM SECTION: 2 COLUMNS */}
      <section className={styles.bottomSection}>
        
        {/* LEFT COLUMN: Giao bài tập mới */}
        <div className={styles.leftColumn}>
          <div className={styles.cardHeader}>
            <h3>Giao bài tập mới</h3>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.formGroup}>
              <label>Tiêu đề bài tập</label>
              <input type="text" placeholder="Nhập tên bài tập..." className={styles.formInput} />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Hạn nộp</label>
                <div className={styles.dateInputWrapper}>
                  <input type="text" placeholder="mm/dd/yyyy" className={styles.formInput} />
                  <span className={styles.calendarIcon}>📅</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Loại bài</label>
                <select className={styles.formSelect}>
                  <option>Về nhà</option>
                  <option>Kiểm tra</option>
                  <option>Dự án</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Mô tả chi tiết</label>
              <textarea 
                placeholder="Yêu cầu học sinh nộp bài định dạng PDF..." 
                className={styles.formTextarea} 
                rows={4}
              ></textarea>
            </div>

            <div className={styles.dragDropArea}>
              <CloudArrowUp size={32} weight="fill" color="#7c2d12" />
              <span className={styles.dragText}>Kéo thả file tài liệu vào đây</span>
              <span className={styles.dragSubtext}>Hỗ trợ PDF, DOCX, ZIP (Max 25MB)</span>
            </div>

            <button className={styles.btnSubmit}>Giao bài ngay</button>
          </div>
        </div>

        {/* RIGHT COLUMN: Danh sách & Tổng quan */}
        <div className={styles.rightColumn}>
          
          <div className={styles.listHeader}>
            <h3>Danh sách bài đã giao</h3>
            <button className={styles.btnFilter}>
              <SortDescending size={18} />
              Mới nhất
            </button>
          </div>

          <div className={styles.assignmentList}>
            {mockAssignments.map((task) => (
              <div key={task.id} className={styles.assignmentCard}>
                <div className={styles.taskLeft}>
                  <div 
                    className={styles.taskIcon} 
                    style={{ backgroundColor: task.iconBg }}
                  >
                    {getIcon(task.type, task.iconColor)}
                  </div>
                  <div className={styles.taskInfo}>
                    <h4>{task.title}</h4>
                    <p>{task.deadline}</p>
                  </div>
                </div>
                
                <div className={styles.taskRight}>
                  <div className={styles.taskStats}>
                    <span className={`${styles.statRatio} ${task.alarm ? styles.textRed : (task.submitted === 0 ? styles.textDark : styles.textGreen)}`}>
                      {task.submitted}/{task.total}
                    </span>
                    <span className={`${styles.statLabel} ${task.alarm ? styles.textRed : ''}`}>{task.statusText}</span>
                  </div>
                  
                  <div className={styles.taskAction}>
                    {task.alarm && <BellRinging size={20} color="#dc2626" weight="fill" />}
                    {task.edit && <NotePencil size={20} color="#4b5563" />}
                    {!task.alarm && !task.edit && <CaretRight size={20} color="#4b5563" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.behaviorOverview}>
            <div className={styles.overviewInfo}>
              <h4>TỔNG QUAN HÀNH VI</h4>
              <span className={styles.overviewTitle}>Tỷ lệ nộp bài đúng hạn</span>
              <p>Tăng 12% so với tuần trước nhờ thông báo tự động.</p>
            </div>
            <div className={styles.overviewChart}>
              <div className={styles.barWrap}><div className={styles.bar} style={{ height: '40%' }}></div></div>
              <div className={styles.barWrap}><div className={styles.bar} style={{ height: '70%' }}></div></div>
              <div className={styles.barWrap}><div className={styles.bar} style={{ height: '50%' }}></div></div>
              <div className={styles.barWrap}><div className={styles.bar} style={{ height: '100%', backgroundColor: '#4ade80' }}></div></div>
              <div className={styles.barWrap}><div className={styles.bar} style={{ height: '60%' }}></div></div>
            </div>
          </div>

        </div>

      </section>
    </div>
  );
}
