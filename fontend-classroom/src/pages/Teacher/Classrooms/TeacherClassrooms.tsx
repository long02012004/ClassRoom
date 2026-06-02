import React, { useState, useEffect } from "react";
import { Plus, Chalkboard, Users, Key } from "phosphor-react";
import { getMockClassrooms, createMockClassroom, getMockDb } from "../../../utils/mockDb.ts";
import type { Classroom } from "../../../utils/mockDb.ts";
import { useToast } from "../../../components/Styles/ToastContext.tsx";
import styles from "./TeacherClassrooms.module.scss";

export default function TeacherClassrooms() {
  const toast = useToast();
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newClass, setNewClass] = useState({ className: "", subject: "Toán học" });
  const [studentCounts, setStudentCounts] = useState<Record<string, number>>({});

  const loadData = () => {
    // Chỉ tải các lớp học của giáo viên hiện tại (teacher-1)
    const list = getMockClassrooms();
    setClassrooms(list);

    // Tính số học sinh trong mỗi lớp học
    const db = getMockDb();
    const counts: Record<string, number> = {};
    list.forEach((cls) => {
      counts[cls._id] = db.students.filter(s => s.classId === cls._id).length;
    });
    setStudentCounts(counts);
  };

  useEffect(() => {
    loadData();
    const handleOpenModal = () => setShowModal(true);
    window.addEventListener("open-new-class-modal", handleOpenModal);
    return () => {
      window.removeEventListener("open-new-class-modal", handleOpenModal);
    };
  }, []);

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.className || !newClass.subject) {
      toast.error("Vui lòng điền đầy đủ thông tin tên lớp và môn học!");
      return;
    }

    try {
      createMockClassroom(newClass.className, newClass.subject);
      toast.success(`Tạo lớp học "${newClass.className}" thành công!`, 3000);
      setNewClass({ className: "", subject: "Toán học" });
      setShowModal(false);
      loadData();
    } catch (err) {
      toast.error("Đã xảy ra lỗi khi tạo lớp học!");
    }
  };

  return (
    <div className={styles.classroomsPage}>
      {/* HEADER */}
      <div className={styles.pageHeader}>
        <div className={styles.headerText}>
          <h2>Danh sách lớp học phụ trách</h2>
          <p>Quản lý các lớp ôn luyện thêm, theo dõi sĩ số và phân phối mã code.</p>
        </div>
        <button className={styles.btnCreateHeader} onClick={() => setShowModal(true)}>
          <Plus size={18} weight="bold" />
          <span>Tạo lớp học mới</span>
        </button>
      </div>

      {/* GRID */}
      <div className={styles.classesGrid}>
        {classrooms.map((cls) => (
          <div key={cls._id} className={styles.classCard}>
            <div className={styles.cardTop}>
              <div className={styles.iconBox}>
                <Chalkboard size={22} weight="duotone" />
              </div>
              <span className={styles.subjectTag}>{cls.subject}</span>
            </div>

            <div className={styles.cardMiddle}>
              <h3 className={styles.classTitle}>{cls.className}</h3>
              <div className={styles.codeRow}>
                <Key size={14} weight="bold" />
                <span>Mã tham gia: <strong>{cls.classCode}</strong></span>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.studentsCount}>
                <Users size={16} />
                <span>Sĩ số: {studentCounts[cls._id] || 0} học sinh</span>
              </div>
              <button className={styles.btnManage}>Quản lý lớp</button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
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
                  placeholder="Ví dụ: Lớp Toán - Khối 9"
                  value={newClass.className}
                  onChange={(e) => setNewClass({ ...newClass, className: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="modalSubject">Môn học phụ trách</label>
                <input
                  id="modalSubject"
                  type="text"
                  required
                  placeholder="Ví dụ: Toán học"
                  value={newClass.subject}
                  onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })}
                />
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.btnCancel} onClick={() => setShowModal(false)}>
                  Hủy bỏ
                </button>
                <button type="submit" className={styles.btnConfirm}>
                  Tạo lớp học
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
