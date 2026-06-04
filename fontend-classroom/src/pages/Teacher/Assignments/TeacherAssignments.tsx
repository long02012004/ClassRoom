import React, { useState, useRef } from "react";
import {
  Plus,
  Clock,
  Users,
  PencilSimple,
  CloudArrowUp,
  Play,
  BookOpen,
  ChartBar,
  FilePdf,
  FileDoc,
  Image as ImageIcon,
  X,
  TrendUp,
} from "phosphor-react";
import styles from "./TeacherAssignments.module.scss";

// ── TABS ──
const TABS = [
  { key: "all", label: "Tất cả" },
  { key: "active", label: "Đang giao" },
  { key: "draft", label: "Bản nháp" },
  { key: "graded", label: "Đã chấm" },
];

// ── ASSIGNMENT TYPES ──
const ASSIGNMENT_TYPES = [
  "Bài tập về nhà",
  "Bài kiểm tra",
  "Bài thực hành",
  "Dự án nhóm",
  "Báo cáo",
];

// ── MOCK ASSIGNED LIST ──
interface AssignedItem {
  id: string;
  title: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  date: string;
  submitted: number;
  total: number;
  status: "active" | "draft" | "graded";
}

const mockAssigned: AssignedItem[] = [
  {
    id: "a1",
    title: "Đọc hiểu: Tác phẩm Tắt Đèn",
    icon: "📖",
    iconBg: "#dbeafe",
    iconColor: "#2563eb",
    date: "20/10/2023",
    submitted: 32,
    total: 45,
    status: "active",
  },
  {
    id: "a2",
    title: "Giải phương trình bậc 2",
    icon: "📐",
    iconBg: "#d1fae5",
    iconColor: "#059669",
    date: "22/10/2023",
    submitted: 15,
    total: 45,
    status: "active",
  },
  {
    id: "a3",
    title: "Báo cáo thực hành: Quang hợp",
    icon: "🧪",
    iconBg: "#fee2e2",
    iconColor: "#dc2626",
    date: "25/10/2023",
    submitted: 0,
    total: 45,
    status: "draft",
  },
  {
    id: "a4",
    title: "Kiểm tra 15 phút: Lịch sử VN",
    icon: "📝",
    iconBg: "#fef3c7",
    iconColor: "#d97706",
    date: "18/10/2023",
    submitted: 40,
    total: 45,
    status: "graded",
  },
];

// ── CHART DATA ──
const chartData = [
  { day: "Thứ 2", value: 65 },
  { day: "Thứ 3", value: 80 },
  { day: "Thứ 4", value: 55 },
  { day: "Thứ 5", value: 90 },
  { day: "Thứ 6", value: 40 },
  { day: "Thứ 7", value: 75 },
  { day: "CN", value: 95 },
];

