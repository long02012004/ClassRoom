import React, { useState, useEffect } from "react";
import { Plus, Chalkboard, Users, Key } from "phosphor-react";
import { getMockClassrooms, createMockClassroom, getMockDb } from "../../../utils/mockDb.ts";
import type { Classroom } from "../../../utils/mockDb.ts";
import { useToast } from "../../../components/Styles/ToastContext.tsx";
import { useNavigate } from "react-router-dom";
import styles from "./TeacherClassrooms.module.scss";

export default function TeacherClassrooms() {
  const toast = useToast();
  const navigate = useNavigate();
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
          <div 
            key={cls._id} 
            className={styles.classCard}
            onClick={() => navigate(`/classrooms/${cls._id}`)}
            style={{ cursor: "pointer" }}
          >
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
              <button 
                className={styles.btnManage} 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/classrooms/${cls._id}/students`);
                }}
              >
                Quản lý học sinh
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.headerText}>
                <h3>Tạo lớp học mới</h3>
                <p>Điền thông tin để bắt đầu lớp học của bạn</p>
              </div>
              <button className={styles.btnClose} onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <form onSubmit={handleCreateClass}>
                <div className={styles.formGroup}>
                  <label htmlFor="modalClassName">Tên lớp học</label>
                  <input
                    id="modalClassName"
                    type="text"
                    required
                    placeholder="Ví dụ: Lớp 12A1 - Toán Học"
                    value={newClass.className}
                    onChange={(e) => setNewClass({ ...newClass, className: e.target.value })}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="modalSubject">Môn học</label>
                    <select
                      id="modalSubject"
                      required
                      value={newClass.subject}
                      onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })}
                    >
                      <option value="Toán học">Toán học</option>
                      <option value="Vật lý">Vật lý</option>
                      <option value="Hóa học">Hóa học</option>
                      <option value="Ngữ văn">Ngữ văn</option>
                      <option value="Tiếng Anh">Tiếng Anh</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="modalGrade">Khối lớp</label>
                    <select id="modalGrade">
                      <option value="10">Khối 10</option>
                      <option value="11">Khối 11</option>
                      <option value="12">Khối 12</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="modalRoom">Phòng học (Không bắt buộc)</label>
                  <input
                    id="modalRoom"
                    type="text"
                    placeholder="Ví dụ: Phòng 302 - Tòa A"
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
        </div>
      )}
    </div>
  );
}
