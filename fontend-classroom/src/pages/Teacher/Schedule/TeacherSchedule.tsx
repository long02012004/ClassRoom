import React, { useState } from "react";
import {
  CalendarBlank,
  CaretLeft,
  CaretRight,
  Clock,
  MapPin,
  Users,
  BookOpen,
  CheckCircle,
  Warning,
  Plus,
} from "phosphor-react";
import styles from "./TeacherSchedule.module.scss";

// --- Mock Data ---
const DAYS = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
const DATE_LABELS = ["02/06", "03/06", "04/06", "05/06", "06/06", "07/06"];
const TODAY_IDX = 1; // Thứ 3 = index 1

interface Lesson {
  id: string;
  subject: string;
  className: string;
  room: string;
  startTime: string;
  endTime: string;
  students: number;
  status: "upcoming" | "ongoing" | "done" | "cancelled";
  dayIdx: number;
  period: number; // 1-5
}

const mockLessons: Lesson[] = [
  { id: "l1", subject: "Toán học", className: "12A1", room: "P.201", startTime: "07:00", endTime: "08:30", students: 32, status: "done", dayIdx: 0, period: 1 },
  { id: "l2", subject: "Toán học", className: "12A2", room: "P.202", startTime: "08:45", endTime: "10:15", students: 28, status: "done", dayIdx: 0, period: 2 },
  { id: "l3", subject: "Toán học", className: "12A1", room: "P.201", startTime: "07:00", endTime: "08:30", students: 32, status: "ongoing", dayIdx: 1, period: 1 },
  { id: "l4", subject: "Đại số", className: "11B3", room: "P.105", startTime: "10:30", endTime: "12:00", students: 35, status: "upcoming", dayIdx: 1, period: 3 },
  { id: "l5", subject: "Hình học", className: "10C2", room: "P.301", startTime: "13:30", endTime: "15:00", students: 30, status: "upcoming", dayIdx: 1, period: 4 },
  { id: "l6", subject: "Toán học", className: "12A2", room: "P.202", startTime: "07:00", endTime: "08:30", students: 28, status: "upcoming", dayIdx: 2, period: 1 },
  { id: "l7", subject: "Giải tích", className: "12A1", room: "P.201", startTime: "08:45", endTime: "10:15", students: 32, status: "upcoming", dayIdx: 2, period: 2 },
  { id: "l8", subject: "Đại số", className: "11B3", room: "P.105", startTime: "07:00", endTime: "08:30", students: 35, status: "upcoming", dayIdx: 3, period: 1 },
  { id: "l9", subject: "Hình học", className: "10C2", room: "P.301", startTime: "13:30", endTime: "15:00", students: 30, status: "cancelled", dayIdx: 3, period: 4 },
  { id: "l10", subject: "Toán học", className: "12A1", room: "P.201", startTime: "07:00", endTime: "08:30", students: 32, status: "upcoming", dayIdx: 4, period: 1 },
  { id: "l11", subject: "Toán học", className: "12A2", room: "P.202", startTime: "10:30", endTime: "12:00", students: 28, status: "upcoming", dayIdx: 5, period: 3 },
];

const PERIODS = [
  { label: "Tiết 1", time: "07:00 - 08:30" },
  { label: "Tiết 2", time: "08:45 - 10:15" },
  { label: "Tiết 3", time: "10:30 - 12:00" },
  { label: "Tiết 4", time: "13:30 - 15:00" },
  { label: "Tiết 5", time: "15:15 - 16:45" },
];

const statusConfig: Record<string, { label: string; cls: string }> = {
  upcoming: { label: "Sắp diễn ra", cls: "upcoming" },
  ongoing:  { label: "Đang dạy",   cls: "ongoing"  },
  done:     { label: "Đã xong",    cls: "done"     },
  cancelled:{ label: "Đã hủy",    cls: "cancelled" },
};

