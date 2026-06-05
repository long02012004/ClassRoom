import React, { useState, useMemo } from "react";
import { ArrowRight, CheckCircle, BookOpen, Clock, Funnel } from "phosphor-react";
import styles from "./TeacherSchedule.module.scss";

// --- Kiểu Dữ Liệu ---
interface Lesson {
  id: string;
  className: string;
  subject: string;
  chapter: string;
  dayOfWeek: number; // 1: Thứ 2, 2: Thứ 3...
  startTime: string; // "07:30"
  endTime: string;   // "09:00"
  progress: number;
}

// --- Dữ Liệu Mock Nâng Cao ---
const MOCK_LESSONS: Lesson[] = [
  { id: "1", className: "12A1", subject: "Toán Giải Tích", chapter: "Chương I: Ứng dụng đạo hàm", dayOfWeek: 2, startTime: "07:30", endTime: "08:30", progress: 100 },
  { id: "2", className: "12C3", subject: "Toán Hình", chapter: "Chương III: Khối đa diện", dayOfWeek: 2, startTime: "09:00", endTime: "10:30", progress: 65 },
  { id: "3", className: "11B2", subject: "Đại Số 11", chapter: "Chương II: Tổ hợp - Xác suất", dayOfWeek: 2, startTime: "14:00", endTime: "15:30", progress: 0 },
  { id: "4", className: "12A1", subject: "Toán Giải Tích", chapter: "Chương I: Ứng dụng đạo hàm", dayOfWeek: 1, startTime: "08:00", endTime: "09:30", progress: 100 },
  { id: "5", className: "10C2", subject: "Hình Học", chapter: "Chương I: Vectơ", dayOfWeek: 3, startTime: "13:30", endTime: "15:00", progress: 0 },
  { id: "6", className: "12C3", subject: "Toán Hình", chapter: "Chương III: Khối đa diện", dayOfWeek: 4, startTime: "07:30", endTime: "09:00", progress: 0 },
  { id: "7", className: "11B2", subject: "Đại Số 11", chapter: "Chương II: Tổ hợp - Xác suất", dayOfWeek: 5, startTime: "15:00", endTime: "16:30", progress: 0 },
];

const TIME_SLOTS = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
const START_HOUR = 7;
const HOUR_HEIGHT = 80; // px per hour

// Hàm parse thời gian "HH:mm" thành số giờ thập phân
const parseTime = (timeStr: string) => {
  const [h, m] = timeStr.split(":").map(Number);
  return h + m / 60;
};

