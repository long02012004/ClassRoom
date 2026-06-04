import React from 'react';
import { DownloadSimple, ShareNetwork, TrendUp, Medal, GraduationCap, Calendar, FunnelSimple, DotsThreeVertical, Atom, GlobeHemisphereWest, BookOpen, Flask } from 'phosphor-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import styles from './StudentResults.module.scss';

const radarData = [
  { subject: 'BÀI TẬP', A: 90, fullMark: 100 },
  { subject: 'GIỮA KỲ', A: 85, fullMark: 100 },
  { subject: 'CUỐI KỲ', A: 92, fullMark: 100 },
  { subject: 'THÁI ĐỘ', A: 80, fullMark: 100 },
  { subject: 'CHUYÊN CẦN', A: 95, fullMark: 100 },
];

const StudentResults: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.titleInfo}>
          <h1>Kết quả học tập</h1>
          <p>Học kỳ 1 &bull; Niên khóa 2023 - 2024</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <DownloadSimple size={20} />
            Tải bảng điểm (PDF)
          </button>
          <button className={styles.btnPrimary}>
            <ShareNetwork size={20} />
            Chia sẻ kết quả
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className={styles.statCards}>
        <div className={`${styles.statCard} ${styles.gpaCard}`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Điểm trung bình (GPA)</span>
            <div className={`${styles.iconWrapper} ${styles.orangeIcon}`}>
              <TrendUp size={20} weight="bold" />
            </div>
          </div>
          <div className={styles.cardValue}>8.8</div>
          <div className={styles.cardSubtext}>+0.3 so với kỳ trước</div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Xếp loại học lực</span>
            <div className={`${styles.iconWrapper} ${styles.greenIcon}`}>
              <Medal size={20} weight="bold" />
            </div>
          </div>
          <div className={styles.cardValue}>Giỏi</div>
          <div className={styles.cardSubtext2}>Hạng 5 toàn khối</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Tín chỉ / Số giờ</span>
            <div className={`${styles.iconWrapper} ${styles.blueIcon}`}>
              <GraduationCap size={20} weight="bold" />
            </div>
          </div>
          <div className={styles.cardValue}>24/24</div>
          <div className={styles.progressBarWrapper}>
            <div className={styles.progressBar} style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Tỷ lệ chuyên cần</span>
            <div className={`${styles.iconWrapper} ${styles.tealIcon}`}>
              <Calendar size={20} weight="bold" />
            </div>
          </div>
          <div className={styles.cardValue}>98%</div>
          <div className={styles.cardSubtext2}>Vắng 2 buổi (Có phép)</div>
        </div>
      </div>

      {/* Main Grid: Grades Table & Radar Chart */}
      <div className={styles.mainGrid}>
        <div className={styles.gradesTableWrapper}>
          <div className={styles.sectionHeader}>
            <h2>Bảng điểm chi tiết</h2>
            <div className={styles.sectionActions}>
              <button><FunnelSimple size={20} /></button>
              <button><DotsThreeVertical size={20} weight="bold" /></button>
            </div>
          </div>
          <table className={styles.gradesTable}>
            <thead>
              <tr>
                <th>BÀI ĐÁNH GIÁ</th>
                <th>LOẠI</th>
                <th>ĐIỂM SỐ</th>
                <th>HỆ SỐ</th>
                <th>TRẠNG THÁI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={styles.subjectCell}>
                    <div className={`${styles.subjectIcon} ${styles.blueBg}`}>
                      <BookOpen size={16} weight="fill" />
                    </div>
                    <span className={styles.subjectName}>Bài tập về nhà 1</span>
                  </div>
                </td>
                <td className={styles.teacherCell}>Thường xuyên</td>
                <td>9.0</td>
                <td>10%</td>
                <td className={styles.finalScore} style={{ color: '#1fb98f' }}>Đạt</td>
              </tr>
              <tr>
                <td>
                  <div className={styles.subjectCell}>
                    <div className={`${styles.subjectIcon} ${styles.orangeBg}`}>
                      <BookOpen size={16} weight="fill" />
                    </div>
                    <span className={styles.subjectName}>Kiểm tra 15 phút</span>
                  </div>
                </td>
                <td className={styles.teacherCell}>Thường xuyên</td>
                <td>8.5</td>
                <td>10%</td>
                <td className={styles.finalScore} style={{ color: '#1fb98f' }}>Đạt</td>
              </tr>
              <tr>
                <td>
                  <div className={styles.subjectCell}>
                    <div className={`${styles.subjectIcon} ${styles.redBg}`}>
                      <Atom size={16} weight="fill" />
                    </div>
                    <span className={styles.subjectName}>Kiểm tra Giữa kỳ</span>
                  </div>
                </td>
                <td className={styles.teacherCell}>Giữa kỳ</td>
                <td>9.5</td>
                <td>30%</td>
                <td className={`${styles.finalScore} ${styles.highlight}`}>Đạt</td>
              </tr>
              <tr>
                <td>
                  <div className={styles.subjectCell}>
                    <div className={`${styles.subjectIcon} ${styles.greenBg}`}>
                      <Atom size={16} weight="fill" />
                    </div>
                    <span className={styles.subjectName}>Thi Cuối kỳ</span>
                  </div>
                </td>
                <td className={styles.teacherCell}>Cuối kỳ</td>
                <td>9.2</td>
                <td>50%</td>
                <td className={styles.finalScore} style={{ color: '#1fb98f' }}>Đạt</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.radarChartWrapper}>
          <div className={styles.sectionHeader}>
            <h2>Biểu đồ năng lực</h2>
          </div>
          <p className={styles.chartSubtitle}>Đánh giá 5 tiêu chí học tập</p>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData} startAngle={90} endAngle={-270}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar name="Student" dataKey="A" stroke="#fe6747" fill="#fe6747" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.chartInsights}>
            <div className={styles.insightRow}>
              <span className={styles.insightLabel}>Điểm mạnh nhất:</span>
              <span className={styles.insightValueOrange}>Chuyên cần & Cuối kỳ</span>
            </div>
            <div className={styles.insightRow}>
              <span className={styles.insightLabel}>Cần cải thiện:</span>
              <span className={styles.insightValue}>Thái độ học tập</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className={styles.feedbackSection}>
        <div className={styles.sectionHeaderLine}>
          <h2>Điểm số gần đây & Nhận xét</h2>
          <button className={styles.seeAllBtn}>Xem tất cả</button>
        </div>
        <div className={styles.feedbackCards}>
          <div className={styles.feedbackCard}>
            <div className={styles.fCardHeader}>
              <div className={styles.fCardTitleInfo}>
                <h3>Bài kiểm tra Chương 3</h3>
                <p>Môn Toán &bull; 12/10/2023</p>
              </div>
              <div className={`${styles.fCardScore} ${styles.bgOrange}`}>9.5</div>
            </div>
            <div className={styles.fCardComment}>
              "Em giải quyết các bài toán tích phân rất sáng tạo. Chú ý trình bày các bước trung gian rõ ràng hơn nữa nhé."
            </div>
            <div className={styles.fCardTeacher}>
              <img src="https://ui-avatars.com/api/?name=TK&background=e0e0e0" alt="Avatar Thầy Trần Kiên" />
              <span>Thầy Trần Kiên</span>
            </div>
          </div>

          <div className={styles.feedbackCard}>
            <div className={styles.fCardHeader}>
              <div className={styles.fCardTitleInfo}>
                <h3>Bài kiểm tra Giữa kỳ</h3>
                <p>Môn Toán &bull; 15/10/2023</p>
              </div>
              <div className={`${styles.fCardScore} ${styles.bgGreen}`}>8.5</div>
            </div>
            <div className={styles.fCardComment}>
              "Bài làm tốt, có cố gắng. Tuy nhiên em cần cẩn thận hơn ở các bước tính toán cuối cùng để tránh mất điểm đáng tiếc."
            </div>
            <div className={styles.fCardTeacher}>
              <img src="https://ui-avatars.com/api/?name=TK&background=e0e0e0" alt="Avatar Thầy Trần Kiên" />
              <span>Thầy Trần Kiên</span>
            </div>
          </div>

          <div className={styles.feedbackCard}>
            <div className={styles.fCardHeader}>
              <div className={styles.fCardTitleInfo}>
                <h3>Bài tập nhóm tuần 4</h3>
                <p>Môn Toán &bull; 05/10/2023</p>
              </div>
              <div className={`${styles.fCardScore} ${styles.bgBlue}`}>9.0</div>
            </div>
            <div className={styles.fCardComment}>
              "Làm việc nhóm rất hiệu quả. Phân tích đề bài chính xác và có hướng giải quyết hợp lý."
            </div>
            <div className={styles.fCardTeacher}>
              <img src="https://ui-avatars.com/api/?name=TK&background=e0e0e0" alt="Avatar Thầy Trần Kiên" />
              <span>Thầy Trần Kiên</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentResults;
