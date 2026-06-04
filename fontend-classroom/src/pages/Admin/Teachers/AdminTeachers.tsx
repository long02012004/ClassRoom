import React, { useState, useEffect } from "react";
import { Plus, ChalkboardTeacher, EnvelopeSimple, Key, UserList } from "phosphor-react";
import { getMockTeachers, createMockTeacher } from "../../../utils/mockDb.ts";
import type { User } from "../../../utils/mockDb.ts";
import { useToast } from "../../../components/Styles/ToastContext.tsx";
import styles from "./AdminTeachers.module.scss";

export default function AdminTeachers() {
  const toast = useToast();
  const [teachers, setTeachers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ name: "", email: "", password: "" });

  const loadData = () => {
    const list = getMockTeachers();
    setTeachers(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.email || !newTeacher.password) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      createMockTeacher(newTeacher.name, newTeacher.email, newTeacher.password);
      toast.success(`Tạo tài khoản giáo viên "${newTeacher.name}" thành công!`, 3000);
      setNewTeacher({ name: "", email: "", password: "" });
      setShowModal(false);
      loadData();
    } catch (err) {
      toast.error("Đã xảy ra lỗi khi tạo tài khoản!");
    }
  };

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.pageHeader}>
        <div className={styles.headerText}>
          <h2>Quản lý Giáo viên</h2>
          <p>Tạo và cấp phát tài khoản cho đội ngũ giáo viên tham gia hệ thống.</p>
        </div>
        <button className={styles.btnCreateHeader} onClick={() => setShowModal(true)}>
          <Plus size={18} weight="bold" />
          <span>Thêm Giáo viên</span>
        </button>
      </div>

      {/* GRID */}
      <div className={styles.teachersGrid}>
        {teachers.map((teacher) => (
          <div key={teacher._id} className={styles.teacherCard}>
            <div className={styles.cardTop}>
              <div className={styles.iconBox}>
                <ChalkboardTeacher size={24} weight="duotone" />
              </div>
              <span className={styles.roleTag}>Giáo viên</span>
            </div>

            <div className={styles.cardMiddle}>
              <h3 className={styles.teacherName}>{teacher.name}</h3>
              <div className={styles.infoRow}>
                <EnvelopeSimple size={14} weight="bold" />
                <span>{teacher.email}</span>
              </div>
              <div className={styles.infoRow}>
                <Key size={14} weight="bold" />
                <span>Mật khẩu: <strong>{teacher.password || "********"}</strong></span>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <button className={styles.btnManage}>Chi tiết</button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Tạo Tài Khoản Giáo Viên</h3>
            <form onSubmit={handleCreateTeacher}>
              <div className={styles.formGroup}>
                <label htmlFor="teacherName">Họ và tên</label>
                <input
                  id="teacherName"
                  type="text"
                  required
                  placeholder="Ví dụ: Cô Nguyễn Thị Mai"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="teacherEmail">Địa chỉ Email</label>
                <input
                  id="teacherEmail"
                  type="email"
                  required
                  placeholder="Ví dụ: teacher@classroom.com"
                  value={newTeacher.email}
                  onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="teacherPassword">Mật khẩu khởi tạo</label>
                <input
                  id="teacherPassword"
                  type="text"
                  required
                  placeholder="Ví dụ: password123"
                  value={newTeacher.password}
                  onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
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
