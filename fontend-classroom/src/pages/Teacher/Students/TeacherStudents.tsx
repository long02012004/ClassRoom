import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, UserList, EnvelopeSimple, Key, CaretLeft, Phone } from "phosphor-react";
import { getMockStudents, addMockStudent, getMockClassrooms } from "../../../utils/mockDb.ts";
import type { Student, Classroom } from "../../../utils/mockDb.ts";
import { useToast } from "../../../components/Styles/ToastContext.tsx";
import styles from "./TeacherStudents.module.scss";

export default function TeacherStudents() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [students, setStudents] = useState<Student[]>([]);
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", email: "", password: "", parentPhone: "" });

  const loadData = () => {
    if (!id) return;
    const list = getMockStudents(id);
    setStudents(list);

    const classrooms = getMockClassrooms();
    const cls = classrooms.find(c => c._id === id);
    if (cls) setClassroom(cls);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    if (!newStudent.name || !newStudent.email || !newStudent.password) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    try {
      addMockStudent(id, newStudent.name, newStudent.parentPhone || "Không có", newStudent.email, newStudent.password);
      toast.success(`Tạo tài khoản học sinh "${newStudent.name}" thành công!`, 3000);
      setNewStudent({ name: "", email: "", password: "", parentPhone: "" });
      setShowModal(false);
      loadData();
    } catch (err) {
      toast.error("Đã xảy ra lỗi khi tạo tài khoản!");
    }
  };

  if (!classroom) return <div className={styles.loading}>Đang tải...</div>;

  return (
    <div className={styles.page}>
      <button className={styles.btnBack} onClick={() => navigate("/classrooms")}>
        <CaretLeft size={20} weight="bold" />
        Quay lại danh sách lớp
      </button>

      {/* HEADER */}
      <div className={styles.pageHeader}>
        <div className={styles.headerText}>
          <h2>Quản lý Học sinh - {classroom.className}</h2>
          <p>Tạo tài khoản học viên tham gia lớp học và cung cấp thông tin đăng nhập cho học sinh.</p>
        </div>
        <button className={styles.btnCreateHeader} onClick={() => setShowModal(true)}>
          <Plus size={18} weight="bold" />
          <span>Thêm Học sinh</span>
        </button>
      </div>

      {/* GRID */}
      <div className={styles.studentsGrid}>
        {students.length === 0 ? (
          <div className={styles.emptyState}>Chưa có học sinh nào trong lớp.</div>
        ) : (
          students.map((student) => (
            <div key={student._id} className={styles.studentCard}>
              <div className={styles.cardTop}>
                <div className={styles.iconBox}>
                  <UserList size={24} weight="duotone" />
                </div>
                <span className={styles.codeTag}>{student.studentCode}</span>
              </div>

              <div className={styles.cardMiddle}>
                <h3 className={styles.studentName}>{student.name}</h3>
                <div className={styles.infoRow}>
                  <EnvelopeSimple size={14} weight="bold" />
                  <span>{student.email || "Chưa có email"}</span>
                </div>
                <div className={styles.infoRow}>
                  <Key size={14} weight="bold" />
                  <span>Mật khẩu: <strong>{student.password || "********"}</strong></span>
                </div>
                <div className={styles.infoRow}>
                  <Phone size={14} weight="bold" />
                  <span>PHHS: {student.parentPhone}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Tạo Tài Khoản Học Sinh</h3>
            <form onSubmit={handleCreateStudent}>
              <div className={styles.formGroup}>
                <label htmlFor="studentName">Họ và tên</label>
                <input
                  id="studentName"
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="studentEmail">Tên đăng nhập / Email</label>
                <input
                  id="studentEmail"
                  type="text"
                  required
                  placeholder="Ví dụ: nva.class6@classroom.com"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="studentPassword">Mật khẩu khởi tạo</label>
                <input
                  id="studentPassword"
                  type="text"
                  required
                  placeholder="Ví dụ: password123"
                  value={newStudent.password}
                  onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="parentPhone">SĐT Phụ huynh (tùy chọn)</label>
                <input
                  id="parentPhone"
                  type="text"
                  placeholder="Ví dụ: 09xx"
                  value={newStudent.parentPhone}
                  onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                />
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.btnCancel} onClick={() => setShowModal(false)}>
                  Hủy bỏ
                </button>
                <button type="submit" className={styles.btnConfirm}>
                  Tạo tài khoản
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