export default function TeacherSchedule() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);

  const totalLessons = mockLessons.length;
  const doneLessons  = mockLessons.filter(l => l.status === "done").length;
  const ongoingLessons = mockLessons.filter(l => l.status === "ongoing").length;

  const filteredLesson = (dayIdx: number, period: number) =>
    mockLessons.find(l => l.dayIdx === dayIdx && l.period === period);

  const weekLabel =
    weekOffset === 0 ? "Tuần này (02/06 - 07/06)"
    : weekOffset === -1 ? "Tuần trước (26/05 - 31/05)"
    : "Tuần sau (09/06 - 14/06)";

  return (
    <div className={styles.container}>

      {/* ── HEADER ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <CalendarBlank size={26} weight="fill" />
          </div>
          <div>
            <h1 className={styles.title}>Quản lý Lịch dạy</h1>
            <p className={styles.subtitle}>Theo dõi thời khóa biểu và lịch giảng dạy hàng tuần</p>
          </div>
        </div>
        <button className={styles.btnAdd}>
          <Plus size={18} weight="bold" />
          Thêm tiết dạy
        </button>
      </div>

      {/* ── STATS ROW ── */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="blue">
            <BookOpen size={22} weight="fill" />
          </div>
          <div>
            <div className={styles.statNum}>{totalLessons}</div>
            <div className={styles.statLabel}>Tổng tiết tuần này</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="green">
            <CheckCircle size={22} weight="fill" />
          </div>
          <div>
            <div className={styles.statNum}>{doneLessons}</div>
            <div className={styles.statLabel}>Đã hoàn thành</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="orange">
            <Clock size={22} weight="fill" />
          </div>
          <div>
            <div className={styles.statNum}>{ongoingLessons}</div>
            <div className={styles.statLabel}>Đang diễn ra</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="purple">
            <Users size={22} weight="fill" />
          </div>
          <div>
            <div className={styles.statNum}>3</div>
            <div className={styles.statLabel}>Lớp đang phụ trách</div>
          </div>
        </div>
      </div>

      {/* ── WEEK NAVIGATION ── */}
      <div className={styles.weekNav}>
        <button className={styles.weekNavBtn} onClick={() => setWeekOffset(w => w - 1)}>
          <CaretLeft size={18} weight="bold" />
        </button>
        <div className={styles.weekLabel}>
          <CalendarBlank size={18} weight="fill" />
          {weekLabel}
        </div>
        <button className={styles.weekNavBtn} onClick={() => setWeekOffset(w => w + 1)}>
          <CaretRight size={18} weight="bold" />
        </button>
      </div>

      {/* ── TIMETABLE GRID ── */}
      <div className={styles.timetableWrapper}>
        <table className={styles.timetable}>
          <thead>
            <tr>
              <th className={styles.periodCol}>Tiết / Giờ</th>
              {DAYS.map((day, i) => (
                <th
                  key={i}
                  className={`${styles.dayCol} ${i === TODAY_IDX ? styles.todayCol : ""}`}
                  onClick={() => setSelectedDay(i === selectedDay ? null : i)}
                >
                  <div className={styles.dayLabel}>{day}</div>
                  <div className={`${styles.dateLabel} ${i === TODAY_IDX ? styles.todayBadge : ""}`}>
                    {DATE_LABELS[i]}
                    {i === TODAY_IDX && <span className={styles.todayDot} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERIODS.map((period, pIdx) => (
              <tr key={pIdx}>
                <td className={styles.periodCell}>
                  <div className={styles.periodLabel}>{period.label}</div>
                  <div className={styles.periodTime}>{period.time}</div>
                </td>
                {DAYS.map((_, dIdx) => {
                  const lesson = filteredLesson(dIdx, pIdx + 1);
                  const isToday = dIdx === TODAY_IDX;
                  const isSelected = dIdx === selectedDay;
                  return (
                    <td
                      key={dIdx}
                      className={`${styles.cell} ${isToday ? styles.todayCell : ""} ${isSelected ? styles.selectedCell : ""}`}
                    >
                      {lesson ? (
                        <div className={`${styles.lessonCard} ${styles[lesson.status]}`}>
                          <div className={styles.lessonSubject}>{lesson.subject}</div>
                          <div className={styles.lessonClass}>
                            <Users size={12} /> {lesson.className}
                          </div>
                          <div className={styles.lessonRoom}>
                            <MapPin size={12} /> {lesson.room}
                          </div>
                          <div className={`${styles.lessonBadge} ${styles[`badge_${lesson.status}`]}`}>
                            {statusConfig[lesson.status].label}
                          </div>
                        </div>
                      ) : (
                        <div className={styles.emptyCell} />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── LEGEND ── */}
      <div className={styles.legend}>
        {Object.entries(statusConfig).map(([key, val]) => (
          <div key={key} className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles[`dot_${key}`]}`} />
            {val.label}
          </div>
        ))}
        <div className={styles.legendItem}>
          <Warning size={14} color="#f59e0b" weight="fill" />
          <span style={{ marginLeft: 4 }}>Tiết bị hủy do lý do đặc biệt</span>
        </div>
      </div>
    </div>
  );
}
