import { useState, useEffect } from "react";
import { Plus, BookOpen, Clock, Users, ArrowRight } from "phosphor-react";
import { getMockDb } from "../../../utils/mockDb.ts";
import styles from "./TeacherAssignments.module.scss";

export default function TeacherAssignments() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [filterClass, setFilterClass] = useState("all");

  useEffect(() => {
    const db = getMockDb();
    setClassrooms(db.classrooms || []);
    
    // Map assignments with class info and submission stats
    const list = (db.assignments || []).map((assign) => {
      const cls = db.classrooms.find((c) => c._id === assign.classId);
      const studentsInClass = db.students.filter(s => s.classId === assign.classId).length;
      const submitted = assign.submissions ? assign.submissions.length : 0;
      const graded = assign.submissions ? assign.submissions.filter(s => s.status === "graded").length : 0;
      
      return {
        ...assign,
        className: cls?.className || "Lớp học",
        totalStudents: studentsInClass || 1, // default to 1 to avoid div by zero if mock data has no students
        submitted,
        graded
      };
    });
    
    // Sort by deadline descending (newest first)
    list.sort(
      (a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
    );
    setAssignments(list);
  }, []);

  const formatDeadline = (iso: string) => {
    const d = new Date(iso);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} • ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  const filteredAssignments = filterClass === "all" 
    ? assignments 
    : assignments.filter(a => a.classId === filterClass);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h2>Quản lý Bài tập</h2>
          <p>Tạo và chấm điểm bài tập cho các lớp học</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnNew} onClick={() => alert("Chức năng tạo bài tập sẽ được thêm sau")}>
            <Plus size={20} weight="bold" />
            <span>Giao bài tập mới</span>
          </button>
        </div>
      </div>

      <div className={styles.filters}>
        <select 
          className={styles.filterSelect}
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
        >
          <option value="all">Tất cả lớp học</option>
          {classrooms.map(c => (
            <option key={c._id} value={c._id}>{c.className}</option>
          ))}
        </select>
      </div>

      <div className={styles.assignmentList}>
        {filteredAssignments.map((assign) => (
          <div key={assign._id} className={styles.assignCard}>
            <div className={styles.cardHeader}>
              <span className={styles.classTag}>{assign.className}</span>
            </div>
            
            <h4 className={styles.cardTitle}>{assign.title}</h4>
            
            <div className={styles.cardMeta}>
              <div className={styles.metaItem}>
                <Clock size={16} />
                <span>Hạn nộp: {formatDeadline(assign.deadline)}</span>
              </div>
            </div>

            <div className={styles.cardProgress}>
              <div className={styles.progressStats}>
                <div className={styles.stat}>
                  <span>Đã nộp</span>
                  <span>{assign.submitted} / {assign.totalStudents}</span>
                </div>
                <div className={styles.stat}>
                  <span>Đã chấm</span>
                  <span style={{ color: assign.graded < assign.submitted ? "var(--warning-color)" : "inherit" }}>
                    {assign.graded} / {assign.submitted}
                  </span>
                </div>
              </div>
              
              <ArrowRight size={20} className={styles.arrow} />
            </div>
          </div>
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <div className={styles.emptyState}>
          <BookOpen size={48} className={styles.emptyIcon} />
          <h4>Chưa có bài tập nào</h4>
          <p>Nhấn "Giao bài tập mới" để bắt đầu giao bài cho học sinh.</p>
        </div>
      )}
    </div>
  );
}