export default function TeacherSchedule() {
  const [activeView, setActiveView] = useState("Tuần");
  const [activeFilter, setActiveFilter] = useState("Tất cả lớp");

  // Giả định hôm nay là Thứ 3 (dayOfWeek = 2) lúc 10:00 để test giao diện
  const currentDayOfWeek: number = 2;
  const currentTime: number = 10.0; // 10:00

  const DAYS = [
    { day: "Thứ 2", date: "16", isToday: currentDayOfWeek === 1, value: 1 },
    { day: "Thứ 3", date: "17", isToday: currentDayOfWeek === 2, value: 2 },
    { day: "Thứ 4", date: "18", isToday: currentDayOfWeek === 3, value: 3 },
    { day: "Thứ 5", date: "19", isToday: currentDayOfWeek === 4, value: 4 },
    { day: "Thứ 6", date: "20", isToday: currentDayOfWeek === 5, value: 5 },
  ];

  const filters = ["Tất cả lớp", "12A1", "12C3", "11B2", "10C2"];

  // Lọc bài học theo Lớp
  const filteredLessons = useMemo(() => {
    if (activeFilter === "Tất cả lớp") return MOCK_LESSONS;
    return MOCK_LESSONS.filter(l => l.className === activeFilter);
  }, [activeFilter]);

  // Bài học đang diễn ra (hoặc sắp tới gần nhất trong ngày)
  const ongoingLesson = useMemo(() => {
    const todayLessons = MOCK_LESSONS.filter(l => l.dayOfWeek === currentDayOfWeek);
    // Tìm bài đang diễn ra
    const current = todayLessons.find(l => {
      const start = parseTime(l.startTime);
      const end = parseTime(l.endTime);
      return currentTime >= start && currentTime <= end;
    });
    if (current) return current;
    // Nếu không có, tìm bài sắp diễn ra tiếp theo
    const next = todayLessons.sort((a, b) => parseTime(a.startTime) - parseTime(b.startTime))
      .find(l => parseTime(l.startTime) > currentTime);
    return next || todayLessons[todayLessons.length - 1]; // Fallback
  }, [currentTime, currentDayOfWeek]);

  // Danh sách bài học hôm nay cho Timeline
  const todayClassesList = useMemo(() => {
    const lessons = MOCK_LESSONS.filter(l => l.dayOfWeek === currentDayOfWeek);
    return lessons.sort((a, b) => parseTime(a.startTime) - parseTime(b.startTime)).map(l => {
      const start = parseTime(l.startTime);
      const end = parseTime(l.endTime);
      let status = "Sắp tới";
      let statusColor = "blue";

      if (currentTime > end) {
        status = "Hoàn thành";
        statusColor = "green";
      } else if (currentTime >= start && currentTime <= end) {
        status = "Đang giảng";
        statusColor = "red";
      }

      return {
        ...l,
        timeLabel: `${l.startTime} - ${l.endTime}`,
        title: `${l.className} - ${l.subject}`,
        status,
        statusColor
      };
    });
  }, [currentTime, currentDayOfWeek]);

  return (
    <div className={styles.container}>
      {/* CỘT CHÍNH (MAIN SCHEDULE) */}
      <div className={styles.mainContent}>
        {/* Tiêu đề & Toggle View */}
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.pageTitle}>Lịch Giảng Dạy Tuần Này</h1>
            <p className={styles.pageSubtitle}>Tháng 10, 2023 • Tuần 42</p>
          </div>
          <div className={styles.viewToggle}>
            {["Ngày", "Tuần", "Tháng"].map((view) => (
              <button
                key={view}
                className={`${styles.viewBtn} ${activeView === view ? styles.activeView : ""}`}
                onClick={() => setActiveView(view)}
              >
                {view}
              </button>
            ))}
          </div>
        </div>

        {/* Lưới Lịch */}
        <div className={styles.calendarCard}>
          <div className={styles.calendarHeader}>
            <div className={styles.timeColumnHeader}>Giờ</div>
            {DAYS.map((d, i) => (
              <div
                key={i}
                className={`${styles.dayColumnHeader} ${d.isToday ? styles.todayHeader : ""}`}
              >
                <span className={styles.dayText}>{d.day}</span>
                <span className={styles.dateText}>{d.date}</span>
              </div>
            ))}
          </div>
          
          <div className={styles.calendarBody}>
            {/* Cột thời gian (Trục Y) */}
            <div className={styles.timeLabelsColumn}>
              {TIME_SLOTS.map((time, idx) => (
                <div key={idx} className={styles.timeLabel} style={{ height: HOUR_HEIGHT }}>
                  {time}
                </div>
              ))}
            </div>

            {/* Các cột Ngày */}
            <div className={styles.daysColumnsGrid}>
              {/* Vẽ đường kẻ ngang mờ */}
              <div className={styles.gridLinesAbsolute}>
                {TIME_SLOTS.map((_, idx) => (
                  <div key={idx} className={styles.gridLine} style={{ top: idx * HOUR_HEIGHT }}></div>
                ))}
              </div>

              {DAYS.map((day, dayIdx) => (
                <div key={dayIdx} className={`${styles.dayColumn} ${day.isToday ? styles.todayColBg : ""}`}>
                  {filteredLessons
                    .filter(l => l.dayOfWeek === day.value)
                    .map(lesson => {
                      const start = parseTime(lesson.startTime);
                      const end = parseTime(lesson.endTime);
                      const top = (start - START_HOUR) * HOUR_HEIGHT;
                      const height = (end - start) * HOUR_HEIGHT;
                      const isOngoing = lesson.id === ongoingLesson?.id;

                      return (
                        <div
                          key={lesson.id}
                          className={`${styles.lessonCardAbsolute} ${isOngoing ? styles.lessonOngoing : ""}`}
                          style={{ top, height }}
                        >
                          <div className={styles.lessonTime}>{lesson.startTime} - {lesson.endTime}</div>
                          <div className={styles.lessonTitle}>{lesson.className} - {lesson.subject}</div>
                          <div className={styles.lessonRoom}>P. Học Chính</div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* THANH CÔNG CỤ (RIGHT SIDEBAR) */}
      <div className={styles.rightSidebar}>
        {/* Khối Đang diễn ra */}
        {ongoingLesson ? (
          <div className={styles.ongoingCard}>
            <div className={styles.ongoingHeader}>
              <span className={styles.ongoingBadge}>ĐANG DIỄN RA</span>
              <span className={styles.ongoingTime}>{ongoingLesson.startTime} - {ongoingLesson.endTime}</span>
            </div>
            <h3 className={styles.ongoingClass}>Lớp {ongoingLesson.className} - {ongoingLesson.subject}</h3>
            <p className={styles.ongoingChapter}>{ongoingLesson.chapter}</p>
            
            <div className={styles.progressSection}>
              <div className={styles.progressLabels}>
                <span>Tiến độ bài giảng</span>
                <span>{ongoingLesson.progress}%</span>
              </div>
              <div className={styles.progressBarBg}>
                <div className={styles.progressBarFill} style={{ width: `${ongoingLesson.progress}%` }}></div>
              </div>
            </div>

            <div className={styles.ongoingActions}>
              <button className={styles.actionBtn}>
                <CheckCircle size={18} weight="regular" />
                Điểm danh
              </button>
              <button className={styles.actionBtn}>
                <BookOpen size={18} weight="regular" />
                Tài liệu
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.ongoingCard}>
            <p>Không có tiết học nào đang diễn ra.</p>
          </div>
        )}

        {/* Khối Tiết học hôm nay */}
        <div className={styles.todayScheduleCard}>
          <div className={styles.cardHeader}>
            <h4>Tiết học hôm nay</h4>
            <span className={styles.countBadge}>{todayClassesList.length} Tiết</span>
          </div>
          <div className={styles.timeline}>
            {todayClassesList.length > 0 ? todayClassesList.map((item, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <div className={`${styles.timelineDot} ${styles[`dot_${item.statusColor}`]}`}></div>
                <div className={styles.timelineContent}>
                  <div className={styles.timeText}>{item.timeLabel}</div>
                  <div className={styles.classTitle}>{item.title}</div>
                  <span className={`${styles.statusBadge} ${styles[`badge_${item.statusColor}`]}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            )) : (
              <p className={styles.noDataText}>Không có tiết học nào hôm nay.</p>
            )}
          </div>
          {todayClassesList.length > 0 && (
            <button className={styles.viewMoreBtn}>
              Xem chi tiết ngày <ArrowRight size={16} />
            </button>
          )}
        </div>

        {/* Khối Bộ lọc nhanh */}
        <div className={styles.filterCard}>
          <div className={styles.cardHeader}>
            <h4>Bộ lọc nhanh</h4>
          </div>
          <div className={styles.filterChips}>
            {filters.map((filter) => (
              <button
                key={filter}
                className={`${styles.filterChip} ${activeFilter === filter ? styles.activeChip : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
