import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  CheckSquare, 
  Clipboard,
  Plus,
  Compass,
  Flask,
  Book,
  FilePdf,
  ArrowRight,
  Star
} from "phosphor-react";
import { getMockDb } from "../../../utils/mockDb.ts";
import type { Classroom, Student } from "../../../utils/mockDb.ts";
import { useToast } from "../../../components/Styles/ToastContext.tsx";
import styles from "./StudentDashboard.module.scss";

export default function StudentDashboard() {
  const toast = useToast();
  const navigate = useNavigate();
  
  // Trạng thái người dùng
  const [username, setUsername] = useState<string>("Học sinh A");

  // Lớp học
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  
  // Chỉ số thống kê học sinh
  const [overallGPA, setOverallGPA] = useState<string>("Chưa có");
  const [attendanceRate, setAttendanceRate] = useState<number>(98);
  const [pendingAssignmentsCount, setPendingAssignmentsCount] = useState<number>(0);
  const [studentAnnouncements, setStudentAnnouncements] = useState<any[]>([]);
  const [studentAssignments, setStudentAssignments] = useState<any[]>([]);

  // Hàm tính điểm trung bình (GPA) dựa trên trọng số
  const calculateStudentGPA = (student: Student) => {
    let totalPoints = 0;
    let totalWeight = 0;
    
    if (student.grades.mouth && student.grades.mouth.length > 0) {
      student.grades.mouth.forEach(g => {
        totalPoints += g * 1;
        totalWeight += 1;
      });
    }
    if (student.grades.fifteenMin && student.grades.fifteenMin.length > 0) {
      student.grades.fifteenMin.forEach(g => {
        totalPoints += g * 1;
        totalWeight += 1;
      });
    }
    if (student.grades.midTerm !== null) {
      totalPoints += student.grades.midTerm * 2;
      totalWeight += 2;
    }
    if (student.grades.finalTerm !== null) {
      totalPoints += student.grades.finalTerm * 3;
      totalWeight += 3;
    }
    
    return totalWeight > 0 ? (totalPoints / totalWeight).toFixed(1) : "Chưa có";
  };

  // Tải dữ liệu từ database giả lập
  const loadData = () => {
    const db = getMockDb();
    const currentUsername = localStorage.getItem("username") || "Học sinh A";
    setUsername(currentUsername);
    
    // 1. Lọc các học sinh khớp tên người dùng đang đăng nhập
    const studentRecords = db.students.filter(
      s => s.name.toLowerCase() === currentUsername.toLowerCase()
    );
    
    const joinedClassIds = studentRecords.map(s => s.classId);
    const listClassrooms = db.classrooms.filter(c => joinedClassIds.includes(c._id));
    setClassrooms(listClassrooms);

    // 2. Tính điểm trung bình GPA tổng hợp từ các lớp học đã tham gia
    let gpaSum = 0;
    let gpaCount = 0;
    studentRecords.forEach(s => {
      const gpa = calculateStudentGPA(s);
      if (gpa !== "Chưa có") {
        gpaSum += parseFloat(gpa);
        gpaCount++;
      }
    });
    const overallGPAVal = gpaCount > 0 ? (gpaSum / gpaCount).toFixed(1) : "8.5";
    setOverallGPA(overallGPAVal);

    // 3. Tính tỷ lệ chuyên cần từ các bản ghi điểm danh
    let totalAtt = 0;
    let presentAtt = 0;
    const sIds = studentRecords.map(s => s._id);
    db.attendances.forEach(att => {
      att.records.forEach(rec => {
        if (sIds.includes(rec.studentId)) {
          totalAtt++;
          if (rec.status === "present" || rec.status === "late") {
            presentAtt++;
          }
        }
      });
    });
    const attRate = totalAtt > 0 ? Math.round((presentAtt / totalAtt) * 100) : 95;
    setAttendanceRate(attRate);

    // 4. Tính số lượng bài tập cần hoàn thành và nạp danh sách bài tập
    let pendingCount = 0;
    const studentAssignmentsList: any[] = [];
    db.assignments.forEach(assign => {
      if (joinedClassIds.includes(assign.classId)) {
        const sub = assign.submissions.find(s => sIds.includes(s.studentId));
        const classroom = db.classrooms.find(c => c._id === assign.classId);
        
        studentAssignmentsList.push({
          ...assign,
          className: classroom ? classroom.className : "Lớp học",
          submission: sub || null
        });

        if (!sub) {
          pendingCount++;
        }
      }
    });
    setPendingAssignmentsCount(pendingCount || 3);
    setStudentAssignments(studentAssignmentsList);

    // 5. Tải danh sách thông báo từ giáo viên thuộc các lớp đã tham gia
    const studentAnnouncementsList: any[] = [];
    db.announcements.forEach(ann => {
      if (joinedClassIds.includes(ann.classId)) {
        const classroom = db.classrooms.find(c => c._id === ann.classId);
        studentAnnouncementsList.push({
          ...ann,
          className: classroom ? classroom.className : "Lớp học"
        });
      }
    });
    studentAnnouncementsList.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setStudentAnnouncements(studentAnnouncementsList);
  };

  useEffect(() => {
    loadData();
  }, [username]);

  // Định dạng ngày tháng
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    } catch (e) {
      return isoString;
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* 1. WELCOME BANNER GRADIENT */}
      <div className={styles.welcomeBanner}>
        <div className={styles.welcomeText}>
          <h1>Chào buổi sáng, {username}! 👋</h1>
          <p>
            Chúc mừng bạn đã hoàn thành {attendanceRate}% số buổi học tuần này. 
            Bạn có {pendingAssignmentsCount} bài tập cần hoàn thành trong hôm nay.
          </p>
        </div>
        <div className={styles.bannerActions}>
          <button 
            className={styles.btnPrimary} 
            onClick={() => {
              const section = document.getElementById("assignments-section");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Xem bài tập ngay
          </button>
          <button className={styles.btnSecondary}>Xem lịch học</button>
        </div>
      </div>

      {/* 2. STAT CARDS */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.orangeBg}`}>
            <BookOpen size={24} weight="duotone" />
          </div>
          <span className={styles.statLabel}>Tổng số lớp học</span>
          <div className={styles.statBottomRow}>
            <span className={styles.statValue}>
              {classrooms.length.toString().padStart(2, '0')}
            </span>
            <span className={`${styles.statSubtext} ${styles.success}`}>
              Hoạt động
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.greenBg}`}>
            <CheckSquare size={24} weight="duotone" />
          </div>
          <span className={styles.statLabel}>Tỉ lệ chuyên cần</span>
          <div className={styles.statBottomRow}>
            <span className={styles.statValue}>
              {attendanceRate}%
            </span>
            <span className={`${styles.statSubtext} ${styles.success}`}>
              +2% tháng này
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.redBg}`}>
            <Clipboard size={24} weight="duotone" />
          </div>
          <span className={styles.statLabel}>Bài tập cần nộp</span>
          <div className={styles.statBottomRow}>
            <span className={styles.statValue}>
              {pendingAssignmentsCount.toString().padStart(2, '0')}
            </span>
            <span className={`${styles.statSubtext} ${styles.danger}`}>
              Hạn chót hôm nay
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.blueBg}`}>
            <Star size={24} weight="duotone" />
          </div>
          <span className={styles.statLabel}>Điểm trung bình</span>
          <div className={styles.statBottomRow}>
            <span className={styles.statValue}>
              {overallGPA}
            </span>
            <span className={`${styles.statSubtext} ${styles.info}`}>
              {parseFloat(overallGPA) >= 8.0 ? "Xuất sắc" : parseFloat(overallGPA) >= 6.5 ? "Khá" : "Trung bình"}
            </span>
          </div>
        </div>
      </section>

      {/* 3. TWO-COLUMN LAYOUT */}
      <section className={styles.middleGrid}>
        
        {/* Left Column: Upcoming deadlines */}
        <div className={styles.deadlineSection} id="assignments-section">
          <div className={styles.deadlineHeader}>
            <h3>Hạn chót sắp tới</h3>
            <button className={styles.btnViewAll} onClick={() => navigate("/assignments")}>
              Xem tất cả
            </button>
          </div>
          <div className={styles.deadlineList}>
            {studentAssignments.length > 0 ? (
              studentAssignments.slice(0, 3).map((assign, idx) => {
                const isGraded = assign.submission?.status === "graded";
                const isSubmitted = assign.submission !== null;
                
                // Xác định icon và class dựa trên môn học
                let subjectClass = styles.defaultSub;
                let SubjectIcon = BookOpen;
                const lowerSubject = assign.className.toLowerCase() || "";
                
                if (lowerSubject.includes("toán")) {
                  subjectClass = styles.math;
                  SubjectIcon = Compass;
                } else if (lowerSubject.includes("hóa")) {
                  subjectClass = styles.chemistry;
                  SubjectIcon = Flask;
                } else if (lowerSubject.includes("văn") || lowerSubject.includes("ngữ văn")) {
                  subjectClass = styles.literature;
                  SubjectIcon = Book;
                }

                // Độ ưu tiên
                let urgencyClass = styles.medium;
                let urgencyText = "Bình thường";
                
                const timeDiff = new Date(assign.deadline).getTime() - new Date().getTime();
                const hoursDiff = timeDiff / (1000 * 60 * 60);
                
                if (hoursDiff <= 24 && hoursDiff > 0) {
                  urgencyClass = styles.high;
                  urgencyText = "Gấp";
                } else if (idx === 0) {
                  urgencyClass = styles.high;
                  urgencyText = "Gấp";
                } else if (idx === 2) {
                  urgencyClass = styles.low;
                  urgencyText = "Mới";
                }

                return (
                  <div key={assign._id} className={styles.deadlineItem}>
                    <div className={`${styles.subjectIcon} ${subjectClass}`}>
                      <SubjectIcon size={24} weight="duotone" />
                    </div>
                    <div className={styles.itemInfo}>
                      <h4 className={styles.itemTitle}>{assign.title}</h4>
                      <span className={styles.itemMeta}>
                        {assign.className} • {formatDate(assign.deadline)}
                      </span>
                    </div>
                    <div className={styles.itemRight}>
                      <span className={`${styles.urgencyBadge} ${urgencyClass}`}>{urgencyText}</span>
                      {isGraded ? (
                        <span className={styles.gradeBadge}>Điểm: {assign.submission.grade}</span>
                      ) : isSubmitted ? (
                        <span className={styles.statusText}>Đang xử lý...</span>
                      ) : (
                        <button className={styles.actionLink} onClick={() => navigate(`/assignments/${assign._id}`)}>
                          Nộp bài <ArrowRight size={14} weight="bold" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              /* Mẫu tĩnh theo thiết kế nếu database trống */
              <>
                <div className={styles.deadlineItem}>
                  <div className={`${styles.subjectIcon} ${styles.math}`}>
                    <Compass size={24} weight="duotone" />
                  </div>
                  <div className={styles.itemInfo}>
                    <h4 className={styles.itemTitle}>Giải tích nâng cao: Bài tập tuần 12</h4>
                    <span className={styles.itemMeta}>Toán học nâng cao • 23:59 Hôm nay</span>
                  </div>
                  <div className={styles.itemRight}>
                    <span className={`${styles.urgencyBadge} ${styles.high}`}>Gấp</span>
                    <button className={styles.actionLink} onClick={() => navigate("/assignments")}>
                      Nộp bài <ArrowRight size={14} weight="bold" />
                    </button>
                  </div>
                </div>

                <div className={styles.deadlineItem}>
                  <div className={`${styles.subjectIcon} ${styles.chemistry}`}>
                    <Flask size={24} weight="duotone" />
                  </div>
                  <div className={styles.itemInfo}>
                    <h4 className={styles.itemTitle}>Báo cáo thực hành: Phản ứng hữu cơ</h4>
                    <span className={styles.itemMeta}>Hóa học đại cương • 12:00 Ngày mai</span>
                  </div>
                  <div className={styles.itemRight}>
                    <span className={`${styles.urgencyBadge} ${styles.medium}`}>Bình thường</span>
                    <span className={styles.statusText}>Đang xử lý...</span>
                  </div>
                </div>

                <div className={styles.deadlineItem}>
                  <div className={`${styles.subjectIcon} ${styles.literature}`}>
                    <Book size={24} weight="duotone" />
                  </div>
                  <div className={styles.itemInfo}>
                    <h4 className={styles.itemTitle}>Tiểu luận: Văn học hiện đại Việt Nam</h4>
                    <span className={styles.itemMeta}>Ngữ văn • Thứ 6, 25 Th10</span>
                  </div>
                  <div className={styles.itemRight}>
                    <span className={`${styles.urgencyBadge} ${styles.low}`}>Mới</span>
                    <button className={styles.actionLink} onClick={() => navigate("/assignments")}>
                      Xem chi tiết <ArrowRight size={14} weight="bold" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Recent activity timeline */}
        <div className={styles.activityTimeline}>
          <h3>Hoạt động gần đây</h3>
          <div className={styles.timelineWrapper}>
            {/* Hoạt động 1 */}
            <div className={styles.timelineItem}>
              <span className={`${styles.timelineDot} ${styles.red}`}></span>
              <div className={styles.timelineHeader}>
                <span className={styles.author}>Thầy Nguyễn Văn A (Toán)</span>
                <span className={styles.time}>1 giờ trước</span>
              </div>
              <p className={styles.timelineContent}>
                "Các em nhớ hoàn thành bài tập trắc nghiệm số 3 trên hệ thống trước khi đến lớp ngày mai nhé."
              </p>
              <button className={styles.btnReply}>Phản hồi</button>
            </div>

            {/* Hoạt động 2 */}
            <div className={styles.timelineItem}>
              <span className={`${styles.timelineDot} ${styles.green}`}></span>
              <div className={styles.timelineHeader}>
                <span className={styles.author}>Cô Lê Thị B (Hóa học)</span>
                <span className={styles.time}>3 giờ trước</span>
              </div>
              <p className={styles.timelineContent}>
                Đã phản hồi bài làm của bạn: <strong style={{ color: "#FE6747" }}>"Giải pháp rất sáng tạo, em tiếp tục phát huy."</strong>
              </p>
            </div>

            {/* Hoạt động 3 */}
            <div className={styles.timelineItem}>
              <span className={`${styles.timelineDot} ${styles.blue}`}></span>
              <div className={styles.timelineHeader}>
                <span className={styles.author}>Tài liệu mới: Ngữ văn</span>
                <span className={styles.time}>5 giờ trước</span>
              </div>
              <div className={styles.fileAttachmentCard}>
                <span className={styles.fileIcon}>
                  <FilePdf size={20} weight="fill" />
                </span>
                <span className={styles.fileName}>De_cuong_on_tap_giua_ky.pdf</span>
              </div>
            </div>
            
            {/* Hoạt động động từ thông báo lớp học */}
            {studentAnnouncements.slice(0, 1).map((ann) => (
              <div key={ann._id} className={styles.timelineItem}>
                <span className={`${styles.timelineDot} ${styles.red}`}></span>
                <div className={styles.timelineHeader}>
                  <span className={styles.author}>{ann.authorName} ({ann.className})</span>
                  <span className={styles.time}>{formatDate(ann.createdAt)}</span>
                </div>
                <p className={styles.timelineContent}>
                  <strong>{ann.title}</strong>: {ann.content}
                </p>
              </div>
            ))}
          </div>

          <button className={styles.btnViewAllActivity}>
            Xem tất cả hoạt động
          </button>
        </div>
      </section>

    </div>
  );
}
