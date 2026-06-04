import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alarm, CaretLeft, CaretRight, Info, PaperPlaneRight, GridFour } from "phosphor-react";
import styles from "./TakeExam.module.scss";

// Dummy data for the UI
const DUMMY_QUESTIONS = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  text: i === 4 ? "Trong không gian Oxyz, cho mặt cầu (S) có phương trình $x^2 + y^2 + z^2 - 2x + 4y - 6z + 5 = 0$. Hãy xác định tọa độ tâm I và bán kính R của mặt cầu này." : `Câu hỏi số ${i + 1}`,
  imageUrl: i === 4 ? "https://images.unsplash.com/photo-1615555416075-871887e3579b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" : null, // using a generic abstract 3d shape image
  options: [
    "I(1; -2; 3) và R = 3",
    "I(-1; 2; -3) và R = 3",
    "I(1; -2; 3) và R = 9",
    "I(1; 2; 3) và R = 3"
  ]
}));

export default function TakeExam() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [currentQIndex, setCurrentQIndex] = useState(4); // Index 4 means Câu 5
  const [answers, setAnswers] = useState<Record<number, number>>({
    0: 0, // Q1 answered A
    1: 2, // Q2 answered C
    2: 1, // Q3 answered B
    3: 3  // Q4 answered D
  });
  
  // Example timer 45:10
  const [timeLeft, setTimeLeft] = useState(45 * 60 + 10);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (optIndex: number) => {
    setAnswers({
      ...answers,
      [currentQIndex]: optIndex
    });
  };

  const currentQ = DUMMY_QUESTIONS[currentQIndex];

  return (
    <div className={styles.page}>
      {/* TOP HEADER */}
      <div className={styles.topHeader}>
        <div className={styles.headerTitles}>
          <h2>Kiểm tra giữa kỳ Toán</h2>
          <div className={styles.headerBadges}>
            <span className={styles.qCountBadge}>Câu {currentQIndex + 1}/40</span>
            <span className={styles.subjectText}>Môn: Toán học nâng cao</span>
          </div>
        </div>
        <div className={styles.timerCard}>
          <Alarm size={24} weight="bold" />
          <div className={styles.timerText}>
            <span className={styles.timerLabel}>THỜI GIAN CÒN LẠI</span>
            <span className={styles.timerValue}>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div className={styles.layout}>
        {/* LEFT COLUMN: QUESTION CONTENT */}
        <div className={styles.leftCol}>
          <div className={styles.questionCard}>
            <h4 className={styles.qLabel}>CÂU HỎI {currentQIndex + 1}</h4>
            <p className={styles.qText}>{currentQ.text}</p>
            {currentQ.imageUrl && (
              <div className={styles.qImageWrapper}>
                <img src={currentQ.imageUrl} alt="Question figure" />
              </div>
            )}
          </div>

          <div className={styles.optionsList}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = answers[currentQIndex] === idx;
              return (
                <div 
                  key={idx} 
                  className={`${styles.optionItem} ${isSelected ? styles.selected : ""}`}
                  onClick={() => handleSelectOption(idx)}
                >
                  <div className={`${styles.optLetter} ${isSelected ? styles.selectedLetter : ""}`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className={styles.optText}>{opt}</span>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className={styles.navButtons}>
            <button 
              className={styles.btnPrev} 
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex(prev => prev - 1)}
            >
              <CaretLeft size={16} weight="bold" />
              Câu trước
            </button>
            <button 
              className={styles.btnNext} 
              disabled={currentQIndex === DUMMY_QUESTIONS.length - 1}
              onClick={() => setCurrentQIndex(prev => prev + 1)}
            >
              Câu tiếp theo
              <CaretRight size={16} weight="bold" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: QUESTION GRID */}
        <div className={styles.rightCol}>
          <div className={styles.gridCard}>
            <div className={styles.gridHeader}>
              <GridFour size={20} weight="fill" />
              <span>Danh sách câu hỏi</span>
            </div>

            <div className={styles.numberGrid}>
              {DUMMY_QUESTIONS.map((q, idx) => {
                const isAnswered = answers[idx] !== undefined;
                const isCurrent = idx === currentQIndex;
                let statusClass = styles.unanswered;
                if (isCurrent) statusClass = styles.current;
                else if (isAnswered) statusClass = styles.answered;

                return (
                  <button 
                    key={idx} 
                    className={`${styles.numBtn} ${statusClass}`}
                    onClick={() => setCurrentQIndex(idx)}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>

            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span className={`${styles.dot} ${styles.dotAnswered}`}></span>
                Đã trả lời
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.dot} ${styles.dotCurrent}`}></span>
                Đang chọn
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.dot} ${styles.dotUnanswered}`}></span>
                Chưa trả lời
              </div>
            </div>

            <button className={styles.btnSubmit}>
              Nộp bài thi
              <PaperPlaneRight size={18} weight="bold" />
            </button>
            <p className={styles.submitNote}>Lưu ý: Không thể sửa sau khi đã nộp</p>
          </div>

          <div className={styles.helpCard}>
            <div className={styles.helpHeader}>
              <Info size={20} weight="bold" />
              <h4>Trợ giúp</h4>
            </div>
            <p>Nếu gặp sự cố về kỹ thuật, vui lòng nhấn nút hỗ trợ bên góc màn hình hoặc báo giáo viên coi thi ngay lập tức.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