export default function TeacherAssignments() {
  const [activeTab, setActiveTab] = useState("all");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignType, setAssignType] = useState("Bài tập về nhà");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter assigned list by tab
  const filteredAssigned =
    activeTab === "all"
      ? mockAssigned
      : mockAssigned.filter((a) => a.status === activeTab);

  // File drag & drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...dropped]);
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };
  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const getFileIcon = (name: string) => {
    if (name.endsWith(".pdf")) return <FilePdf size={18} weight="fill" color="#ef4444" />;
    if (name.endsWith(".docx") || name.endsWith(".doc")) return <FileDoc size={18} weight="fill" color="#3b82f6" />;
    if (name.match(/\.(jpg|jpeg|png|gif)$/i)) return <ImageIcon size={18} weight="fill" color="#8b5cf6" />;
    return <BookOpen size={18} weight="fill" color="#64748b" />;
  };

  const handleSubmit = () => {
    alert(`Đã giao bài: "${title}" — Hạn nộp: ${deadline} — Loại: ${assignType}`);
  };

  const maxChartVal = Math.max(...chartData.map((d) => d.value));

  return (
    <div className={styles.container}>
      {/* ── TOP HEADER ── */}
      <div className={styles.topHeader}>
        <h1 className={styles.pageTitle}>Quản lý bài tập</h1>
        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className={styles.mainGrid}>
        {/* LEFT – CREATE FORM */}
        <div className={styles.leftCol}>
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <Plus size={20} weight="bold" />
              <h2>Tạo bài tập mới</h2>
            </div>

            {/* Title */}
            <div className={styles.formGroup}>
              <label>Tiêu đề bài tập</label>
              <input
                type="text"
                className={styles.textInput}
                placeholder="VD: Ôn tập chương 2 - Giải tích"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Deadline + Type */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Hạn nộp</label>
                <input
                  type="date"
                  className={styles.textInput}
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Loại bài tập</label>
                <select
                  className={styles.selectInput}
                  value={assignType}
                  onChange={(e) => setAssignType(e.target.value)}
                >
                  {ASSIGNMENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className={styles.formGroup}>
              <label>Mô tả chi tiết</label>
              <textarea
                className={styles.textArea}
                rows={4}
                placeholder="Nhập hướng dẫn làm bài cho học sinh..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* File Upload */}
            <div className={styles.formGroup}>
              <label>Tài liệu đính kèm</label>
              <div
                className={`${styles.dropZone} ${isDragging ? styles.dropZoneActive : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <CloudArrowUp size={36} weight="light" className={styles.uploadIcon} />
                <p>
                  Kéo thả file hoặc{" "}
                  <span className={styles.chooseLink}>chọn tệp</span>
                </p>
                <span className={styles.uploadHint}>
                  Hỗ trợ PDF, DOCX, JPG (Tối đa 20MB)
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
                  hidden
                  onChange={handleFileSelect}
                />
              </div>

              {/* File list */}
              {files.length > 0 && (
                <div className={styles.fileList}>
                  {files.map((f, i) => (
                    <div key={i} className={styles.fileItem}>
                      {getFileIcon(f.name)}
                      <span className={styles.fileName}>{f.name}</span>
                      <span className={styles.fileSize}>
                        {(f.size / 1024).toFixed(0)} KB
                      </span>
                      <button
                        className={styles.fileRemove}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(i);
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <button className={styles.btnSubmit} onClick={handleSubmit}>
              <Play size={18} weight="fill" />
              Giao bài ngay
            </button>
          </div>
        </div>

        {/* RIGHT – ASSIGNED LIST + CHART */}
        <div className={styles.rightCol}>
          {/* Assigned List */}
          <div className={styles.assignedCard}>
            <div className={styles.assignedHeader}>
              <h3>Bài tập đã giao</h3>
              <button className={styles.viewAllBtn}>Xem tất cả</button>
            </div>

            <div className={styles.assignedList}>
              {filteredAssigned.map((item) => (
                <div key={item.id} className={styles.assignedItem}>
                  <div
                    className={styles.assignedIcon}
                    style={{ backgroundColor: item.iconBg }}
                  >
                    <span>{item.icon}</span>
                  </div>
                  <div className={styles.assignedInfo}>
                    <h4>{item.title}</h4>
                    <div className={styles.assignedMeta}>
                      <span>
                        <Clock size={12} /> {item.date}
                      </span>
                      <span>
                        <Users size={12} /> {item.submitted}/{item.total} đã nộp
                      </span>
                    </div>
                  </div>
                  <button className={styles.editBtn}>
                    <PencilSimple size={16} />
                  </button>
                </div>
              ))}

              {filteredAssigned.length === 0 && (
                <div className={styles.emptyList}>
                  <BookOpen size={32} color="#cbd5e1" />
                  <p>Chưa có bài tập nào</p>
                </div>
              )}
            </div>
          </div>

          {/* Chart */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitle}>
                <ChartBar size={20} weight="fill" />
                <h3>Tổng quan hành vi</h3>
              </div>
              <span className={styles.chartBadge}>
                <TrendUp size={14} weight="bold" />
                +12% tuần này
              </span>
            </div>
            <p className={styles.chartSubtitle}>
              Tỷ lệ nộp bài đúng hạn (7 ngày qua)
            </p>

            <div className={styles.chart}>
              {chartData.map((d, i) => (
                <div key={i} className={styles.chartCol}>
                  <div className={styles.barWrapper}>
                    <div
                      className={styles.bar}
                      style={{
                        height: `${(d.value / maxChartVal) * 100}%`,
                      }}
                    />
                  </div>
                  <span className={styles.barLabel}>{d.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
